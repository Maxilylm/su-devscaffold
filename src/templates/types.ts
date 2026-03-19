export type CodingCLI = 'claude-code' | 'cursor' | 'codex' | 'copilot' | 'opencode' | 'gemini';

export type ProjectType =
  | 'nextjs'
  | 'vite-react'
  | 'python'
  | 'nodejs'
  | 'general'
  | 'ml-python'
  | 'data-engineering'
  | 'django'
  | 'aws-cdk'
  | 'gcp-terraform'
  | 'azure-infra'
  | 'databricks'
  | 'snowflake'
  | 'react-native'
  | 'go-api'
  | 'rust-cli';

export type Feature =
  | 'auth'
  | 'database'
  | 'api'
  | 'testing'
  | 'ai-llm'
  | 'styling'
  | 'deployment'
  | 'git-workflow'
  | 'mlops'
  | 'data-pipeline'
  | 'monitoring'
  | 'security'
  | 'ci-cd'
  | 'containerization'
  | 'documentation';

export type Role =
  | 'developer'
  | 'data-scientist'
  | 'devops'
  | 'pm'
  | 'qa'
  | 'architect';

export interface WizardState {
  cli: CodingCLI | null;
  projectType: ProjectType | null;
  features: Feature[];
  projectName: string;
  role: Role;
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

export interface ProjectCategory {
  name: string;
  icon: string;
  options: { id: ProjectType; name: string; icon: string; description: string }[];
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    name: 'Web & Mobile',
    icon: '\u{1F310}',
    options: [
      { id: 'nextjs', name: 'Next.js App Router', icon: '\u25B2', description: 'React framework with SSR & API routes' },
      { id: 'vite-react', name: 'Vite + React', icon: '\u26A1', description: 'Fast frontend with HMR' },
      { id: 'django', name: 'Django', icon: '\u{1F3AF}', description: 'Python full-stack web framework' },
      { id: 'react-native', name: 'React Native', icon: '\u{1F4F1}', description: 'Cross-platform mobile app' },
    ],
  },
  {
    name: 'Backend & APIs',
    icon: '\u{1F5A5}\uFE0F',
    options: [
      { id: 'python', name: 'Python (FastAPI/Flask)', icon: '\u{1F40D}', description: 'Python web API framework' },
      { id: 'nodejs', name: 'Node.js API (Express)', icon: '\u{1F7E2}', description: 'Node.js REST API server' },
      { id: 'go-api', name: 'Go API', icon: '\u{1F439}', description: 'Go HTTP service (Chi/Gin)' },
      { id: 'rust-cli', name: 'Rust CLI / Service', icon: '\u{1F980}', description: 'Rust CLI tool or service' },
    ],
  },
  {
    name: 'ML & Data Science',
    icon: '\u{1F9E0}',
    options: [
      { id: 'ml-python', name: 'ML / Data Science', icon: '\u{1F4CA}', description: 'Python ML with scikit-learn, PyTorch, pandas' },
      { id: 'data-engineering', name: 'Data Engineering', icon: '\u{1F6E0}\uFE0F', description: 'Pipelines with Airflow, Spark, dbt' },
      { id: 'databricks', name: 'Databricks', icon: '\u{1F9F1}', description: 'Databricks notebooks & jobs' },
      { id: 'snowflake', name: 'Snowflake', icon: '\u2744\uFE0F', description: 'Snowflake SQL & dbt models' },
    ],
  },
  {
    name: 'Cloud & Infrastructure',
    icon: '\u2601\uFE0F',
    options: [
      { id: 'aws-cdk', name: 'AWS (CDK / SAM)', icon: '\u{1F536}', description: 'AWS infra with CDK or SAM templates' },
      { id: 'gcp-terraform', name: 'GCP (Terraform)', icon: '\u{1F535}', description: 'GCP infra with Terraform modules' },
      { id: 'azure-infra', name: 'Azure (Bicep / ARM)', icon: '\u{1F7E6}', description: 'Azure infra with Bicep templates' },
      { id: 'general', name: 'General / Other', icon: '\u{1F4E6}', description: 'Generic project setup' },
    ],
  },
];

