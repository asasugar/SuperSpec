import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { validateChange, type ValidationIssue } from '../core/validate.js';
import { resolveChangeNames } from '../utils/fs.js';
import { log, symbol, t } from '../ui/index.js';

export interface ValidateOptions {
  checkDeps?: boolean;
}

export async function validateCommand(name: string | undefined, options: ValidateOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  const names = resolveChangeNames(changesDir, name, config.archive.dir);

  if (names.length === 0) {
    log.warn(`${symbol.warn} ${t('no changes to validate', '没有可验证的变更')}`);
    return;
  }

  let totalIssues = 0;

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" ${t('not found', '未找到')}`);
      continue;
    }

    const issues = validateChange(changePath, options.checkDeps);
    log.info(`${symbol.start} ${n}`);

    if (issues.length === 0) {
      log.success(`  ${symbol.ok} ${t('all checks passed', '所有检查通过')}`);
    } else {
      for (const issue of issues) {
        totalIssues++;
        if (issue.level === 'error') {
          log.error(`  ${symbol.fail} [${issue.artifact}] ${issue.message}`);
        } else if (issue.level === 'warn') {
          log.warn(`  ${symbol.warn} [${issue.artifact}] ${issue.message}`);
        } else {
          log.dim(`  ℹ [${issue.artifact}] ${issue.message}`);
        }
      }
    }
  }

  if (totalIssues === 0) {
    log.success(`${symbol.ok} ${t('all validations passed', '所有验证通过')}`);
  } else {
    log.warn(`${symbol.warn} ${totalIssues} ${t('issue(s) found', '个问题')}`);
  }
}
