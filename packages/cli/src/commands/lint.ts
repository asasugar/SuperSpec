import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { lintChange } from '../core/lint.js';
import { log, symbol } from '../ui/index.js';

export async function lintCommand(name: string | undefined): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');
  const { targetLines, hardLines } = config.limits;

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
    log.warn(`${symbol.warn} no changes to lint`);
    return;
  }

  let hasIssues = false;

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" not found`);
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
    log.info(`${symbol.start} all artifacts within limits`);
  }
}
