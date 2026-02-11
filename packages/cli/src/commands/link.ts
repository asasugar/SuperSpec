import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { addDependency, removeDependency, parseFrontmatter } from '../core/frontmatter.js';
import { log, symbol } from '../ui/index.js';

export interface LinkOptions {
  dependsOn: string;
}

export async function linkCommand(name: string, options: LinkOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const proposalPath = join(cwd, config.specDir, 'changes', name, 'proposal.md');

  if (!existsSync(proposalPath)) {
    log.warn(`${symbol.warn} "${name}" not found`);
    return;
  }

  const content = readFileSync(proposalPath, 'utf-8');
  const updated = addDependency(content, options.dependsOn);
  writeFileSync(proposalPath, updated, 'utf-8');
  log.success(`${symbol.ok} ${name} → depends_on: ${options.dependsOn}`);
}

export async function unlinkCommand(name: string, options: LinkOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const proposalPath = join(cwd, config.specDir, 'changes', name, 'proposal.md');

  if (!existsSync(proposalPath)) {
    log.warn(`${symbol.warn} "${name}" not found`);
    return;
  }

  const content = readFileSync(proposalPath, 'utf-8');
  const updated = removeDependency(content, options.dependsOn);
  writeFileSync(proposalPath, updated, 'utf-8');
  log.success(`${symbol.ok} ${name} → removed dependency: ${options.dependsOn}`);
}

export async function depsCommand(name: string): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const changesDir = join(cwd, config.specDir, 'changes');

  if (name) {
    const proposalPath = join(changesDir, name, 'proposal.md');
    if (!existsSync(proposalPath)) {
      log.warn(`${symbol.warn} "${name}" not found`);
      return;
    }
    const content = readFileSync(proposalPath, 'utf-8');
    const { meta } = parseFrontmatter(content);
    const deps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];
    log.info(`${symbol.start} ${name}`);
    if (deps.length === 0) {
      log.dim('  no dependencies');
    } else {
      for (const d of deps) {
        log.dim(`  → ${d}`);
      }
    }
    return;
  }

  if (!existsSync(changesDir)) {
    log.warn(`${symbol.warn} no changes directory`);
    return;
  }

  const entries = readdirSync(changesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== config.archive.dir);

  log.info(`${symbol.start} dependency graph`);
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
