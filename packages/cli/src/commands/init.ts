import { existsSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { getDefaultConfig } from '../core/config.js';
import { copyTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { isGitRepo } from '../utils/git.js';
import { installRules, installAgentsMd, installCommands, AI_EDITORS, type AIEditor } from '../prompts/index.js';
import { log, symbol, printLogo, printSummary, theme, t, setLang } from '../ui/index.js';

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
    log.warn(`${symbol.warn} ${t('superspec.config.json already exists, use --force to overwrite', 'superspec.config.json 已存在，使用 --force 覆盖')}`);
    return;
  }

  const lang = options.lang || 'zh';
  setLang(lang as 'zh' | 'en');

  printLogo('small');
  console.log(theme.dim('  Spec-Driven Development Toolkit\n'));

  const config = getDefaultConfig();
  config.lang = lang as 'zh' | 'en';

  const aiEditor = options.ai as AIEditor;
  if (aiEditor && AI_EDITORS[aiEditor]) {
    config.aiEditor = aiEditor;
  }

  const specDir = join(cwd, config.specDir);

  const existingFiles = readdirSync(cwd).filter(f => !f.startsWith('.') && f !== 'node_modules');
  if (existingFiles.length > 0 && !options.force) {
    log.warn(`${symbol.warn} ${t(`current directory is not empty (${existingFiles.length} items)`, `当前目录非空（${existingFiles.length} 项）`)}`);
    log.dim(`  ${t('template files will be merged with existing content', '模板文件将与现有内容合并')}`);
    console.log();
  }

  log.section(t('Creating Configuration', '创建配置'));
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  log.success(`${symbol.file} superspec.config.json`);

  log.section(t('Creating Directory Structure', '创建目录结构'));
  ensureDir(join(specDir, 'changes'));
  ensureDir(join(specDir, 'templates'));
  log.success(`${symbol.folder} ${config.specDir}/changes/`);
  log.success(`${symbol.folder} ${config.specDir}/templates/`);

  log.section(t('Installing Templates', '安装模板'));
  const templateNames = Object.values(config.templates).map((v) => (v.endsWith('.md') ? v : `${v}.md`));
  for (const tpl of templateNames) {
    try {
      copyTemplate(tpl, join(specDir, 'templates', tpl), lang);
    } catch {
      // skip missing templates
    }
  }
  log.success(`${symbol.ok} ${templateNames.length} ${t('templates', '个模板')} (${lang})`);

  log.section(t('Installing AI Agent Files', '安装 AI Agent 文件'));
  installAgentsMd(cwd);

  if (aiEditor && AI_EDITORS[aiEditor]) {
    installRules(cwd, aiEditor);
    installCommands(cwd, aiEditor, lang);
  }

  if (options.git !== false && !isGitRepo()) {
    execSync('git init', { cwd, stdio: 'inherit' });
    log.success(`${symbol.git} git init`);
  }

  console.log();
  printSummary([
    { label: 'Config', value: 'superspec.config.json' },
    { label: 'Spec dir', value: `${config.specDir}/` },
    { label: 'AI agent', value: options.ai },
    { label: 'Language', value: lang },
  ]);

  log.done(t('SuperSpec initialized successfully!', 'SuperSpec 初始化成功！'));
  log.dim(`${t('Next', '下一步')}: superspec create <feature>`);
}
