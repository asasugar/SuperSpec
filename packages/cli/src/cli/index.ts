#!/usr/bin/env node
import { createRequire } from 'node:module';
import { program } from 'commander';
import { initCommand } from '../commands/init.js';
import { createCommand } from '../commands/create.js';
import { archiveCommand } from '../commands/archive.js';
import { updateCommand } from '../commands/update.js';
import { lintCommand } from '../commands/lint.js';
import { validateCommand } from '../commands/validate.js';
import { searchCommand } from '../commands/search.js';
import { linkCommand, unlinkCommand, depsCommand } from '../commands/link.js';
import { statusCommand } from '../commands/status.js';
import { contextCommand } from '../commands/context.js';
import { syncCommand } from '../commands/sync.js';
import { loadConfig } from '../core/config.js';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json');

const isZh = loadConfig().lang === 'zh';
const t = (en: string, zh: string) => (isZh ? zh : en);

program.name('superspec').description(t('Spec-driven development for AI coding assistants', 'AI 编码助手的规格驱动开发工具')).version(pkg.version);

program
  .command('init')
  .description(t('Initialize SuperSpec in current project', '初始化 SuperSpec 到当前项目'))
  .option('--ai <agent>', t('AI assistant type: cursor, claude, copilot', 'AI 助手类型: cursor, claude, copilot'), 'cursor')
  .option('--lang <lang>', t('Template language: zh, en', '模板语言: zh, en'), 'en')
  .option('--force', t('Force overwrite existing config', '强制覆盖已有配置'))
  .option('--no-git', t('Skip git initialization', '跳过 git 初始化'))
  .action(initCommand);

program
  .command('create <name>')
  .description(t('Create change and generate proposal (-b boost mode)', '创建变更并生成 proposal（-b 增强模式）'))
  .option('-b, --boost', t('Boost mode, also generate spec + checklist', '增强模式，额外生成 spec + checklist'))
  .option('-c, --creative', t('Creative mode, encourage new approaches', '创造模式，鼓励探索新方案'))
  .option('--no-branch', t('Skip git branch creation', '不创建 git 分支'))
  .option('--spec-dir <dir>', t('Custom spec folder name', '自定义 spec 文件夹名称'))
  .option('--branch-prefix <prefix>', t('Custom branch prefix', '自定义分支前缀'))
  .action(createCommand);

program
  .command('archive [name]')
  .description(t('Archive completed changes', '归档已完成的变更'))
  .option('--all', t('Archive all completed changes', '归档所有已完成的变更'))
  .action(archiveCommand);

program.command('update').description(t('Refresh agent instructions and templates', '刷新 agent 指令和模板')).action(updateCommand);

program
  .command('lint [name]')
  .description(t('Check artifact line limits', '检查 artifact 行数是否超限'))
  .action(lintCommand);

program
  .command('validate [name]')
  .description(t('Cross-validate artifact consistency', '交叉验证 artifact 一致性'))
  .option('--check-deps', t('Also check dependency consistency', '同时检查依赖一致性'))
  .action(validateCommand);

program
  .command('search <query>')
  .description(t('Search change contents', '搜索变更内容'))
  .option('--archived', t('Include archived changes', '包含已归档的变更'))
  .option('--artifact <type>', t('Filter by artifact type (proposal/spec/tasks/clarify/checklist)', '按 artifact 类型过滤 (proposal/spec/tasks/clarify/checklist)'))
  .action(searchCommand);

program
  .command('link <name>')
  .description(t('Add spec dependency', '添加 spec 依赖'))
  .requiredOption('--depends-on <other>', t('Dependency spec name', '依赖的 spec 名称'))
  .action(linkCommand);

program
  .command('unlink <name>')
  .description(t('Remove spec dependency', '移除 spec 依赖'))
  .requiredOption('--depends-on <other>', t('Dependency to remove', '要移除的依赖名称'))
  .action(unlinkCommand);

program
  .command('deps [name]')
  .description(t('View dependency graph', '查看依赖关系'))
  .action(depsCommand);

program
  .command('status')
  .description(t('View all change statuses', '查看所有变更状态'))
  .action(statusCommand);

program
  .command('context [name]')
  .description(t('Generate/refresh context.md summary (for vibe coding)', '生成/刷新 context.md 上下文摘要（用于 vibe coding）'))
  .action(contextCommand);

program
  .command('sync [name]')
  .description(t('Sync git changes to context.md (collect facts, no auto-check tasks)', '同步 git 变更到 context.md（收集事实，不自动勾选 task）'))
  .option('--base <branch>', t('Base branch (default: main/master)', '基准分支（默认 main/master）'))
  .action(syncCommand);

program.parse();
