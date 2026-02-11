import { existsSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { getDefaultConfig } from '../core/config.js';
import { copyTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { isGitRepo } from '../utils/git.js';
import { installCursorRules, installAgentsMd, installCommands, AI_EDITORS, type AIEditor } from '../prompts/index.js';
import { log, symbol, printLogo, printSummary, theme } from '../ui/index.js';

export interface InitOptions {
  ai: string;
  lang: string;
  force?: boolean;
  git?: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  const cwd = process.cwd();
  const configPath = join(cwd, 'superspec.config.json');

  if (existsSync(configPath) && !options.force) {
    log.warn(`${symbol.warn} superspec.config.json already exists, use --force to overwrite`);
    return;
  }

  const lang = options.lang || 'zh';

  // Print logo
  printLogo('small');
  console.log(theme.dim('  Spec-Driven Development Toolkit\n'));

  const config = getDefaultConfig();
  config.lang = lang as 'zh' | 'en';
  const specDir = join(cwd, config.specDir);

  // Check if directory is not empty
  const existingFiles = readdirSync(cwd).filter(f => !f.startsWith('.') && f !== 'node_modules');
  if (existingFiles.length > 0 && !options.force) {
    log.warn(`${symbol.warn} Current directory is not empty (${existingFiles.length} items)`);
    log.dim('  Template files will be merged with existing content');
    console.log();
  }

  log.section('Creating Configuration');
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  log.success(`${symbol.file} superspec.config.json`);

  log.section('Creating Directory Structure');
  ensureDir(join(specDir, 'changes'));
  ensureDir(join(specDir, 'templates'));
  log.success(`${symbol.folder} ${config.specDir}/changes/`);
  log.success(`${symbol.folder} ${config.specDir}/templates/`);

  log.section('Installing Templates');
  const templates = ['spec.md', 'proposal.md', 'tasks.md', 'clarify.md', 'checklist.md'];
  for (const tpl of templates) {
    copyTemplate(tpl, join(specDir, 'templates', tpl), lang);
  }
  log.success(`${symbol.ok} ${templates.length} templates (${lang})`);

  log.section('Installing AI Agent Files');
  installCursorRules(cwd);
  installAgentsMd(cwd);

  // Install commands for the selected AI editor
  const aiEditor = options.ai as AIEditor;
  if (aiEditor && AI_EDITORS[aiEditor]) {
    installCommands(cwd, aiEditor, lang);
  }

  if (options.git !== false && !isGitRepo()) {
    execSync('git init', { cwd, stdio: 'inherit' });
    log.success(`${symbol.git} git init`);
  }

  // Print summary
  console.log();
  printSummary([
    { label: 'Config', value: 'superspec.config.json' },
    { label: 'Spec dir', value: `${config.specDir}/` },
    { label: 'AI agent', value: options.ai },
    { label: 'Language', value: lang },
  ]);

  log.done('SuperSpec initialized successfully!');
  log.dim('Next: Run superspec create <name> to create a change');
}
