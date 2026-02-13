import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { copyTemplate } from '../core/template.js';
import {
  AI_EDITORS,
  type AIEditor,
  installAgentsMd,
  installCommands,
  installRules
} from '../prompts/index.js';
import { log, symbol, t } from '../ui/index.js';
import { ensureDir } from '../utils/fs.js';

export async function updateCommand(): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const specDir = join(cwd, config.specDir);
  const lang = config.lang || 'zh';

  if (!existsSync(join(cwd, 'superspec.config.json'))) {
    log.warn(
      `${symbol.warn} ${t('not initialized, run superspec init first', '当前目录未初始化 SuperSpec，请先运行 superspec init')}`
    );
    return;
  }

  log.info(`${symbol.start} ${t('updating SuperSpec...', '更新 SuperSpec...')}`);

  const templateNames = Object.values(config.templates).map((v) =>
    v.endsWith('.md') ? v : `${v}.md`
  );
  ensureDir(join(specDir, 'templates'));
  for (const tpl of templateNames) {
    try {
      copyTemplate(tpl, join(specDir, 'templates', tpl), lang);
    } catch {
      // skip missing templates
    }
  }
  log.success(`  ${symbol.ok} ${t('templates updated', '模板更新')} (${lang})`);

  installAgentsMd(cwd);

  const aiEditor = config.aiEditor as AIEditor;
  if (aiEditor && AI_EDITORS[aiEditor]) {
    installRules(cwd, aiEditor);
    installCommands(cwd, aiEditor, lang);
  }

  log.info(`${symbol.start} ${t('update done!', '更新完成！')}`);
}
