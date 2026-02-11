#!/usr/bin/env node
import { createRequire } from 'node:module';
import { program } from 'commander';
import { initCommand } from '../commands/init.js';
import { newCommand } from '../commands/new.js';
import { archiveCommand } from '../commands/archive.js';
import { updateCommand } from '../commands/update.js';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json');

program.name('superspec').description('Spec-driven development for AI coding assistants').version(pkg.version);

program
  .command('init')
  .description('初始化 SuperSpec 到当前项目')
  .option('--ai <agent>', 'AI 助手类型: cursor, claude, copilot', 'cursor')
  .option('--lang <lang>', '模板语言: zh, en', 'zh')
  .option('--force', '强制覆盖已有配置')
  .option('--no-git', '跳过 git 初始化')
  .action(initCommand);

program
  .command('new <name>')
  .description('创建新的变更规格')
  .option('-b, --boost', '增强模式，启用 checklist 和交叉验证')
  .option('--no-branch', '不创建 git 分支')
  .option('--spec-dir <dir>', '自定义 spec 文件夹名称')
  .option('--branch-prefix <prefix>', '自定义分支前缀')
  .action(newCommand);

program
  .command('archive [name]')
  .description('归档已完成的变更')
  .option('--all', '归档所有已完成的变更')
  .action(archiveCommand);

program.command('update').description('刷新 agent 指令和模板').action(updateCommand);

program.parse();
