import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const roleIntros: Record<Role, string> = {
  developer: 'You are assisting a software developer focused on writing clean, maintainable, production-ready code.',
  'data-scientist': 'You are assisting a data scientist focused on experimentation, analysis, and ML model development.',
  devops: 'You are assisting a DevOps/SRE engineer focused on infrastructure, automation, and reliability.',
  pm: 'You are assisting a product manager focused on requirements clarity, acceptance criteria, and specs.',
  qa: 'You are assisting a QA engineer focused on test coverage, edge cases, and quality gates.',
  architect: 'You are assisting a software architect focused on system design, trade-offs, and technical decisions.',
};

function generateOpencodeMd(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — OpenCode Instructions`);
  sections.push('');

  // Role context
  sections.push(roleIntros[role]);
  sections.push('');

  const contextMap: Record<ProjectType, string> = {
    nextjs: `## Project
Next.js 15 App Router + TypeScript strict mode.
- Server Components by default; "use client" only when needed
- app/ directory routing
- Server actions for mutations`,
    'vite-react': `## Project
React + Vite + TypeScript strict mode.
- Functional components with hooks only
- Co-locate components, tests, styles`,
    python: `## Project
Python (FastAPI/Flask) with type hints.
- Pydantic for validation, PEP 8 style
- routers/, models/, services/, schemas/`,
    nodejs: `## Project
Node.js Express + TypeScript strict mode.
- routes/, controllers/, services/, middleware/
- Dependency injection for testability`,
    general: `## Project
Follow existing codebase conventions.`,
    'ml-python': `## Project
Python ML/Data Science project.
- Python 3.12+, scikit-learn, PyTorch/TensorFlow, pandas, jupyter, matplotlib
- notebooks/, src/data/, src/models/, src/features/, src/evaluation/
- Reproducibility: pin deps, set random seeds, version datasets`,
    'data-engineering': `## Project
Data Engineering project.
- Python 3.12+, Apache Airflow, PySpark, dbt, Great Expectations
- dags/, models/, tests/, macros/, seeds/
- Idempotent pipelines, schema validation, data quality checks`,
    django: `## Project
Django project with DRF and PostgreSQL.
- Python 3.12+, Django 5+, Django REST Framework
- apps/<app_name>/models.py, views.py, serializers.py, urls.py
- Always use migrations; never modify DB manually`,
    'aws-cdk': `## Project
AWS CDK v2 infrastructure project.
- TypeScript, AWS CDK v2, CloudFormation, AWS CLI
- lib/ for stacks, bin/ for app entry, test/ for assertions
- L2/L3 constructs preferred; tag all resources; least-privilege IAM`,
    'gcp-terraform': `## Project
GCP Terraform infrastructure project.
- HCL, Terraform, gcloud CLI, GCP APIs
- modules/, environments/, variables.tf, outputs.tf
- Remote state backend, lock state files`,
    'azure-infra': `## Project
Azure infrastructure project using Bicep.
- Bicep, Azure CLI, ARM templates
- modules/, main.bicep, parameters/
- Azure Well-Architected Framework principles`,
    databricks: `## Project
Databricks project.
- PySpark, Delta Lake, Unity Catalog, MLflow, Databricks CLI
- notebooks/, src/, jobs/, tests/
- Delta Lake for all tables, Unity Catalog for governance`,
    snowflake: `## Project
Snowflake project.
- SQL, Snowpark Python, dbt, SnowSQL
- models/, macros/, tests/, seeds/, snapshots/
- dbt for transformations, Snowpark for complex UDFs`,
    'react-native': `## Project
React Native + Expo project with TypeScript.
- React Navigation for routing
- src/screens/, src/components/, src/hooks/, src/navigation/
- Test on both iOS and Android`,
    'go-api': `## Project
Go API project.
- Go 1.22+, Chi/Gin, sqlx, Go modules
- cmd/, internal/handlers/, internal/services/, internal/models/
- Explicit error handling — no panic in production`,
    'rust-cli': `## Project
Rust CLI/service project.
- Rust, Cargo, clap, serde, tokio
- src/main.rs, src/lib.rs, src/commands/, src/models/
- Result<T, E> for errors — avoid unwrap() in production`,
  };

  sections.push(contextMap[projectType]);
  sections.push('');

  const isPython = projectType === 'python' || projectType === 'ml-python' || projectType === 'data-engineering' || projectType === 'django' || projectType === 'databricks';
  const isGo = projectType === 'go-api';
  const isRust = projectType === 'rust-cli';
  const isTerraform = projectType === 'gcp-terraform';
  const isBicep = projectType === 'azure-infra';
  const isSnowflake = projectType === 'snowflake';

  const typeRule = isPython ? 'Type hints everywhere'
    : isGo ? 'Explicit types — no empty interface{}'
    : isRust ? 'Explicit types — avoid unwrap() in production'
    : isTerraform ? 'Proper variable types and validation'
    : isBicep ? 'Explicit parameter types'
    : isSnowflake ? 'Explicit column types in SQL'
    : 'No `any` — proper TypeScript types';

  sections.push(`## Standards
- Descriptive names, no abbreviations
- Functions under 40 lines
- Early returns over deep nesting
- Explicit error handling
- ${typeRule}
`);

  if (features.includes('testing')) sections.push(`## Testing
- TDD: red-green-refactor
- Test naming: should [expected] when [condition]
- Arrange-Act-Assert
- Mock at boundaries, not deep inside
`);

  if (features.includes('api')) sections.push(`## API
- REST: GET/POST/PUT/PATCH/DELETE
- Correct status codes, validate inputs
- Error shape: { error: { code, message } }
`);

  if (features.includes('git-workflow')) sections.push(`## Git
- Conventional commits: feat:, fix:, docs:, refactor:, test:
- Atomic commits, feature branches
- Never commit secrets or .env
`);

  if (features.includes('auth')) sections.push(`## Authentication
- Server-side session validation on protected routes
- HTTP-only cookies for tokens
- Rate limit auth endpoints
- Never expose credentials in responses
`);

  if (features.includes('database')) sections.push(`## Database
- Use ORM — avoid raw SQL unless optimizing
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

  if (features.includes('mlops')) sections.push(`## MLOps
- Track experiments with parameters, metrics, artifacts
- Version datasets and models — never overwrite
- Reproducible pipelines with pinned deps and random seeds
- Automate model validation before promotion
- Model registry with stage transitions
`);

  if (features.includes('data-pipeline')) sections.push(`## Data Pipelines
- Idempotent pipelines — safe to re-run
- Data quality validation at boundaries
- Schema enforcement and evolution
- End-to-end data lineage
- Partition by date or logical key
`);

  if (features.includes('monitoring')) sections.push(`## Monitoring
- Structured logs (JSON) with correlation IDs
- Track latency, error rate, throughput
- Alerts for SLO violations
- Distributed tracing for multi-service
`);

  if (features.includes('security')) sections.push(`## Security
- OWASP Top 10 mitigations
- No hardcoded secrets — secrets manager or env vars
- Validate and sanitize all inputs
- Least-privilege IAM
- Audit logging for sensitive ops
`);

  if (features.includes('ci-cd')) sections.push(`## CI/CD
- Lint, type check, test on every PR
- Branch protection on main
- Auto deploy: staging on merge, prod on release
- Cache deps for speed; fail fast
`);

  if (features.includes('containerization')) sections.push(`## Containerization
- Multi-stage Docker builds
- Pin base image versions — no \`latest\`
- Non-root user
- .dockerignore for exclusions
- Resource limits in orchestration
`);

  if (features.includes('documentation')) sections.push(`## Documentation
- ADRs for significant decisions
- API docs synced with implementation
- Runbooks for operations
- README: productive in < 30 min
`);

  return sections.join('\n');
}

export function generateOpenCodeFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return [
    {
      path: 'opencode.md',
      content: generateOpencodeMd(projectName, projectType, features, role),
    },
  ];
}
