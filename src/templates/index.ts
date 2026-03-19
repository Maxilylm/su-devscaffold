import type { CodingCLI, ProjectType, Feature, GeneratedFile } from './types';
import { generateClaudeCodeFiles } from './claude-code';
import { generateCursorFiles } from './cursor';
import { generateCodexFiles } from './codex';
import { generateCopilotFiles } from './copilot';
import { generateOpenCodeFiles } from './opencode';
import { generateGeminiFiles } from './gemini';

export type { CodingCLI, ProjectType, Feature, GeneratedFile, WizardState } from './types';
export { CLI_OPTIONS, PROJECT_OPTIONS, FEATURE_OPTIONS } from './types';

const generators: Record<CodingCLI, (name: string, pt: ProjectType, f: Feature[]) => GeneratedFile[]> = {
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
): GeneratedFile[] {
  return generators[cli](projectName, projectType, features);
}
