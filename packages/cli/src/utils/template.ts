const CJK_REGEX = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}]/u;

export function detectLang(...inputs: (string | undefined)[]): 'zh' | 'en' | undefined {
  for (const text of inputs) {
    if (text && CJK_REGEX.test(text)) return 'zh';
  }
  return undefined;
}

export interface NameTemplateVars {
  prefix?: string;
  intentType?: string;
  feature: string;
  date: string;
  user?: string;
  [key: string]: string | undefined;
}


export function renderNameTemplate(template: string, vars: NameTemplateVars, strict = false): string {
  let result = template;

  for (const [key, value] of Object.entries(vars)) {
    if (value !== undefined) {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
  }

  result = result.replace(/\{[^}]+\}/g, '');

  if (strict) {
    return result.replace(/[^a-zA-Z0-9._\-/]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }
  return result.replace(/[^\p{L}\p{N}._\-/]/gu, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
