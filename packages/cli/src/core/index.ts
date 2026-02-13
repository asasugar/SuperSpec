export type { Strategy, SuperSpecConfig } from './config.js';
export { getDefaultConfig, loadConfig } from './config.js';
export type { ContextData } from './context.js';
export { generateContext } from './context.js';
export type { Frontmatter, ParsedDoc } from './frontmatter.js';
export {
  addDependency,
  parseFrontmatter,
  removeDependency,
  serializeFrontmatter,
  updateFrontmatter
} from './frontmatter.js';
export type { LintResult } from './lint.js';
export { lintArtifact, lintChange } from './lint.js';
export {
  copyTemplate,
  renderTemplate,
  resolveTemplatePath,
  writeRenderedTemplate
} from './template.js';
export type { ValidationIssue } from './validate.js';
export { validateChange } from './validate.js';
