import { existsSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { generateContext } from '../core/context.js';
import { log, symbol } from '../ui/index.js';

export async function syncCommand(name: string | undefined, opts: { base?: string }): Promise<void> {
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
    log.warn(`${symbol.warn} no changes found`);
    return;
  }

  for (const n of names) {
    const changePath = join(changesDir, n);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} "${n}" not found`);
      continue;
    }

    const content = generateContext(changePath, n, {
      gitDiff: true,
      baseBranch: opts.base,
    });
    const destPath = join(changePath, 'context.md');
    writeFileSync(destPath, content, 'utf-8');
    log.success(`${symbol.ok} synced ${n}/context.md`);
  }
}
