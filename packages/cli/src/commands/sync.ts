import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { generateContext } from '../core/context.js';
import { log, symbol, t } from '../ui/index.js';
import { resolveChangeNames } from '../utils/fs.js';

export async function syncCommand(
  name: string | undefined,
  opts: { base?: string; git?: boolean }
): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  const names = resolveChangeNames(changesDir, name, config.archive.dir);

  if (names.length === 0) {
    log.warn(`${symbol.warn} ${t('no changes found', '未找到变更')}`);
    return;
  }

  const useGit = opts.git !== false;

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" ${t('not found', '未找到')}`);
      continue;
    }

    const content = generateContext(changePath, n, {
      gitDiff: useGit,
      baseBranch: opts.base
    });
    const destPath = join(changePath, 'context.md');
    writeFileSync(destPath, content, 'utf-8');
    log.success(`${symbol.ok} ${t('synced', '已同步')} ${n}/context.md`);
  }
}
