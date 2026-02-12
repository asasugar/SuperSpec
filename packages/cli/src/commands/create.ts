import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../core/config.js';
import { writeRenderedTemplate } from '../core/template.js';
import { ensureDir, getDateString, renderNameTemplate, detectLang, type NameTemplateVars } from '../utils/index.js';
import { isGitRepo, createBranch } from '../utils/git.js';
import { log, symbol, t } from '../ui/index.js';

export interface CreateOptions {
  boost?: boolean;
  creative?: boolean;
  user?: string;
  branch?: boolean;
  specDir?: string;
  branchPrefix?: string;
  branchTemplate?: string;
  changeNameTemplate?: string;
  description?: string;
  intentType?: string;
}

export async function createCommand(feature: string, options: CreateOptions): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);

  const specDir = options.specDir || config.specDir;
  const branchPrefix = options.branchPrefix || config.branchPrefix;
  const boost = options.boost || config.boost;
  const strategy = options.creative ? 'create' : config.strategy;
  const description = options.description || '';
  const lang = detectLang(description, feature) || config.lang || 'zh';

  const templateVars: NameTemplateVars = {
    prefix: branchPrefix,
    intentType: options.intentType,
    feature,
    date: getDateString(),
    user: options.user,
  };

  const changeNameTemplate = options.changeNameTemplate || config.changeNameTemplate || '{date}-{feature}';
  const changeFolderName = renderNameTemplate(changeNameTemplate, templateVars, false);
  const changePath = join(cwd, specDir, 'changes', changeFolderName);

  if (existsSync(changePath)) {
    log.warn(`${symbol.warn} ${t(`change "${changeFolderName}" already exists`, `变更 "${changeFolderName}" 已存在`)}: ${changePath}`);
    return;
  }

  log.title(`${t('Creating Change', '创建变更')}: ${changeFolderName}`);
  if (options.intentType) {
    log.info(`${t('Intent Type', '意图类型')}: ${options.intentType}`);
  }

  if (boost) {
    log.boost(`${symbol.bolt} ${t('Boost mode enabled', '增强模式已启用')}`);
  }
  if (strategy === 'create') {
    log.boost(`${symbol.bolt} ${t('Creative mode: exploring new solutions', '创造模式：探索新方案')}`);
  }

  ensureDir(changePath);

  const vars: Record<string, string> = {
    name: changeFolderName,
    date: templateVars.date,
    boost: boost ? 'true' : 'false',
    strategy,
    description,
  };

  const artifacts = boost ? config.boostArtifacts : config.artifacts;

  log.section(t('Generating Artifacts', '生成 Artifacts'));
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
    const branchTemplate = options.branchTemplate || config.branchTemplate || '{prefix}{date}-{feature}';
    const branchName = renderNameTemplate(branchTemplate, templateVars, true);
    try {
      createBranch(branchName);
      log.success(`${symbol.ok} Branch: ${branchName}`);
    } catch (e: any) {
      log.warn(`${symbol.warn} ${t('branch creation failed', '分支创建失败')}: ${e.message}`);
    }
  }

  log.done(t('Change created successfully!', '变更创建成功！'));
  log.dim(`${t('Path', '路径')}: ${specDir}/changes/${changeFolderName}/`);

  if (boost) {
    log.dim(`${t('Workflow', '工作流')}: /ss-create → /ss-tasks → /ss-apply (boost)`);
  } else {
    log.dim(`${t('Workflow', '工作流')}: /ss-tasks → /ss-apply`);
  }

  log.dim(`${t('Next', '下一步')}: superspec lint ${changeFolderName}`);
}
