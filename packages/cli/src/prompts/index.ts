import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getPackageRoot } from '../utils/paths.js';
import { ensureDir } from '../utils/fs.js';
import { log, symbol } from '../ui/index.js';

export function installCursorRules(cwd: string): void {
  const rulesDir = join(cwd, '.cursor', 'rules');
  ensureDir(rulesDir);

  const promptSrc = join(getPackageRoot(), 'prompts', 'cursor-rules.md');
  if (existsSync(promptSrc)) {
    const content = readFileSync(promptSrc, 'utf-8');
    writeFileSync(join(rulesDir, 'superspec.mdc'), content, 'utf-8');
    log.success(`  ${symbol.ok} .cursor/rules/superspec.mdc`);
  }
}

export function installAgentsMd(cwd: string): void {
  const agentsMdPath = join(cwd, 'AGENTS.md');
  const agentPromptSrc = join(getPackageRoot(), 'prompts', 'agents.md');

  if (!existsSync(agentPromptSrc)) return;

  const content = readFileSync(agentPromptSrc, 'utf-8');
  if (existsSync(agentsMdPath)) {
    const existing = readFileSync(agentsMdPath, 'utf-8');
    if (!existing.includes('SuperSpec')) {
      writeFileSync(agentsMdPath, existing + '\n\n' + content, 'utf-8');
    }
  } else {
    writeFileSync(agentsMdPath, content, 'utf-8');
  }
  log.success(`  ${symbol.ok} AGENTS.md`);
}
