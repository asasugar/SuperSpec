import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { addDependency, parseFrontmatter, removeDependency } from '../core/frontmatter.js';
import { log, symbol, t } from '../ui/index.js';

export async function depsAddCommand(name: string, options: { on: string }): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const proposalPath = join(cwd, config.specDir, 'changes', name, 'proposal.md');

  if (!existsSync(proposalPath)) {
    log.warn(`${symbol.warn} "${name}" ${t('not found', '未找到')}`);
    return;
  }

  const content = readFileSync(proposalPath, 'utf-8');
  const updated = addDependency(content, options.on);
  writeFileSync(proposalPath, updated, 'utf-8');
  log.success(`${symbol.ok} ${name} → depends_on: ${options.on}`);
}

export async function depsRemoveCommand(name: string, options: { on: string }): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const proposalPath = join(cwd, config.specDir, 'changes', name, 'proposal.md');

  if (!existsSync(proposalPath)) {
    log.warn(`${symbol.warn} "${name}" ${t('not found', '未找到')}`);
    return;
  }

  const content = readFileSync(proposalPath, 'utf-8');
  const updated = removeDependency(content, options.on);
  writeFileSync(proposalPath, updated, 'utf-8');
  log.success(`${symbol.ok} ${name} → ${t('removed dependency', '移除依赖')}: ${options.on}`);
}

export async function depsListCommand(name: string | undefined): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  if (name) {
    const proposalPath = join(changesDir, name, 'proposal.md');
    if (!existsSync(proposalPath)) {
      log.warn(`${symbol.warn} "${name}" ${t('not found', '未找到')}`);
      return;
    }
    const content = readFileSync(proposalPath, 'utf-8');
    const { meta } = parseFrontmatter(content);
    const deps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];
    log.info(`${symbol.start} ${name}`);
    if (deps.length === 0) {
      log.dim(`  ${t('no dependencies', '无依赖')}`);
    } else {
      for (const d of deps) {
        log.dim(`  → ${d}`);
      }
    }
    return;
  }

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} ${t('no changes directory', '未找到 changes 目录')}`);
    return;
  }

  const entries = readdirSync(changesDir, { withFileTypes: true }).filter(
    (e) => e.isDirectory() && e.name !== config.archive.dir
  );

  log.info(`${symbol.start} ${t('dependency graph', '依赖关系')}`);
  for (const entry of entries) {
    const proposalPath = join(changesDir, entry.name, 'proposal.md');
    if (!existsSync(proposalPath)) continue;
    const content = readFileSync(proposalPath, 'utf-8');
    const { meta } = parseFrontmatter(content);
    const deps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];
    if (deps.length > 0) {
      log.dim(`  ${entry.name} → [${deps.join(', ')}]`);
    } else {
      log.dim(`  ${entry.name}`);
    }
  }
}
