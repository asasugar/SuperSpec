import { existsSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { getPackageRoot } from '../utils/paths.js';
import { ensureDir } from '../utils/fs.js';

export function resolveTemplatePath(templateName: string, lang: string = 'zh'): string {
  const root = getPackageRoot();
  const langPath = join(root, 'templates', lang, templateName);
  if (existsSync(langPath)) return langPath;
  const fallback = join(root, 'templates', 'zh', templateName);
  if (existsSync(fallback)) return fallback;
  throw new Error(`模板不存在: ${templateName} (lang: ${lang})`);
}

export function copyTemplate(templateName: string, destPath: string, lang: string = 'zh'): void {
  const srcPath = resolveTemplatePath(templateName, lang);
  ensureDir(dirname(destPath));
  copyFileSync(srcPath, destPath);
}

export function renderTemplate(templateName: string, vars: Record<string, string> = {}, lang: string = 'zh'): string {
  const srcPath = resolveTemplatePath(templateName, lang);
  let content = readFileSync(srcPath, 'utf-8');
  for (const [key, value] of Object.entries(vars)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }
  return content;
}

export function writeRenderedTemplate(
  templateName: string,
  destPath: string,
  vars: Record<string, string> = {},
  lang: string = 'zh',
): void {
  const content = renderTemplate(templateName, vars, lang);
  ensureDir(dirname(destPath));
  writeFileSync(destPath, content, 'utf-8');
}
