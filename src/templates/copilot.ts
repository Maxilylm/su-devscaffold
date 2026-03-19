import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const roleIntros: Record<Role, string> = {
  developer: 'You are assisting a software developer focused on writing clean, maintainable, production-ready code.',
  'data-scientist': 'You are assisting a data scientist focused on experimentation, analysis, and ML model development.',
  devops: 'You are assisting a DevOps/SRE engineer focused on infrastructure, automation, and reliability.',
  pm: 'You are assisting a product manager focused on requirements clarity, acceptance criteria, and specs.',
  qa: 'You are assisting a QA engineer focused on test coverage, edge cases, and quality gates.',
  architect: 'You are assisting a software architect focused on system design, trade-offs, and technical decisions.',
};

function generateCopilotInstructions(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — GitHub Copilot Instructions`);
  sections.push('');

  // Role context
  sections.push(roleIntros[role]);
  sections.push('');

  // Project context
  const contextMap: Record<ProjectType, string> = {
    nextjs: `## Project
This is a Next.js 15 App Router project with TypeScript strict mode.
- Use Server Components by default — only add "use client" when needed
- Use the app/ directory for routing
- Prefer server actions over API routes for mutations`,
    'vite-react': `## Project
This is a React + Vite project with TypeScript strict mode.
- Functional components with hooks only — no class components
- Co-locate components, tests, and styles together`,
    python: `## Project
This is a Python project (FastAPI/Flask) with type hints everywhere.
- Use Pydantic for validation
- Follow PEP 8
- Structure: routers/, models/, services/, schemas/`,
    nodejs: `## Project
This is a Node.js Express API with TypeScript strict mode.
- Structure: routes/, controllers/, services/, middleware/
- Use dependency injection for testability`,
    general: `## Project
Follow the conventions and patterns already established in this codebase.`,
    'ml-python': `## Project
This is a Python ML/Data Science project.
- Python 3.12+, scikit-learn, PyTorch/TensorFlow, pandas, jupyter, matplotlib
- Structure: notebooks/, src/data/, src/models/, src/features/, src/evaluation/
- Reproducibility: pin dependencies, set random seeds, version datasets`,
    'data-engineering': `## Project
This is a Data Engineering project.
- Python 3.12+, Apache Airflow, PySpark, dbt, Great Expectations
- Structure: dags/, models/, tests/, macros/, seeds/
- Idempotent pipelines, schema validation, data quality checks`,
    django: `## Project
This is a Django project with Django REST Framework and PostgreSQL.
- Python 3.12+, Django 5+, Django REST Framework
- Structure: apps/<app_name>/models.py, views.py, serializers.py, urls.py
- Always use migrations; never modify the database manually`,
    'aws-cdk': `## Project
This is an AWS CDK v2 infrastructure project with TypeScript.
- Use L2/L3 constructs over L1 (Cfn*) when available
- Structure: lib/ for stacks, bin/ for app entry
- Tag all resources, follow least-privilege IAM`,
    'gcp-terraform': `## Project
This is a GCP Terraform infrastructure project.
- HCL, Terraform, gcloud CLI, GCP APIs
- Structure: modules/, environments/, variables.tf, outputs.tf
- Use remote state backend, lock state files`,
    'azure-infra': `## Project
This is an Azure infrastructure project using Bicep.
- Bicep, Azure CLI, ARM templates
- Structure: modules/, main.bicep, parameters/
- Follow Azure Well-Architected Framework principles`,
    databricks: `## Project
This is a Databricks project.
- PySpark, Delta Lake, Unity Catalog, MLflow, Databricks CLI
- Structure: notebooks/, src/, jobs/, tests/
- Use Delta Lake for all tables, Unity Catalog for governance`,
    snowflake: `## Project
This is a Snowflake project.
- SQL, Snowpark Python, dbt, SnowSQL
- Structure: models/, macros/, tests/, seeds/, snapshots/
- Use dbt for transformations, Snowpark for complex UDFs`,
    'react-native': `## Project
This is a React Native + Expo project with TypeScript.
- React Navigation for routing
- Structure: src/screens/, src/components/, src/hooks/, src/navigation/
- Test on both iOS and Android`,
    'go-api': `## Project
This is a Go API project.
- Go 1.22+, Chi/Gin, sqlx, Go modules
- Structure: cmd/, internal/handlers/, internal/services/, internal/models/
- Handle errors explicitly — no panic in production code`,
    'rust-cli': `## Project
This is a Rust CLI/service project.
- Rust, Cargo, clap, serde, tokio
- Structure: src/main.rs, src/lib.rs, src/commands/, src/models/
- Use Result<T, E> — avoid unwrap() in production`,
  };

  sections.push(contextMap[projectType]);
  sections.push('');

  // Style rules
  sections.push(`## Code Style
- Use descriptive variable names — avoid abbreviations
- Keep functions under 40 lines; extract helpers when longer
- Use early returns to reduce nesting
- Handle all error cases explicitly
- ${projectType === 'python' || projectType === 'ml-python' || projectType === 'data-engineering' || projectType === 'django' || projectType === 'databricks' ? 'Type hints on all function signatures' : projectType === 'go-api' ? 'Use explicit types — no empty interface{}' : projectType === 'rust-cli' ? 'Use explicit types — avoid unwrap() in production' : projectType === 'gcp-terraform' ? 'Use proper variable types and validation' : projectType === 'azure-infra' ? 'Use explicit parameter types and decorators' : projectType === 'snowflake' ? 'Use explicit column types in SQL' : 'No `any` types — use proper TypeScript types'}
- Prefer composition over inheritance
- Add JSDoc/docstrings for public APIs`);
  sections.push('');

  // Feature rules
  const featureRules: string[] = [];

  if (features.includes('auth'))
    featureRules.push(`## Authentication
- Validate sessions server-side on every protected route
- Use HTTP-only cookies, never localStorage for tokens
- Rate limit auth endpoints
- Never expose sensitive data in responses`);

  if (features.includes('database'))
    featureRules.push(`## Database
- Use ORM; avoid raw SQL unless optimizing
- Always use migrations for schema changes
- Add indexes for query performance
- Use transactions for multi-step operations`);

  if (features.includes('api'))
    featureRules.push(`## API
- REST conventions: GET/POST/PUT/PATCH/DELETE
- Correct HTTP status codes always
- Validate all inputs at the boundary
- Consistent error shape: \`{ error: { code, message } }\``);

  if (features.includes('testing'))
    featureRules.push(`## Testing
- TDD: write test first, implement, refactor
- Test naming: \`should [expected] when [condition]\`
- Arrange-Act-Assert pattern
- Mock external services at boundaries`);

  if (features.includes('ai-llm'))
    featureRules.push(`## AI/LLM
- Stream all LLM responses
- Retry with exponential backoff
- Set max_tokens on every call
- Use JSON mode for structured output`);

  if (features.includes('styling'))
    featureRules.push(`## Styling
- Tailwind utility classes first
- Mobile-first responsive design
- Support dark mode
- Semantic HTML elements`);

  if (features.includes('git-workflow'))
    featureRules.push(`## Git
- Conventional commits: feat:, fix:, docs:, refactor:, test:, chore:
- Atomic commits, feature branches, no direct main commits
- Never commit secrets`);

  if (features.includes('deployment'))
    featureRules.push(`## Deployment
- Environment variables for all config — never hardcode
- Validate required env vars at startup
- Health check endpoints required`);

  if (features.includes('mlops'))
    featureRules.push(`## MLOps
- Track all experiments with parameters, metrics, and artifacts
- Version datasets and models — never overwrite in place
- Reproducible pipelines with pinned dependencies and random seeds
- Automate model validation before promotion
- Model registry with stage transitions (staging → production)`);

  if (features.includes('data-pipeline'))
    featureRules.push(`## Data Pipelines
- Idempotent pipelines — safe to re-run without side effects
- Validate data quality at ingestion and transformation boundaries
- Schema enforcement and evolution strategies
- Track data lineage end-to-end
- Partition large datasets by date or logical key`);

  if (features.includes('monitoring'))
    featureRules.push(`## Monitoring
- Structured logs (JSON) with correlation IDs
- Track latency, error rate, throughput, saturation
- Alerts for SLO violations
- Distributed tracing for multi-service architectures`);

  if (features.includes('security'))
    featureRules.push(`## Security
- OWASP Top 10 mitigations
- Never hardcode secrets — use secrets manager or env vars
- Validate and sanitize all user inputs
- Least-privilege IAM
- Audit logging for sensitive operations`);

  if (features.includes('ci-cd'))
    featureRules.push(`## CI/CD
- Lint, type check, and test on every PR
- Branch protection on main
- Automated deployments: staging on merge, production on release
- Cache dependencies for faster pipelines`);

  if (features.includes('containerization'))
    featureRules.push(`## Containerization
- Multi-stage Docker builds for minimal images
- Pin base image versions — never use \`latest\`
- Run as non-root user
- .dockerignore for unnecessary files
- Resource limits in orchestration configs`);

  if (features.includes('documentation'))
    featureRules.push(`## Documentation
- ADRs for significant technical decisions
- API docs in sync with implementation (OpenAPI/Swagger)
- Runbooks for operational procedures
- README: new dev productive in < 30 minutes`);

  sections.push(featureRules.join('\n\n'));

  return sections.join('\n');
}

export function generateCopilotFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return [
    {
      path: '.github/copilot-instructions.md',
      content: generateCopilotInstructions(projectName, projectType, features, role),
    },
  ];
}
