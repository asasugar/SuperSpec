import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ensureDir } from '../utils/fs.js';
import { getPackageRoot } from '../utils/paths.js';

export function resolveTemplatePath(templateName: string, lang: string = 'zh'): string {
  const root = getPackageRoot();
  const langPath = join(root, 'templates', lang, templateName);
  if (existsSync(langPath)) return langPath;
  const fallbackLang = lang === 'zh' ? 'en' : 'zh';
  const fallback = join(root, 'templates', fallbackLang, templateName);
  if (existsSync(fallback)) return fallback;
  throw new Error(`Template not found: ${templateName} (lang: ${lang})`);
}

export function copyTemplate(templateName: string, destPath: string, lang: string = 'zh'): void {
  const srcPath = resolveTemplatePath(templateName, lang);
  ensureDir(dirname(destPath));
  copyFileSync(srcPath, destPath);
}

/**
 * Simple template engine supporting:
 * - {{variable}} - variable substitution
 * - {{#if variable}}...{{/if}} - conditional blocks (shown if variable is truthy)
 */
export function renderTemplate(
  templateName: string,
  vars: Record<string, string> = {},
  lang: string = 'zh'
): string {
  const srcPath = resolveTemplatePath(templateName, lang);
  let content = readFileSync(srcPath, 'utf-8');

  // Process conditionals first: {{#if variable}}...{{/if}}
  content = processConditionals(content, vars);

  // Process simple variable substitution: {{variable}}
  for (const [key, value] of Object.entries(vars)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  return content;
}

function processConditionals(content: string, vars: Record<string, string>): string {
  // Match {{#if variable}}...{{/if}} patterns
  const ifRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;

  return content.replace(ifRegex, (_match, varName, innerContent) => {
    const value = vars[varName];
    // Show content if variable exists and is not empty
    if (value && value.trim() !== '') {
      return innerContent;
    }
    return '';
  });
}

export function writeRenderedTemplate(
  templateName: string,
  destPath: string,
  vars: Record<string, string> = {},
  lang: string = 'zh'
): void {
  const content = renderTemplate(templateName, vars, lang);
  ensureDir(dirname(destPath));
  writeFileSync(destPath, content, 'utf-8');
}
