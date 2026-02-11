import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { getDefaultConfig } from '../core/config.js';
import { copyTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { isGitRepo } from '../utils/git.js';
import { installCursorRules, installAgentsMd } from '../prompts/index.js';
import { log, symbol } from '../ui/index.js';

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
    log.warn(`${symbol.warn} superspec.config.json 已存在，使用 --force 覆盖`);
    return;
  }

  const lang = options.lang || 'zh';
  log.info(`${symbol.start} 初始化 SuperSpec...`);

  const config = getDefaultConfig();
  config.lang = lang as 'zh' | 'en';
  const specDir = join(cwd, config.specDir);

  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  log.success(`  ${symbol.ok} superspec.config.json`);

  ensureDir(join(specDir, 'changes'));
  ensureDir(join(specDir, 'templates'));
  log.success(`  ${symbol.ok} ${config.specDir}/changes/`);
  log.success(`  ${symbol.ok} ${config.specDir}/templates/`);

  const templates = ['spec.md', 'proposal.md', 'tasks.md', 'clarify.md', 'checklist.md'];
  for (const tpl of templates) {
    copyTemplate(tpl, join(specDir, 'templates', tpl), lang);
  }
  log.success(`  ${symbol.ok} 模板文件 (${lang})`);

  installCursorRules(cwd);
  installAgentsMd(cwd);

  if (options.git !== false && !isGitRepo()) {
    execSync('git init', { cwd, stdio: 'inherit' });
    log.success(`  ${symbol.ok} git init`);
  }

  const msg =
    lang === 'zh'
      ? { done: `${symbol.start} SuperSpec 初始化完成！`, cfg: '配置文件', dir: '规格目录', ai: 'AI 助手', langLabel: '语言', next: '使用 superspec new <name> 创建新变更' }
      : { done: `${symbol.start} SuperSpec initialized!`, cfg: 'Config', dir: 'Spec dir', ai: 'AI agent', langLabel: 'Language', next: 'Run superspec new <name> to create a change' };

  log.info(`\n${msg.done}`);
  log.dim(`  ${msg.cfg}: superspec.config.json`);
  log.dim(`  ${msg.dir}: ${config.specDir}/`);
  log.dim(`  ${msg.ai}: ${options.ai}`);
  log.dim(`  ${msg.langLabel}: ${lang}`);
  log.dim(`\n  ${msg.next}`);
}
