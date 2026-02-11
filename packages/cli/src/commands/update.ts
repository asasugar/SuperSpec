import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { copyTemplate } from '../core/template.js';
import { ensureDir } from '../utils/fs.js';
import { installCursorRules, installAgentsMd } from '../prompts/index.js';
import { log, symbol } from '../ui/index.js';

export async function updateCommand(): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const specDir = join(cwd, config.specDir);
  const lang = config.lang || 'zh';

  if (!existsSync(join(cwd, 'superspec.config.json'))) {
    log.warn(`${symbol.warn} 当前目录未初始化 SuperSpec，请先运行 superspec init`);
    return;
  }

  log.info(`${symbol.start} 更新 SuperSpec...`);

  const templates = ['spec.md', 'proposal.md', 'tasks.md', 'clarify.md', 'checklist.md'];
  ensureDir(join(specDir, 'templates'));
  for (const tpl of templates) {
    copyTemplate(tpl, join(specDir, 'templates', tpl), lang);
  }
  log.success(`  ${symbol.ok} 模板更新 (${lang})`);

  installCursorRules(cwd);
  installAgentsMd(cwd);

  log.info(`${symbol.start} 更新完成！`);
}
