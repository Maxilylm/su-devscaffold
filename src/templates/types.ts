export type CodingCLI = 'claude-code' | 'cursor' | 'codex' | 'copilot' | 'opencode' | 'gemini';

export type ProjectType = 'nextjs' | 'vite-react' | 'python' | 'nodejs' | 'general';

export type Feature =
  | 'auth'
  | 'database'
  | 'api'
  | 'testing'
  | 'ai-llm'
  | 'styling'
  | 'deployment'
  | 'git-workflow';

export interface WizardState {
  cli: CodingCLI | null;
  projectType: ProjectType | null;
  features: Feature[];
  projectName: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export const CLI_OPTIONS: { id: CodingCLI; name: string; icon: string; description: string }[] = [
  { id: 'claude-code', name: 'Claude Code', icon: '\u2728', description: 'CLAUDE.md, skills/, hooks/' },
  { id: 'cursor', name: 'Cursor', icon: '\u{1F4DD}', description: '.cursorrules, .cursor/rules/' },
  { id: 'codex', name: 'Codex CLI', icon: '\u{1F916}', description: 'AGENTS.md, codex instructions' },
  { id: 'copilot', name: 'GitHub Copilot', icon: '\u{1F419}', description: '.github/copilot-instructions.md' },
  { id: 'opencode', name: 'OpenCode', icon: '\u{1F4BB}', description: 'opencode.md' },
  { id: 'gemini', name: 'Gemini CLI', icon: '\u{1F48E}', description: 'GEMINI.md' },
];

export const PROJECT_OPTIONS: { id: ProjectType; name: string; icon: string; description: string }[] = [
  { id: 'nextjs', name: 'Next.js App Router', icon: '\u25B2', description: 'React framework with SSR & API routes' },
  { id: 'vite-react', name: 'Vite + React', icon: '\u26A1', description: 'Fast frontend with HMR' },
  { id: 'python', name: 'Python (FastAPI/Flask)', icon: '\u{1F40D}', description: 'Python web API framework' },
  { id: 'nodejs', name: 'Node.js API (Express)', icon: '\u{1F7E2}', description: 'Node.js REST API server' },
  { id: 'general', name: 'General / Other', icon: '\u{1F4E6}', description: 'Generic project setup' },
];

export const FEATURE_OPTIONS: { id: Feature; name: string; icon: string; description: string }[] = [
  { id: 'auth', name: 'Authentication', icon: '\u{1F512}', description: 'Auth patterns, middleware rules' },
  { id: 'database', name: 'Database', icon: '\u{1F5C3}\uFE0F', description: 'ORM patterns, migration rules' },
  { id: 'api', name: 'API Design', icon: '\u{1F310}', description: 'REST conventions, error handling' },
  { id: 'testing', name: 'Testing', icon: '\u{1F9EA}', description: 'TDD rules, test patterns' },
  { id: 'ai-llm', name: 'AI/LLM Integration', icon: '\u{1F9E0}', description: 'Prompt patterns, streaming' },
  { id: 'styling', name: 'Styling', icon: '\u{1F3A8}', description: 'Tailwind, CSS conventions' },
  { id: 'deployment', name: 'Deployment', icon: '\u{1F680}', description: 'CI/CD, environment vars' },
  { id: 'git-workflow', name: 'Git Workflow', icon: '\u{1F500}', description: 'Commit conventions, branching' },
];
