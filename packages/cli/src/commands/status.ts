import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { parseFrontmatter } from '../core/frontmatter.js';
import { log, symbol } from '../ui/index.js';

const ARTIFACT_TYPES = ['proposal', 'spec', 'tasks', 'clarify', 'checklist'] as const;

function readStatus(changePath: string, artifact: string): string {
  const filePath = join(changePath, `${artifact}.md`);
  if (!existsSync(filePath)) return '—';
  const content = readFileSync(filePath, 'utf-8');
  const { meta } = parseFrontmatter(content);
  if (meta.status) return meta.status;
  if (content.includes('✅')) return 'done';
  if (content.includes('🟢')) return 'ready';
  return 'draft';
}

function statusIcon(s: string): string {
  if (s === '—') return '—';
  if (s === 'done' || s === 'complete') return '✅';
  if (s === 'ready') return '🟢';
  return '🟡';
}

function overallStatus(statuses: Record<string, string>): string {
  const vals = Object.values(statuses).filter((v) => v !== '—');
  if (vals.length === 0) return 'empty';
  if (vals.every((v) => v === 'done' || v === 'complete')) return '✅ Done';
  if (vals.every((v) => v === 'ready' || v === 'done' || v === 'complete')) return '🟢 Ready';
  return '🟡 Draft';
}

export async function statusCommand(): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} no changes directory found`);
    return;
  }

  const entries = readdirSync(changesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== config.archive.dir)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (entries.length === 0) {
    log.dim('  no active changes');
    return;
  }

  const header = ['Change', ...ARTIFACT_TYPES.map((a) => a.slice(0, 8).padEnd(8)), 'Status'];
  const rows: string[][] = [];

  for (const entry of entries) {
    const changePath = join(changesDir, entry.name);
    const statuses: Record<string, string> = {};
    for (const art of ARTIFACT_TYPES) {
      statuses[art] = readStatus(changePath, art);
    }
    rows.push([
      entry.name,
      ...ARTIFACT_TYPES.map((a) => statusIcon(statuses[a])),
      overallStatus(statuses),
    ]);
  }

  const colWidths = header.map((h, i) => {
    const maxData = rows.reduce((max, row) => Math.max(max, stripAnsi(row[i]).length), 0);
    return Math.max(stripAnsi(h).length, maxData);
  });

  const divider = colWidths.map((w) => '-'.repeat(w + 2)).join('+');
  const formatRow = (row: string[]) =>
    row.map((cell, i) => ` ${cell.padEnd(colWidths[i])} `).join('|');

  log.info(`${symbol.start} changes`);
  console.log(formatRow(header));
  console.log(divider);
  for (const row of rows) {
    console.log(formatRow(row));
  }

  const archiveDir = join(changesDir, config.archive.dir);
  if (existsSync(archiveDir)) {
    const archived = readdirSync(archiveDir, { withFileTypes: true }).filter((e) => e.isDirectory());
    if (archived.length > 0) {
      log.dim(`\n  ${archived.length} archived change(s)`);
    }
  }
}

function stripAnsi(str: string): string {
  return str.replace(/\u001b\[[0-9;]*m/g, '').replace(/[✅🟢🟡]/g, 'XX');
}
