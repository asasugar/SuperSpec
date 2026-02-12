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
import { depsListCommand, depsAddCommand, depsRemoveCommand } from '../commands/deps.js';
import { statusCommand, listCommand } from '../commands/status.js';
import { syncCommand } from '../commands/sync.js';
import { loadConfig } from '../core/config.js';
import { setLang, t } from '../ui/index.js';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json');

setLang(loadConfig(process.cwd(), true).lang);

program.name('superspec').description(t('Spec-driven development for AI coding assistants', 'AI 编码助手的规格驱动开发工具')).version(pkg.version);

program
  .command('init')
  .description(t('Initialize SuperSpec in current project', '初始化 SuperSpec 到当前项目'))
  .option('--ai <agent>', t('AI assistant type: claude, cursor, qwen, opencode, codex, codebuddy, qoder', 'AI 助手类型: claude, cursor, qwen, opencode, codex, codebuddy, qoder'), 'cursor')
  .option('--lang <lang>', t('Template language: zh, en', '模板语言: zh, en'), 'en')
  .option('--force', t('Force overwrite existing config', '强制覆盖已有配置'))
  .option('--no-git', t('Skip git initialization', '跳过 git 初始化'))
  .action(initCommand);

program
  .command('create <feature>')
  .description(t('Create change and generate proposal (-b boost mode)', '创建变更并生成 proposal（-b 增强模式）'))
  .option('-b, --boost', t('Boost mode, also generate spec + checklist', '增强模式，额外生成 spec + checklist'))
  .option('-c, --creative', t('Creative mode, encourage new approaches', '创造模式，鼓励探索新方案'))
  .option('-d, --description <desc>', t('Change description for context', '变更描述，用于生成上下文'))
  .option('--spec-dir <dir>', t('Custom spec folder name', '自定义 spec 文件夹名称'))
  .option('--no-branch', t('Skip git branch creation', '不创建 git 分支'))
  .option('--intent-type <type>', t('Intent type: feature, hotfix, bugfix, refactor, chore', '意图类型：feature, hotfix, bugfix, refactor, chore'))
  .option('--branch-prefix <prefix>', t('Custom branch prefix', '自定义分支前缀'))
  .option('--branch-template <template>', t('Branch name template: {prefix}{date}-{feature}-{user}', '分支名称模板：{prefix}-{date}-{feature}-{user}'))
  .option('--change-name-template <template>', t('Folder name template: {date}-{feature}-{user}', '文件夹名称模板：{date}-{feature}-{user}'))
  .option('--user <user>', t('Developer identifier (e.g. jay)', '开发者标识（如 jay）'))
  .option('--lang <lang>', t('SDD document language: zh, en', 'SDD 文档语言: zh, en'))
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
  .option('--limit <n>', t('Max results to show (default: 50)', '最大显示结果数（默认 50）'))
  .option('-E, --regex', t('Use regex pattern matching', '使用正则表达式匹配'))
  .action(searchCommand);

const deps = program.command('deps').description(t('Manage spec dependencies', '管理 spec 依赖'));

deps
  .command('list [name]')
  .description(t('View dependency graph', '查看依赖关系'))
  .action(depsListCommand);

deps
  .command('add <name>')
  .description(t('Add spec dependency', '添加 spec 依赖'))
  .requiredOption('--on <other>', t('Dependency spec name', '依赖的 spec 名称'))
  .action(depsAddCommand);

deps
  .command('remove <name>')
  .description(t('Remove spec dependency', '移除 spec 依赖'))
  .requiredOption('--on <other>', t('Dependency to remove', '要移除的依赖名称'))
  .action(depsRemoveCommand);

program
  .command('status')
  .description(t('View all change statuses', '查看所有变更状态'))
  .action(statusCommand);

program
  .command('list')
  .description(t('List change names (for scripting)', '列出变更名称（用于脚本）'))
  .option('--archived', t('Include archived changes', '包含已归档的变更'))
  .action(listCommand);

program
  .command('sync [name]')
  .description(t('Sync git changes to context.md', '同步 git 变更到 context.md'))
  .option('--base <branch>', t('Base branch (default: main/master)', '基准分支（默认 main/master）'))
  .option('--no-git', t('Skip git diff collection', '不收集 git diff 信息'))
  .action(syncCommand);

program.parse();
