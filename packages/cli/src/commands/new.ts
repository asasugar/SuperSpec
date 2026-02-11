import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { writeRenderedTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { isGitRepo, createBranch } from '../utils/git.js';
import { getDateString } from '../utils/date.js';
import { log, symbol } from '../ui/index.js';

export interface NewOptions {
  boost?: boolean;
  branch?: boolean;
  specDir?: string;
  branchPrefix?: string;
}

export async function newCommand(name: string, options: NewOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);

  const specDir = options.specDir || config.specDir;
  const branchPrefix = options.branchPrefix || config.branchPrefix;
  const boost = options.boost || config.boost;
  const lang = config.lang || 'zh';

  const changePath = join(cwd, specDir, 'changes', name);

  if (existsSync(changePath)) {
    log.warn(`${symbol.warn} 变更 "${name}" 已存在: ${changePath}`);
    return;
  }

  log.info(`${symbol.start} 创建变更: ${name}`);

  if (boost) {
    log.boost(`  ${symbol.bolt} 增强模式已启用`);
  }

  ensureDir(changePath);

  const vars: Record<string, string> = {
    name,
    date: getDateString(),
    boost: boost ? 'true' : 'false',
  };

  const artifacts = boost ? config.boostArtifacts : config.artifacts;

  for (const artifact of artifacts) {
    const templateFile = config.templates[artifact] || `${artifact}.md`;
    const destPath = join(changePath, `${artifact}.md`);
    try {
      writeRenderedTemplate(templateFile, destPath, vars, lang);
      log.success(`  ${symbol.ok} ${artifact}.md`);
    } catch (e: any) {
      log.error(`  ${symbol.fail} ${artifact}.md: ${e.message}`);
    }
  }

  if (options.branch !== false && isGitRepo()) {
    const branchTemplate = config.branchTemplate || '{prefix}{name}';
    const branchName = branchTemplate.replace('{prefix}', branchPrefix).replace('{name}', name);
    try {
      createBranch(branchName);
      log.success(`  ${symbol.ok} 分支: ${branchName}`);
    } catch (e: any) {
      log.warn(`  ${symbol.warn} 分支创建失败: ${e.message}`);
    }
  }

  log.info(`\n${symbol.start} 变更创建完成！`);
  log.dim(`  路径: ${specDir}/changes/${name}/`);

  if (boost) {
    log.dim('  包含: proposal → spec → tasks → checklist');
  } else {
    log.dim('  包含: proposal → spec → tasks');
  }
  log.dim('  使用 /ss:proposal 开始规划');
}
