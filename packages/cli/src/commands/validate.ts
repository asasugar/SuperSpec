import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { validateChange, type ValidationIssue } from '../core/validate.js';
import { log, symbol } from '../ui/index.js';

export interface ValidateOptions {
  checkDeps?: boolean;
}

export async function validateCommand(name: string | undefined, options: ValidateOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} no changes directory found`);
    return;
  }

  const names: string[] = [];
  if (name) {
    names.push(name);
  } else {
    const entries = readdirSync(changesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && e.name !== config.archive.dir);
    names.push(...entries.map((e) => e.name));
  }

  if (names.length === 0) {
    log.warn(`${symbol.warn} no changes to validate`);
    return;
  }

  let totalIssues = 0;

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" not found`);
      continue;
    }

    const issues = validateChange(changePath, options.checkDeps);
    log.info(`${symbol.start} ${n}`);

    if (issues.length === 0) {
      log.success(`  ${symbol.ok} all checks passed`);
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
    log.success(`${symbol.ok} all validations passed`);
  } else {
    log.warn(`${symbol.warn} ${totalIssues} issue(s) found`);
  }
}
