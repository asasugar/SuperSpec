import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

export interface LintResult {
  artifact: string;
  lines: number;
  status: 'ok' | 'warn' | 'error';
  message: string;
}

export function lintArtifact(filePath: string, targetLines: number, hardLines: number): LintResult {
  const artifact = basename(filePath);
  if (!existsSync(filePath)) {
    return { artifact, lines: 0, status: 'ok', message: 'not found' };
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').length;

  if (lines > hardLines) {
    return {
      artifact,
      lines,
      status: 'error',
      message: `${lines} lines exceeds hard limit (${hardLines}). Must split.`
    };
  }
  if (lines > targetLines) {
    return {
      artifact,
      lines,
      status: 'warn',
      message: `${lines} lines exceeds target (${targetLines}). Consider splitting.`
    };
  }
  return { artifact, lines, status: 'ok', message: `${lines} lines` };
}

export function lintChange(
  changePath: string,
  targetLines: number,
  hardLines: number
): LintResult[] {
  if (!existsSync(changePath)) return [];

  const files = readdirSync(changePath).filter((f) => f.endsWith('.md'));
  return files.map((f) => lintArtifact(join(changePath, f), targetLines, hardLines));
}
