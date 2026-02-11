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

const SS_START = '<!-- superspec:start -->';
const SS_END = '<!-- superspec:end -->';

export function installAgentsMd(cwd: string): void {
  const agentsMdPath = join(cwd, 'AGENTS.md');
  const agentPromptSrc = join(getPackageRoot(), 'prompts', 'agents.md');

  if (!existsSync(agentPromptSrc)) return;

  const newContent = readFileSync(agentPromptSrc, 'utf-8');
  const wrapped = `${SS_START}\n${newContent}\n${SS_END}`;

  if (existsSync(agentsMdPath)) {
    const existing = readFileSync(agentsMdPath, 'utf-8');
    const startIdx = existing.indexOf(SS_START);
    const endIdx = existing.indexOf(SS_END);

    if (startIdx !== -1 && endIdx !== -1) {
      const before = existing.slice(0, startIdx);
      const after = existing.slice(endIdx + SS_END.length);
      writeFileSync(agentsMdPath, before + wrapped + after, 'utf-8');
    } else if (existing.includes('SuperSpec')) {
      writeFileSync(agentsMdPath, existing, 'utf-8');
    } else {
      writeFileSync(agentsMdPath, existing + '\n\n' + wrapped, 'utf-8');
    }
  } else {
    writeFileSync(agentsMdPath, wrapped, 'utf-8');
  }
  log.success(`  ${symbol.ok} AGENTS.md`);
}
