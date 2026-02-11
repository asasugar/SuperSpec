import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { loadConfig } from '../core/config.js';
import { log, symbol } from '../ui/index.js';

export interface SearchOptions {
  archived?: boolean;
  artifact?: string;
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
    log.warn(`${symbol.warn} no changes directory found`);
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

  const queryLower = query.toLowerCase();
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
        if (lines[i].toLowerCase().includes(queryLower)) {
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
    log.warn(`${symbol.warn} no results for "${query}"`);
    return;
  }

  log.info(`${symbol.start} ${hits.length} result(s) for "${query}"`);
  for (const hit of hits) {
    log.dim(`  ${hit.change}/${hit.artifact}:${hit.line}  ${hit.text}`);
  }
}
