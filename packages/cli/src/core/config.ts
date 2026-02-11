import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export interface SuperSpecConfig {
  lang: 'zh' | 'en';
  specDir: string;
  branchPrefix: string;
  branchTemplate: string;
  boost: boolean;
  templates: Record<string, string>;
  archive: {
    dir: string;
    datePrefix: boolean;
  };
  artifacts: string[];
  boostArtifacts: string[];
}

const DEFAULT_CONFIG: SuperSpecConfig = {
  lang: 'zh',
  specDir: 'superspec',
  branchPrefix: 'spec/',
  branchTemplate: '{prefix}{name}',
  boost: false,
  templates: {
    spec: 'spec.md',
    proposal: 'proposal.md',
    tasks: 'tasks.md',
    clarify: 'clarify.md',
    checklist: 'checklist.md',
  },
  archive: {
    dir: 'archive',
    datePrefix: true,
  },
  artifacts: ['proposal', 'spec', 'tasks'],
  boostArtifacts: ['proposal', 'spec', 'tasks', 'checklist'],
};

export function loadConfig(projectRoot: string = process.cwd()): SuperSpecConfig {
  const configPath = join(projectRoot, 'superspec.config.json');
  let userConfig: Partial<SuperSpecConfig> = {};

  if (existsSync(configPath)) {
    try {
      userConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch (e: any) {
      console.warn(`⚠ 配置文件解析失败: ${e.message}`);
    }
  }

  return deepMerge(DEFAULT_CONFIG, userConfig) as SuperSpecConfig;
}

export function getDefaultConfig(): SuperSpecConfig {
  return structuredClone(DEFAULT_CONFIG);
}

function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
