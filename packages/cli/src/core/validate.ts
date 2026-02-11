import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parseFrontmatter } from './frontmatter.js';

export interface ValidationIssue {
  level: 'error' | 'warn' | 'info';
  artifact: string;
  message: string;
}

function extractIds(content: string, pattern: RegExp): string[] {
  const matches = content.match(pattern);
  return matches ? [...new Set(matches)] : [];
}

export function validateChange(changePath: string, checkDeps = false): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const read = (name: string): string | null => {
    const p = join(changePath, name);
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  };

  const proposal = read('proposal.md');
  const spec = read('spec.md');
  const tasks = read('tasks.md');

  if (!proposal) issues.push({ level: 'warn', artifact: 'proposal.md', message: 'missing' });
  if (!tasks) issues.push({ level: 'warn', artifact: 'tasks.md', message: 'missing' });

  if (proposal && spec) {
    const proposalGoals = extractIds(proposal, /US-\d+/g);
    const specUS = extractIds(spec, /US-\d+/g);
    for (const id of proposalGoals) {
      if (!specUS.includes(id)) {
        issues.push({ level: 'error', artifact: 'spec.md', message: `${id} from proposal not found in spec` });
      }
    }
  }

  if (spec && tasks) {
    const specFR = extractIds(spec, /FR-\d+/g);
    const tasksFR = extractIds(tasks, /FR-\d+/g);

    for (const id of specFR) {
      if (!tasksFR.includes(id)) {
        issues.push({ level: 'warn', artifact: 'tasks.md', message: `${id} from spec not referenced in tasks` });
      }
    }

    for (const id of tasksFR) {
      if (!specFR.includes(id)) {
        issues.push({ level: 'error', artifact: 'tasks.md', message: `${id} referenced but not defined in spec` });
      }
    }
  }

  if (spec) {
    const acIds = extractIds(spec, /AC-\d+\.\d+/g);
    const frIds = extractIds(spec, /FR-\d+/g);
    for (const ac of acIds) {
      const frNum = ac.replace('AC-', '').split('.')[0];
      const parentFR = `FR-${frNum}`;
      if (!frIds.includes(parentFR)) {
        issues.push({ level: 'warn', artifact: 'spec.md', message: `${ac} has no parent ${parentFR}` });
      }
    }
  }

  if (checkDeps && proposal) {
    const { meta, body } = parseFrontmatter(proposal);
    const fmDeps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];

    const contentRefs = extractIds(body, /depends[_ ]on[:\s]+(\S+)/gi);
    const mentioned = contentRefs.map((m) => m.replace(/depends[_ ]on[:\s]+/i, ''));

    for (const dep of mentioned) {
      if (!fmDeps.includes(dep)) {
        issues.push({ level: 'warn', artifact: 'proposal.md', message: `content mentions "${dep}" but not in frontmatter depends_on` });
      }
    }

    const changesDir = join(changePath, '..');
    for (const dep of fmDeps) {
      if (!existsSync(join(changesDir, dep))) {
        issues.push({ level: 'error', artifact: 'proposal.md', message: `depends_on "${dep}" not found in changes` });
      }
    }
  }

  return issues;
}
