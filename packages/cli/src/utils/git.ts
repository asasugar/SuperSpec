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

const SAFE_BRANCH_RE = /^[a-zA-Z0-9._\-/]+$/;

export function createBranch(branchName: string): void {
  if (!SAFE_BRANCH_RE.test(branchName)) {
    throw new Error(`invalid branch name: ${branchName}`);
  }
  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
}

export function getDefaultBranch(): string {
  try {
    const ref = execSync('git symbolic-ref refs/remotes/origin/HEAD', { encoding: 'utf-8' }).trim();
    return ref.replace('refs/remotes/origin/', '');
  } catch {
    try {
      execSync('git rev-parse --verify main', { stdio: 'ignore' });
      return 'main';
    } catch {
      return 'master';
    }
  }
}

export interface GitChange {
  status: string;
  file: string;
}

export function getDiffFiles(base?: string): GitChange[] {
  const baseBranch = base || getDefaultBranch();
  try {
    const mergeBase = execSync(`git merge-base ${baseBranch} HEAD`, { encoding: 'utf-8' }).trim();
    const output = execSync(`git diff --name-status ${mergeBase}`, { encoding: 'utf-8' }).trim();
    if (!output) return [];
    return output.split('\n').map((line) => {
      const [status, ...parts] = line.split('\t');
      return { status: status.charAt(0), file: parts.join('\t') };
    });
  } catch {
    return [];
  }
}
