import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { lintChange } from '../core/lint.js';
import { resolveChangeNames } from '../utils/fs.js';
import { log, symbol, t } from '../ui/index.js';

export async function lintCommand(name: string | undefined): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');
  const { targetLines, hardLines } = config.limits;

  const names = resolveChangeNames(changesDir, name, config.archive.dir);

  if (names.length === 0) {
    log.warn(`${symbol.warn} ${t('no changes to lint', '没有可检查的变更')}`);
    return;
  }

  let hasIssues = false;

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" ${t('not found', '未找到')}`);
      continue;
    }

    const results = lintChange(changePath, targetLines, hardLines);
    log.info(`${symbol.start} ${n}`);

    for (const r of results) {
      if (r.status === 'error') {
        log.error(`  ${symbol.fail} ${r.artifact}: ${r.message}`);
        hasIssues = true;
      } else if (r.status === 'warn') {
        log.warn(`  ${symbol.warn} ${r.artifact}: ${r.message}`);
        hasIssues = true;
      } else {
        log.success(`  ${symbol.ok} ${r.artifact}: ${r.message}`);
      }
    }
  }

  if (!hasIssues) {
    log.info(`${symbol.start} ${t('all artifacts within limits', '所有 artifact 均在限制范围内')}`);
  }
}
