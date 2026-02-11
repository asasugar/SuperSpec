import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { writeRenderedTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { isGitRepo, createBranch } from '../utils/git.js';
import { getDateString } from '../utils/date.js';
import { log, symbol } from '../ui/index.js';

export interface CreateOptions {
  boost?: boolean;
  creative?: boolean;
  branch?: boolean;
  specDir?: string;
  branchPrefix?: string;
  description?: string;
}

export async function createCommand(name: string, options: CreateOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);

  const specDir = options.specDir || config.specDir;
  const branchPrefix = options.branchPrefix || config.branchPrefix;
  const boost = options.boost || config.boost;
  const strategy = options.creative ? 'create' : config.strategy;
  const lang = config.lang || 'zh';
  const description = options.description || '';

  const changePath = join(cwd, specDir, 'changes', name);

  if (existsSync(changePath)) {
    log.warn(`${symbol.warn} Change "${name}" already exists: ${changePath}`);
    return;
  }

  log.title(`Creating Change: ${name}`);

  if (boost) {
    log.boost(`${symbol.bolt} Boost mode enabled`);
  }
  if (strategy === 'create') {
    log.boost(`${symbol.bolt} Creative mode: exploring new solutions`);
  }

  ensureDir(changePath);

  const vars: Record<string, string> = {
    name,
    date: getDateString(),
    boost: boost ? 'true' : 'false',
    strategy,
    description,
  };

  const artifacts = boost ? config.boostArtifacts : config.artifacts;

  log.section('Generating Artifacts');
  for (const artifact of artifacts) {
    const templateFile = config.templates[artifact] || `${artifact}.md`;
    const destPath = join(changePath, `${artifact}.md`);
    try {
      writeRenderedTemplate(templateFile, destPath, vars, lang);
      log.success(`${symbol.ok} ${artifact}.md`);
    } catch (e: any) {
      log.error(`${symbol.fail} ${artifact}.md: ${e.message}`);
    }
  }

  if (options.branch !== false && isGitRepo()) {
    const branchTemplate = config.branchTemplate || '{prefix}{name}';
    const branchName = branchTemplate.replace('{prefix}', branchPrefix).replace('{name}', name);
    try {
      createBranch(branchName);
      log.success(`${symbol.ok} Branch: ${branchName}`);
    } catch (e: any) {
      log.warn(`${symbol.warn} Branch creation failed: ${e.message}`);
    }
  }

  log.done('Change created successfully!');
  log.dim(`Path: ${specDir}/changes/${name}/`);

  if (boost) {
    log.dim(`Workflow: /ss-create → /ss-tasks → /ss-apply (boost)`);
  } else {
    log.dim(`Workflow: /ss-tasks → /ss-apply`);
  }
}
