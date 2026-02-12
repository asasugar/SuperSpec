import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export type Strategy = 'follow' | 'create';
export type AIEditorType = 'claude' | 'cursor' | 'qwen' | 'opencode' | 'codex' | 'codebuddy' | 'qoder';

export interface SuperSpecConfig {
  lang: 'zh' | 'en';
  aiEditor: AIEditorType;
  specDir: string;
  branchPrefix: string;
  branchTemplate: string;
  changeNameTemplate: string;
  boost: boolean;
  strategy: Strategy;
  context: string[];
  templates: Record<string, string>;
  archive: {
    dir: string;
    datePrefix: boolean;
  };
  limits: {
    targetLines: number;
    hardLines: number;
  };
  artifacts: string[];
  boostArtifacts: string[];
}

const DEFAULT_CONFIG: SuperSpecConfig = {
  lang: 'en',
  aiEditor: 'cursor',
  specDir: 'superspec',
  branchPrefix: '',
  branchTemplate: '{prefix}{intentType}-{date}-{feature}-{user}',
  changeNameTemplate: '{prefix}{intentType}-{date}-{feature}-{user}',
  boost: false,
  strategy: 'follow',
  context: [],
  templates: {
    spec: 'spec.md',
    proposal: 'proposal.md',
    tasks: 'tasks.md',
    clarify: 'clarify.md',
    checklist: 'checklist.md',
    design: 'design.md'
  },
  archive: {
    dir: 'archive',
    datePrefix: true,
  },
  limits: {
    targetLines: 300,
    hardLines: 400,
  },
  artifacts: ['proposal'],
  boostArtifacts: ['proposal', 'spec', 'design', 'tasks', 'checklist'],
};

export function loadConfig(projectRoot: string = process.cwd(), silent: boolean = false): SuperSpecConfig {
  const configPath = join(projectRoot, 'superspec.config.json');
  let userConfig: Partial<SuperSpecConfig> = {};

  if (existsSync(configPath)) {
    try {
      userConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch (e: any) {
      if (!silent) {
        console.warn(`⚠ Config file parsing failed: ${e.message}`);
      }
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
    const val = source[key];
    if (val === null || val === undefined) continue;
    if (
      typeof val === 'object' &&
      !Array.isArray(val) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      result[key] = deepMerge(target[key], val);
    } else {
      result[key] = val;
    }
  }
  return result;
}
