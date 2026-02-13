import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { log, symbol } from '../ui/index.js';
import { ensureDir } from '../utils/fs.js';
import { getPackageRoot } from '../utils/paths.js';

// Supported AI editors configuration
export const AI_EDITORS = {
  claude: {
    commands: '.claude/commands',
    rules: null // Claude doesn't use rules files
  },
  cursor: {
    commands: '.cursor/commands',
    rules: '.cursor/rules',
    rulesFile: 'superspec.mdc'
  },
  qwen: {
    commands: '.qwen/commands',
    rules: '.qwen/rules',
    rulesFile: 'superspec.md'
  },
  opencode: {
    commands: '.opencode/commands',
    rules: null
  },
  codex: {
    commands: '.codex/commands',
    rules: null
  },
  codebuddy: {
    commands: '.codebuddy/commands',
    rules: '.codebuddy/rules',
    rulesFile: 'superspec.md'
  },
  qoder: {
    commands: '.qoder/commands',
    rules: '.qoder/rules',
    rulesFile: 'superspec.md'
  }
} as const;

export type AIEditor = keyof typeof AI_EDITORS;

/**
 * Install rules file for a specific AI editor
 */
export function installRules(cwd: string, editor: AIEditor): void {
  const config = AI_EDITORS[editor];

  // Skip if this editor doesn't use rules files
  if (!config.rules) {
    return;
  }

  const rulesDir = join(cwd, config.rules);
  ensureDir(rulesDir);

  const promptSrc = join(getPackageRoot(), 'prompts', 'rules.md');
  if (existsSync(promptSrc)) {
    const content = readFileSync(promptSrc, 'utf-8');
    const rulesFile = 'rulesFile' in config ? config.rulesFile : 'superspec.md';
    const destPath = join(rulesDir, rulesFile as string);
    writeFileSync(destPath, content, 'utf-8');
    log.success(`${symbol.ok} ${config.rules}/${rulesFile}`);
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
      writeFileSync(agentsMdPath, `${existing}\n\n${wrapped}`, 'utf-8');
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
  const config = AI_EDITORS[editor];
  const commandsDir = join(cwd, config.commands);
  ensureDir(commandsDir);

  // Copy command templates from templates/{lang}/commands/
  const templatesDir = join(getPackageRoot(), 'templates', lang, 'commands');
  const fallbackDir = join(getPackageRoot(), 'templates', 'zh', 'commands');
  const sourceDir = existsSync(templatesDir) ? templatesDir : fallbackDir;

  if (!existsSync(sourceDir)) {
    log.warn(`${symbol.warn} Commands templates not found: ${sourceDir}`);
    return;
  }

  const commandFiles = readdirSync(sourceDir).filter((f) => f.endsWith('.md'));

  for (const file of commandFiles) {
    const srcPath = join(sourceDir, file);
    const destPath = join(commandsDir, file);
    const content = readFileSync(srcPath, 'utf-8');
    writeFileSync(destPath, content, 'utf-8');
  }

  log.success(`${symbol.ok} ${config.commands}/ (${commandFiles.length} commands)`);
}

/**
 * Install commands for all supported AI editors
 */
export function installAllCommands(cwd: string, lang: string = 'zh'): void {
  for (const editor of Object.keys(AI_EDITORS) as AIEditor[]) {
    installCommands(cwd, editor, lang);
  }
}
