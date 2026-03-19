import type { CodingCLI, ProjectType, Feature, Role, GeneratedFile } from './types';
import { generateClaudeCodeFiles } from './claude-code';
import { generateCursorFiles } from './cursor';
import { generateCodexFiles } from './codex';
import { generateCopilotFiles } from './copilot';
import { generateOpenCodeFiles } from './opencode';
import { generateGeminiFiles } from './gemini';

export type { CodingCLI, ProjectType, Feature, Role, GeneratedFile, WizardState } from './types';
export { CLI_OPTIONS, PROJECT_OPTIONS, PROJECT_CATEGORIES, FEATURE_OPTIONS, FEATURE_CATEGORIES, ROLE_OPTIONS } from './types';

const generators: Record<CodingCLI, (name: string, pt: ProjectType, f: Feature[], r: Role) => GeneratedFile[]> = {
  'claude-code': generateClaudeCodeFiles,
  cursor: generateCursorFiles,
  codex: generateCodexFiles,
  copilot: generateCopilotFiles,
  opencode: generateOpenCodeFiles,
  gemini: generateGeminiFiles,
};

export function generateFiles(
  cli: CodingCLI,
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return generators[cli](projectName, projectType, features, role);
}
