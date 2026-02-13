export interface NameTemplateVars {
  prefix?: string;
  intentType?: string;
  feature: string;
  date: string;
  user?: string;
  [key: string]: string | undefined;
}

export function renderNameTemplate(
  template: string,
  vars: NameTemplateVars,
  strict = false
): string {
  let result = template;

  for (const [key, value] of Object.entries(vars)) {
    if (value !== undefined) {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
  }

  result = result.replace(/\{[^}]+\}/g, '');

  if (strict) {
    return result
      .replace(/[^a-zA-Z0-9._\-/]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  return result
    .replace(/[^\p{L}\p{N}._\-/]/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
