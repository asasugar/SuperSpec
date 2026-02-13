import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getDateString } from '../utils/date.js';
import { type GitChange, getDiffFiles } from '../utils/git.js';
import { parseFrontmatter, serializeFrontmatter } from './frontmatter.js';

export interface ContextData {
  name: string;
  status: string;
  strategy: string;
  mode: string;
  updated: string;
  goals: string[];
  progress: { total: number; done: number; items: string[] };
  decisions: string[];
  files: string[];
}

function extractSection(body: string, heading: string): string[] {
  const regex = new RegExp(`^##\\s+(?:${heading})[\\s\\S]*?$`, 'im');
  const match = body.match(regex);
  if (!match) return [];

  const startIdx = body.indexOf(match[0]) + match[0].length;
  const rest = body.slice(startIdx);
  const nextSection = rest.match(/^##\s+/m);
  const sectionContent = nextSection ? rest.slice(0, nextSection.index) : rest;

  return sectionContent
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('<!--'));
}

function parseTaskItems(body: string): { total: number; done: number; items: string[] } {
  const lines = body.split('\n');
  const items: string[] = [];
  let done = 0;
  let total = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const checked = trimmed.match(/^-\s*\[x\]\s+(.*)/i);
    const unchecked = trimmed.match(/^-\s*\[\s\]\s+(.*)/);

    if (checked) {
      total++;
      done++;
      const desc = checked[1].trim();
      items.push(`- [x] ${desc}`);
    } else if (unchecked) {
      total++;
      const desc = unchecked[1].trim();
      items.push(`- [ ] ${desc}`);
    }
  }

  return { total, done, items };
}

function extractFilePaths(body: string): string[] {
  const paths = new Set<string>();
  const regex = /`([^`]+\.[a-zA-Z]+)`/g;
  let match: RegExpExecArray | null = regex.exec(body);
  while (match !== null) {
    const p = match[1];
    if (p.includes('/') && !p.startsWith('http') && !p.includes(' ')) {
      paths.add(p);
    }
    match = regex.exec(body);
  }
  return [...paths];
}

function extractDecisions(body: string): string[] {
  const lines = body.split('\n');
  const decisions: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\|?\s*D\d+\s*\|/.test(trimmed)) {
      const cells = trimmed
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 2) {
        decisions.push(`- ${cells[0]}: ${cells[1]}`);
      }
    }
  }
  return decisions;
}

export interface GenerateContextOptions {
  gitDiff?: boolean;
  baseBranch?: string;
}

const STATUS_LABELS: Record<string, string> = {
  A: 'added',
  M: 'modified',
  D: 'deleted',
  R: 'renamed'
};

function classifyGitChanges(gitChanges: GitChange[], taskFiles: string[]): string[] {
  const taskFileSet = new Set(taskFiles);
  const lines: string[] = [];
  for (const { status, file } of gitChanges) {
    const label = STATUS_LABELS[status] || status;
    const inTasks =
      taskFileSet.has(file) || taskFiles.some((tf) => file.endsWith(tf) || tf.endsWith(file));
    const tag = inTasks ? '' : ' (unplanned)';
    lines.push(`- ${label}: ${file}${tag}`);
  }
  return lines;
}

export function generateContext(
  changePath: string,
  changeName: string,
  options: GenerateContextOptions = {}
): string {
  const read = (name: string): string | null => {
    const p = join(changePath, name);
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  };

  const proposal = read('proposal.md');
  const spec = read('spec.md');
  const tasks = read('tasks.md');
  const clarify = read('clarify.md');

  const mode = spec ? 'boost' : 'standard';
  const proposalMeta = proposal ? parseFrontmatter(proposal).meta : {};
  const strategy = proposalMeta.strategy || 'follow';
  const status = proposalMeta.status || 'in-progress';

  const goals: string[] = [];
  if (proposal) {
    const { body } = parseFrontmatter(proposal);
    const goalLines = extractSection(body, '目标|Goals');
    for (const line of goalLines) {
      const cleaned = line.replace(/^-\s*\[.\]\s*/, '- ').replace(/^-\s*/, '');
      if (cleaned) goals.push(`- ${cleaned}`);
    }
  }

  let progress = { total: 0, done: 0, items: [] as string[] };
  let files: string[] = [];
  if (tasks) {
    const { body } = parseFrontmatter(tasks);
    progress = parseTaskItems(body);
    files = extractFilePaths(body);
  }

  const decisions: string[] = [];
  if (clarify) {
    const { body } = parseFrontmatter(clarify);
    decisions.push(...extractDecisions(body));
  }

  const existingContext = read('context.md');
  let notes = '';
  if (existingContext) {
    const { body } = parseFrontmatter(existingContext);
    const notesSection = extractSection(body, 'Notes');
    if (notesSection.length > 0) {
      notes = notesSection.join('\n');
    }
  }

  const fmData: Record<string, string> = {
    name: changeName,
    status,
    strategy,
    mode,
    updated: getDateString()
  };
  if (proposalMeta.input) fmData.input = proposalMeta.input;
  const fm = serializeFrontmatter(fmData);

  const lines: string[] = [fm, ''];

  if (goals.length > 0) {
    lines.push('## Goals', ...goals, '');
  }

  if (progress.total > 0) {
    lines.push(`## Progress (${progress.done}/${progress.total} tasks)`);
    lines.push(...progress.items, '');
  }

  if (decisions.length > 0) {
    lines.push('## Decisions', ...decisions, '');
  }

  if (files.length > 0) {
    lines.push('## Affected Files');
    for (const f of files) {
      lines.push(`- ${f}`);
    }
    lines.push('');
  }

  if (options.gitDiff === true) {
    const gitChanges = getDiffFiles(options.baseBranch);
    if (gitChanges.length > 0) {
      const classified = classifyGitChanges(gitChanges, files);
      lines.push('## Git Changes', ...classified, '');
    }
  }

  lines.push('## Notes');
  if (notes) {
    lines.push(notes);
  }
  lines.push('');

  return lines.join('\n');
}
