import { execSync } from 'node:child_process';

export function isGitRepo(): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function getCurrentBranch(): string | null {
  try {
    return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}

export function createBranch(branchName: string): void {
  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
}
