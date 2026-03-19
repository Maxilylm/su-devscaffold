import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const roleIntros: Record<Role, string> = {
  developer: 'You are assisting a software developer focused on writing clean, maintainable, production-ready code.',
  'data-scientist': 'You are assisting a data scientist focused on experimentation, analysis, and ML model development.',
  devops: 'You are assisting a DevOps/SRE engineer focused on infrastructure, automation, and reliability.',
  pm: 'You are assisting a product manager focused on requirements clarity, acceptance criteria, and specs.',
  qa: 'You are assisting a QA engineer focused on test coverage, edge cases, and quality gates.',
  architect: 'You are assisting a software architect focused on system design, trade-offs, and technical decisions.',
};

function generateGeminiMd(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Gemini CLI Instructions`);
  sections.push('');

  // Role context
  sections.push(roleIntros[role]);
  sections.push('');

  const contextMap: Record<ProjectType, string> = {
    nextjs: `## Project Context
This is a Next.js 15 App Router project with TypeScript.
- Default to Server Components; use "use client" only when needed
- Use the app/ directory structure
- Prefer server actions for data mutations`,
    'vite-react': `## Project Context
This is a React + Vite project with TypeScript.
- Functional components with hooks — no class components
- Keep components small and single-purpose`,
    python: `## Project Context
This is a Python project (FastAPI/Flask).
- Type hints on all functions
- Pydantic models for validation
- PEP 8 style`,
    nodejs: `## Project Context
This is a Node.js Express API with TypeScript.
- routes/, controllers/, services/, middleware/ structure
- Dependency injection for testability`,
    general: `## Project Context
Follow existing patterns and conventions in the codebase.`,
    'ml-python': `## Project Context
This is a Python ML/Data Science project.
- Python 3.12+, scikit-learn, PyTorch/TensorFlow, pandas, jupyter, matplotlib
- Structure: notebooks/, src/data/, src/models/, src/features/, src/evaluation/
- Reproducibility: pin dependencies, set random seeds, version datasets`,
    'data-engineering': `## Project Context
This is a Data Engineering project.
- Python 3.12+, Apache Airflow, PySpark, dbt, Great Expectations
- Structure: dags/, models/, tests/, macros/, seeds/
- Idempotent pipelines, schema validation, data quality checks`,
    django: `## Project Context
This is a Django project with Django REST Framework and PostgreSQL.
- Python 3.12+, Django 5+, Django REST Framework
- Structure: apps/<app_name>/models.py, views.py, serializers.py, urls.py
- Always use migrations; never modify the database manually`,
    'aws-cdk': `## Project Context
This is an AWS CDK v2 infrastructure project with TypeScript.
- AWS CDK v2, CloudFormation, AWS CLI
- Structure: lib/ for stacks, bin/ for app entry, test/ for assertions
- Use L2/L3 constructs; tag all resources; least-privilege IAM`,
    'gcp-terraform': `## Project Context
This is a GCP Terraform infrastructure project.
- HCL, Terraform, gcloud CLI, GCP APIs
- Structure: modules/, environments/, variables.tf, outputs.tf
- Remote state backend, lock state files`,
    'azure-infra': `## Project Context
This is an Azure infrastructure project using Bicep.
- Bicep, Azure CLI, ARM templates
- Structure: modules/, main.bicep, parameters/
- Azure Well-Architected Framework principles`,
    databricks: `## Project Context
This is a Databricks project.
- PySpark, Delta Lake, Unity Catalog, MLflow, Databricks CLI
- Structure: notebooks/, src/, jobs/, tests/
- Delta Lake for all tables, Unity Catalog for governance`,
    snowflake: `## Project Context
This is a Snowflake project.
- SQL, Snowpark Python, dbt, SnowSQL
- Structure: models/, macros/, tests/, seeds/, snapshots/
- dbt for transformations, Snowpark for complex UDFs`,
    'react-native': `## Project Context
This is a React Native + Expo project with TypeScript.
- React Navigation for routing
- Structure: src/screens/, src/components/, src/hooks/, src/navigation/
- Test on both iOS and Android`,
    'go-api': `## Project Context
This is a Go API project.
- Go 1.22+, Chi/Gin, sqlx, Go modules
- Structure: cmd/, internal/handlers/, internal/services/, internal/models/
- Explicit error handling — no panic in production code`,
    'rust-cli': `## Project Context
This is a Rust CLI/service project.
- Rust, Cargo, clap, serde, tokio
- Structure: src/main.rs, src/lib.rs, src/commands/, src/models/
- Result<T, E> for errors — avoid unwrap() in production`,
  };

  sections.push(contextMap[projectType]);
  sections.push('');

  sections.push(`## Coding Standards
- Write clean, well-typed code — no \`any\` types in TypeScript, full type hints in Python
- Keep functions under 40 lines — extract helpers when needed
- Use early returns to reduce nesting
- Handle all errors explicitly
- Use descriptive names — avoid abbreviations
- Add comments for "why", not "what"
`);

  if (features.includes('testing')) sections.push(`## Testing
- TDD approach: write failing test first, then implement
- Test naming: \`should [expected] when [condition]\`
- Arrange-Act-Assert pattern
- Mock external services at the boundary
- Every bug fix needs a regression test
`);

  if (features.includes('api')) sections.push(`## API Design
- RESTful: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Correct HTTP status codes
- Validate inputs at the API boundary
- Consistent error format: \`{ error: { code, message } }\`
- Paginate list endpoints
`);

  if (features.includes('auth')) sections.push(`## Authentication
- Server-side session validation on protected routes
- HTTP-only cookies for tokens
- Rate limit auth endpoints
- Never expose credentials in responses
`);

  if (features.includes('database')) sections.push(`## Database
- Use ORM — avoid raw SQL unless necessary
- Migrations for all schema changes
- Indexes for queried columns
- Transactions for multi-step operations
`);

  if (features.includes('ai-llm')) sections.push(`## AI/LLM
- Stream all LLM responses
- Retry with exponential backoff
- Set max_tokens on every call
- JSON mode for structured output
`);

  if (features.includes('styling')) sections.push(`## Styling
- Tailwind utility-first
- Mobile-first responsive
- Dark mode support
- Semantic HTML
`);

  if (features.includes('deployment')) sections.push(`## Deployment
- Env vars for all config — never hardcode
- Validate required env vars at startup
- Health check endpoints
`);

  if (features.includes('git-workflow')) sections.push(`## Git
- Conventional commits: feat:, fix:, docs:, refactor:, test:, chore:
- Feature branches, atomic commits
- Never commit .env or secrets
`);

  if (features.includes('mlops')) sections.push(`## MLOps
- Track all experiments with parameters, metrics, and artifacts
- Version datasets and models — never overwrite in place
- Reproducible pipelines with pinned dependencies and random seeds
- Automate model validation before promotion
- Model registry with stage transitions (staging → production)
`);

  if (features.includes('data-pipeline')) sections.push(`## Data Pipelines
- Idempotent pipelines — safe to re-run without side effects
- Data quality validation at ingestion and transformation boundaries
- Schema enforcement and evolution strategies
- End-to-end data lineage tracking
- Partition large datasets by date or logical key
`);

  if (features.includes('monitoring')) sections.push(`## Monitoring
- Structured logs (JSON) with correlation IDs
- Track latency, error rate, throughput, saturation
- Alerts for SLO violations
- Distributed tracing for multi-service architectures
`);

  if (features.includes('security')) sections.push(`## Security
- OWASP Top 10 mitigations
- Never hardcode secrets — use secrets manager or env vars
- Validate and sanitize all user inputs
- Least-privilege IAM
- Audit logging for sensitive operations
`);

  if (features.includes('ci-cd')) sections.push(`## CI/CD
- Lint, type check, and test on every PR
- Branch protection on main
- Automated deployments: staging on merge, production on release
- Cache dependencies for faster pipelines
`);

  if (features.includes('containerization')) sections.push(`## Containerization
- Multi-stage Docker builds for minimal images
- Pin base image versions — never use \`latest\`
- Run as non-root user
- .dockerignore for unnecessary files
- Resource limits in orchestration configs
`);

  if (features.includes('documentation')) sections.push(`## Documentation
- ADRs for significant technical decisions
- API docs in sync with implementation (OpenAPI/Swagger)
- Runbooks for operational procedures
- README: new dev productive in < 30 minutes
`);

  return sections.join('\n');
}

export function generateGeminiFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return [
    {
      path: 'GEMINI.md',
      content: generateGeminiMd(projectName, projectType, features, role),
    },
  ];
}
