import { existsSync, mkdirSync, readdirSync } from 'node:fs';

export function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function resolveChangeNames(
  changesDir: string,
  name: string | undefined,
  archiveDirName: string
): string[] {
  if (!existsSync(changesDir)) return [];
  if (name) return [name];
  return readdirSync(changesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== archiveDirName)
    .map((e) => e.name);
}