// Flat list for backward compatibility
export const PROJECT_OPTIONS = PROJECT_CATEGORIES.flatMap(c => c.options);

export interface FeatureCategory {
  name: string;
  options: { id: Feature; name: string; icon: string; description: string }[];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    name: 'Core',
    options: [
      { id: 'auth', name: 'Authentication', icon: '\u{1F512}', description: 'Auth patterns, middleware rules' },
      { id: 'database', name: 'Database', icon: '\u{1F5C3}\uFE0F', description: 'ORM patterns, migration rules' },
      { id: 'api', name: 'API Design', icon: '\u{1F310}', description: 'REST conventions, error handling' },
      { id: 'testing', name: 'Testing', icon: '\u{1F9EA}', description: 'TDD rules, test patterns' },
      { id: 'styling', name: 'Styling', icon: '\u{1F3A8}', description: 'Tailwind, CSS conventions' },
    ],
  },
  {
    name: 'AI & Data',
    options: [
      { id: 'ai-llm', name: 'AI/LLM Integration', icon: '\u{1F9E0}', description: 'Prompt patterns, streaming' },
      { id: 'mlops', name: 'MLOps', icon: '\u{1F52C}', description: 'Experiment tracking, model registry, reproducibility' },
      { id: 'data-pipeline', name: 'Data Pipelines', icon: '\u{1F4CA}', description: 'ETL/ELT patterns, data quality, lineage' },
    ],
  },
  {
    name: 'DevOps & Infra',
    options: [
      { id: 'deployment', name: 'Deployment', icon: '\u{1F680}', description: 'CI/CD, environment vars' },
      { id: 'ci-cd', name: 'CI/CD Pipelines', icon: '\u{1F504}', description: 'GitHub Actions, Jenkins, pipelines' },
      { id: 'containerization', name: 'Docker / K8s', icon: '\u{1F433}', description: 'Dockerfile, compose, Kubernetes manifests' },
      { id: 'monitoring', name: 'Monitoring', icon: '\u{1F4C8}', description: 'Logging, metrics, alerting, observability' },
      { id: 'security', name: 'Security', icon: '\u{1F6E1}\uFE0F', description: 'OWASP, secrets management, compliance' },
    ],
  },
  {
    name: 'Process',
    options: [
      { id: 'git-workflow', name: 'Git Workflow', icon: '\u{1F500}', description: 'Commit conventions, branching' },
      { id: 'documentation', name: 'Documentation', icon: '\u{1F4DD}', description: 'ADRs, API docs, runbooks' },
    ],
  },
];

export const FEATURE_OPTIONS = FEATURE_CATEGORIES.flatMap(c => c.options);

export const ROLE_OPTIONS: { id: Role; name: string; icon: string; description: string }[] = [
  { id: 'developer', name: 'Developer', icon: '\u{1F468}\u200D\u{1F4BB}', description: 'Full-stack / backend / frontend engineer' },
  { id: 'data-scientist', name: 'Data Scientist', icon: '\u{1F52C}', description: 'ML, analytics, experimentation' },
  { id: 'devops', name: 'DevOps / SRE', icon: '\u{1F6E0}\uFE0F', description: 'Infrastructure, CI/CD, reliability' },
  { id: 'pm', name: 'Product Manager', icon: '\u{1F4CB}', description: 'Requirements, specs, acceptance criteria' },
  { id: 'qa', name: 'QA Engineer', icon: '\u{1F50D}', description: 'Testing strategy, quality gates' },
  { id: 'architect', name: 'Architect', icon: '\u{1F3D7}\uFE0F', description: 'System design, ADRs, tech decisions' },
];
