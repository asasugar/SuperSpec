import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getPackageRoot } from '../utils/paths.js';
import { ensureDir } from '../utils/fs.js';
import { log, symbol } from '../ui/index.js';

// Supported AI editors and their command file paths
export const AI_EDITORS = {
  claude: '.claude/commands',
  cursor: '.cursor/commands',
  qwen: '.qwen/commands',
  opencode: '.opencode/commands',
  codex: '.codex/commands',
  codebuddy: '.codebuddy/commands',
  qoder: '.qoder/commands',
} as const;

export type AIEditor = keyof typeof AI_EDITORS;

export function installCursorRules(cwd: string): void {
  const rulesDir = join(cwd, '.cursor', 'rules');
  ensureDir(rulesDir);

  const promptSrc = join(getPackageRoot(), 'prompts', 'cursor-rules.md');
  if (existsSync(promptSrc)) {
    const content = readFileSync(promptSrc, 'utf-8');
    writeFileSync(join(rulesDir, 'superspec.mdc'), content, 'utf-8');
    log.success(`${symbol.ok} .cursor/rules/superspec.mdc`);
  }
}

const SS_START = '<!-- superspec:start -->';
const SS_END = '<!-- superspec:end -->';

export function installAgentsMd(cwd: string): void {
  const agentsMdPath = join(cwd, 'AGENTS.md');
  const agentPromptSrc = join(getPackageRoot(), 'prompts', 'agents.md');

  if (!existsSync(agentPromptSrc)) return;

  const newContent = readFileSync(agentPromptSrc, 'utf-8');
  const wrapped = `${SS_START}\n${newContent}\n${SS_END}`;

  if (existsSync(agentsMdPath)) {
    const existing = readFileSync(agentsMdPath, 'utf-8');
    const startIdx = existing.indexOf(SS_START);
    const endIdx = existing.indexOf(SS_END);

    if (startIdx !== -1 && endIdx !== -1) {
      const before = existing.slice(0, startIdx);
      const after = existing.slice(endIdx + SS_END.length);
      writeFileSync(agentsMdPath, before + wrapped + after, 'utf-8');
    } else if (existing.includes('SuperSpec')) {
      writeFileSync(agentsMdPath, existing, 'utf-8');
    } else {
      writeFileSync(agentsMdPath, existing + '\n\n' + wrapped, 'utf-8');
    }
  } else {
    writeFileSync(agentsMdPath, wrapped, 'utf-8');
  }
  log.success(`${symbol.ok} AGENTS.md`);
}

/**
 * Install commands for a specific AI editor
 */
export function installCommands(cwd: string, editor: AIEditor, lang: string = 'zh'): void {
  const commandsDir = join(cwd, AI_EDITORS[editor]);
  ensureDir(commandsDir);

  // Copy command templates from templates/{lang}/commands/
  const templatesDir = join(getPackageRoot(), 'templates', lang, 'commands');
  const fallbackDir = join(getPackageRoot(), 'templates', 'zh', 'commands');
  const sourceDir = existsSync(templatesDir) ? templatesDir : fallbackDir;

  if (!existsSync(sourceDir)) {
    log.warn(`${symbol.warn} Commands templates not found: ${sourceDir}`);
    return;
  }

  const commandFiles = readdirSync(sourceDir).filter(f => f.endsWith('.md'));

  for (const file of commandFiles) {
    const srcPath = join(sourceDir, file);
    const destPath = join(commandsDir, file);
    const content = readFileSync(srcPath, 'utf-8');
    writeFileSync(destPath, content, 'utf-8');
  }

  log.success(`${symbol.ok} ${AI_EDITORS[editor]}/ (${commandFiles.length} commands)`);
}

/**
 * Install commands for all supported AI editors
 */
export function installAllCommands(cwd: string): void {
  for (const editor of Object.keys(AI_EDITORS) as AIEditor[]) {
    installCommands(cwd, editor);
  }
}
