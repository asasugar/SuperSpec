const FM_REGEX = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

export interface Frontmatter {
  [key: string]: any;
}

export interface ParsedDoc {
  meta: Frontmatter;
  body: string;
}

export function parseFrontmatter(content: string): ParsedDoc {
  const match = content.match(FM_REGEX);
  if (!match) {
    return { meta: {}, body: content };
  }

  const meta: Frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value: any = line.slice(idx + 1).trim();
    if (value === '[]') {
      value = [];
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    meta[key] = value;
  }

  return { meta, body: match[2] };
}

export function serializeFrontmatter(meta: Frontmatter): string {
  const lines: string[] = ['---'];
  for (const [key, value] of Object.entries(meta)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}: [${value.map((v: string) => `"${v}"`).join(', ')}]`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

export function updateFrontmatter(content: string, updates: Partial<Frontmatter>): string {
  const { meta, body } = parseFrontmatter(content);
  const merged = { ...meta, ...updates };
  return serializeFrontmatter(merged) + '\n' + body;
}

export function addDependency(content: string, depName: string): string {
  const { meta, body } = parseFrontmatter(content);
  const deps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];
  if (!deps.includes(depName)) {
    deps.push(depName);
  }
  meta.depends_on = deps;
  return serializeFrontmatter(meta) + '\n' + body;
}

export function removeDependency(content: string, depName: string): string {
  const { meta, body } = parseFrontmatter(content);
  const deps: string[] = Array.isArray(meta.depends_on) ? meta.depends_on : [];
  meta.depends_on = deps.filter((d) => d !== depName);
  return serializeFrontmatter(meta) + '\n' + body;
}
