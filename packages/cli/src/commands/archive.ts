import { existsSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig, type SuperSpecConfig } from '../core/config.js';
import { ensureDir } from '../utils/fs.js';
import { getDateString } from '../utils/date.js';
import { log, symbol } from '../ui/index.js';

export interface ArchiveOptions {
  all?: boolean;
}

export async function archiveCommand(name: string | undefined, options: ArchiveOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');
  const archiveDir = join(cwd, config.specDir, 'changes', config.archive.dir);

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} 没有找到 changes 目录`);
    return;
  }

  if (options.all) {
    const entries = readdirSync(changesDir, { withFileTypes: true }).filter(
      (e) => e.isDirectory() && e.name !== config.archive.dir,
    );

    if (entries.length === 0) {
      log.warn(`${symbol.warn} 没有可归档的变更`);
      return;
    }

    log.info(`${symbol.start} 归档所有变更...`);
    for (const entry of entries) {
      archiveOne(entry.name, changesDir, archiveDir, config);
    }
  } else if (name) {
    const changePath = join(changesDir, name);
    if (!existsSync(changePath)) {
      log.warn(`${symbol.warn} 变更 "${name}" 不存在`);
      return;
    }
    log.info(`${symbol.start} 归档变更: ${name}`);
    archiveOne(name, changesDir, archiveDir, config);
  } else {
    log.warn(`${symbol.warn} 请指定变更名称或使用 --all`);
    return;
  }

  log.info(`${symbol.start} 归档完成！`);
}

function archiveOne(name: string, changesDir: string, archiveDir: string, config: SuperSpecConfig): void {
  ensureDir(archiveDir);
  const src = join(changesDir, name);
  const dateStr = config.archive.datePrefix ? `${getDateString()}-` : '';
  const dest = join(archiveDir, `${dateStr}${name}`);

  if (existsSync(dest)) {
    log.warn(`  ${symbol.warn} 归档目标已存在: ${dest}`);
    return;
  }

  renameSync(src, dest);
  log.success(`  ${symbol.ok} ${name} → archive/${dateStr}${name}`);
}
