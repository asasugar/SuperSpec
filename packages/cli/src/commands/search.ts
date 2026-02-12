import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { loadConfig } from '../core/config.js';
import { log, symbol, t } from '../ui/index.js';

const DEFAULT_LIMIT = 50;

export interface SearchOptions {
  archived?: boolean;
  artifact?: string;
  limit?: string;
  regex?: boolean;
}

interface SearchHit {
  change: string;
  artifact: string;
  line: number;
  text: string;
}

export async function searchCommand(query: string, options: SearchOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} ${t('no changes directory found', '未找到 changes 目录')}`);
    return;
  }

  const dirs: { name: string; path: string }[] = [];

  const activeEntries = readdirSync(changesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== config.archive.dir);
  for (const e of activeEntries) {
    dirs.push({ name: e.name, path: join(changesDir, e.name) });
  }

  if (options.archived) {
    const archiveDir = join(changesDir, config.archive.dir);
    if (existsSync(archiveDir)) {
      const archivedEntries = readdirSync(archiveDir, { withFileTypes: true })
        .filter((e) => e.isDirectory());
      for (const e of archivedEntries) {
        dirs.push({ name: `${config.archive.dir}/${e.name}`, path: join(archiveDir, e.name) });
      }
    }
  }

  let matcher: (line: string) => boolean;
  if (options.regex) {
    try {
      const re = new RegExp(query, 'i');
      matcher = (line) => re.test(line);
    } catch (e: any) {
      log.error(`${symbol.fail} ${t('invalid regex', '无效正则')}: ${e.message}`);
      return;
    }
  } else {
    const queryLower = query.toLowerCase();
    matcher = (line) => line.toLowerCase().includes(queryLower);
  }

  const hits: SearchHit[] = [];

  for (const dir of dirs) {
    if (!existsSync(dir.path)) continue;
    const files = readdirSync(dir.path).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      if (options.artifact) {
        const artType = basename(file, '.md');
        if (artType !== options.artifact) continue;
      }

      const filePath = join(dir.path, file);
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        if (matcher(lines[i])) {
          hits.push({
            change: dir.name,
            artifact: file,
            line: i + 1,
            text: lines[i].trim(),
          });
        }
      }
    }
  }

  if (hits.length === 0) {
    log.warn(`${symbol.warn} ${t(`no results for "${query}"`, `"${query}" 无结果`)}`);
    return;
  }

  const limit = options.limit ? parseInt(options.limit, 10) : DEFAULT_LIMIT;
  const shown = hits.slice(0, limit);

  log.info(`${symbol.start} ${hits.length} ${t('result(s) for', '条结果，搜索')} "${query}"`);
  for (const hit of shown) {
    log.dim(`  ${hit.change}/${hit.artifact}:${hit.line}  ${hit.text}`);
  }
  if (hits.length > limit) {
    log.dim(`  ... ${hits.length - limit} ${t('more result(s), use --limit to show more', '条更多结果，使用 --limit 显示更多')}`);
  }
}
