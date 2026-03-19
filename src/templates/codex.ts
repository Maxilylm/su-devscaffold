import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const roleIntros: Record<Role, string> = {
  developer: 'You are assisting a software developer focused on writing clean, maintainable, production-ready code.',
  'data-scientist': 'You are assisting a data scientist focused on experimentation, analysis, and ML model development.',
  devops: 'You are assisting a DevOps/SRE engineer focused on infrastructure, automation, and reliability.',
  pm: 'You are assisting a product manager focused on requirements clarity, acceptance criteria, and specs.',
  qa: 'You are assisting a QA engineer focused on test coverage, edge cases, and quality gates.',
  architect: 'You are assisting a software architect focused on system design, trade-offs, and technical decisions.',
};

function generateAgentsMd(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Codex Agent Instructions`);
  sections.push('');

  // Role context
  sections.push(roleIntros[role]);
  sections.push('');

  // Project setup
  const setupMap: Record<ProjectType, string> = {
    nextjs: `## Setup
This is a Next.js 15 App Router project with TypeScript.

\`\`\`bash
npm install
npm run dev
\`\`\`

### Directory Structure
\`\`\`
app/           — Routes and layouts (App Router)
components/    — Reusable UI components
lib/           — Utility functions and shared logic
public/        — Static assets
\`\`\``,
    'vite-react': `## Setup
This is a React + Vite project with TypeScript.

\`\`\`bash
npm install
npm run dev
\`\`\`

### Directory Structure
\`\`\`
src/
  components/  — Reusable UI components
  hooks/       — Custom React hooks
  utils/       — Utility functions
  pages/       — Page-level components
public/        — Static assets
\`\`\``,
    python: `## Setup
This is a Python project using FastAPI/Flask.

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

### Directory Structure
\`\`\`
routers/       — API route handlers
models/        — Database models
schemas/       — Pydantic schemas
services/      — Business logic
\`\`\``,
    nodejs: `## Setup
This is a Node.js Express API with TypeScript.

\`\`\`bash
npm install
npm run dev
\`\`\`

### Directory Structure
\`\`\`
src/
  routes/       — Express route definitions
  controllers/  — Request handlers
  services/     — Business logic
  middleware/   — Express middleware
  models/       — Data models
\`\`\``,
    general: `## Setup
\`\`\`bash
npm install
npm run dev
\`\`\``,
    'ml-python': `## Setup
This is a Python ML/Data Science project using scikit-learn, PyTorch/TensorFlow, pandas.

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
jupyter lab
\`\`\`

### Directory Structure
\`\`\`
notebooks/     — Jupyter notebooks for exploration
src/
  data/        — Data loading and preprocessing
  features/    — Feature engineering
  models/      — Model training and inference
  evaluation/  — Metrics and evaluation
data/
  raw/         — Original immutable data
  processed/   — Cleaned and transformed data
\`\`\``,
    'data-engineering': `## Setup
This is a Data Engineering project using Airflow, PySpark, dbt, and Great Expectations.

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

### Directory Structure
\`\`\`
dags/          — Airflow DAG definitions
models/        — dbt models (staging, marts)
tests/         — Data quality tests
macros/        — dbt macros
seeds/         — Static reference data
\`\`\``,
    django: `## Setup
This is a Django project with Django REST Framework and PostgreSQL.

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

### Directory Structure
\`\`\`
config/        — Project settings and root URL config
apps/
  <app_name>/
    models.py      — Database models
    views.py       — View logic
    serializers.py — DRF serializers
    urls.py        — URL patterns
    tests.py       — Tests
\`\`\``,
    'aws-cdk': `## Setup
This is an AWS CDK v2 infrastructure project with TypeScript.

\`\`\`bash
npm install
npx cdk synth
npx cdk deploy
\`\`\`

### Directory Structure
\`\`\`
bin/           — CDK app entry point
lib/           — Stack definitions
test/          — Infrastructure tests
cdk.json       — CDK configuration
\`\`\``,
    'gcp-terraform': `## Setup
This is a GCP Terraform infrastructure project.

\`\`\`bash
terraform init
terraform plan
terraform apply
\`\`\`

### Directory Structure
\`\`\`
modules/       — Reusable Terraform modules
environments/  — Per-environment configs (dev, staging, prod)
variables.tf   — Input variables
outputs.tf     — Output values
main.tf        — Root module
\`\`\``,
    'azure-infra': `## Setup
This is an Azure infrastructure project using Bicep.

\`\`\`bash
az login
az deployment group create --template-file main.bicep --parameters @parameters/dev.json
\`\`\`

### Directory Structure
\`\`\`
modules/       — Reusable Bicep modules
parameters/    — Parameter files per environment
main.bicep     — Root deployment template
\`\`\``,
    databricks: `## Setup
This is a Databricks project using PySpark, Delta Lake, and MLflow.

\`\`\`bash
pip install databricks-cli
databricks configure --token
\`\`\`

### Directory Structure
\`\`\`
notebooks/     — Databricks notebooks
src/           — Python modules for jobs
jobs/          — Job definitions and workflows
tests/         — Unit and integration tests
\`\`\``,
    snowflake: `## Setup
This is a Snowflake project using SQL, Snowpark Python, and dbt.

\`\`\`bash
pip install dbt-snowflake snowflake-snowpark-python
dbt deps
dbt run
\`\`\`

### Directory Structure
\`\`\`
models/
  staging/     — Source-aligned models
  marts/       — Business-logic models
macros/        — Reusable SQL macros
tests/         — Data quality tests
seeds/         — Static reference data
snapshots/     — SCD Type 2 snapshots
\`\`\``,
    'react-native': `## Setup
This is a React Native + Expo project with TypeScript.

\`\`\`bash
npm install
npx expo start
\`\`\`

### Directory Structure
\`\`\`
src/
  screens/      — Screen-level components
  components/   — Reusable UI components
  hooks/        — Custom React hooks
  navigation/   — React Navigation setup
  utils/        — Utility functions
  services/     — API and external service clients
\`\`\``,
    'go-api': `## Setup
This is a Go API project using Chi/Gin and sqlx.

\`\`\`bash
go mod download
go run cmd/server/main.go
\`\`\`

### Directory Structure
\`\`\`
cmd/
  server/       — Application entry point
internal/
  handlers/     — HTTP handlers
  services/     — Business logic
  models/       — Data models
  middleware/   — HTTP middleware
  repository/   — Database access layer
\`\`\``,
    'rust-cli': `## Setup
This is a Rust CLI/service project using clap, serde, and tokio.

\`\`\`bash
cargo build
cargo run -- --help
cargo test
\`\`\`

### Directory Structure
\`\`\`
src/
  main.rs       — Entry point and CLI arg parsing
  lib.rs        — Library root
  commands/     — Subcommand implementations
  models/       — Data structures
  utils/        — Helper functions
\`\`\``,
  };

  sections.push(setupMap[projectType]);
  sections.push('');

  // Coding standards
  sections.push(`## Coding Standards

### General
- Write clean, readable code with descriptive names
- Keep functions short (< 40 lines) and focused on one task
- Use early returns to reduce nesting depth
- Handle all error cases explicitly — never swallow errors silently
- Add comments only for non-obvious "why" — not "what"
`);

  if (projectType !== 'python' && projectType !== 'ml-python' && projectType !== 'data-engineering' && projectType !== 'django' && projectType !== 'databricks' && projectType !== 'snowflake') {
    if (projectType === 'go-api') {
      sections.push(`### Go
- Use explicit types — avoid empty interface{} unless truly needed
- Handle all errors — never discard with \`_\`
- Follow Go naming conventions: exported = PascalCase, unexported = camelCase
- Use table-driven tests
- Prefer standard library over third-party packages
`);
    } else if (projectType === 'rust-cli') {
      sections.push(`### Rust
- Use Result<T, E> and Option<T> — avoid unwrap()/expect() in production
- Prefer owned types over lifetimes unless performance-critical
- Use clippy for linting: \`cargo clippy -- -D warnings\`
- Implement Display and Error traits for custom error types
- Use serde derive macros for serialization
`);
    } else if (projectType === 'gcp-terraform') {
      sections.push(`### Terraform/HCL
- Use variables with proper type constraints and descriptions
- Use locals for computed values
- Use data sources over hardcoded IDs
- Name resources descriptively: \`google_compute_instance.web_server\`
- Use modules for reusable infrastructure components
`);
    } else if (projectType === 'azure-infra') {
      sections.push(`### Bicep
- Use parameter decorators (@description, @minLength, @allowed)
- Use modules for reusable components
- Use existing keyword to reference pre-existing resources
- Name resources descriptively with consistent naming convention
`);
    } else {
      sections.push(`### TypeScript
- Use strict mode — no \`any\` types
- Prefer \`const\` over \`let\`; never use \`var\`
- Define explicit return types for public functions
- Use interface for object shapes, type for unions/intersections
- Prefer named exports over default exports
`);
    }
  } else {
    sections.push(`### Python
- Use type hints on all function signatures and return types
- Follow PEP 8 style conventions
- Use Pydantic for data validation
- Use dataclasses for plain data containers
- Prefer f-strings over .format() or % formatting
`);
  }

  // Feature-specific sections
  if (features.includes('testing')) {
    sections.push(`### Testing
- Follow TDD: write a failing test, make it pass, then refactor
- Test file naming: \`*.test.ts\` or \`test_*.py\` co-located with source
- Test naming: \`should [expected] when [condition]\`
- Use Arrange-Act-Assert pattern
- Mock external dependencies at the boundary
- Every bug fix must include a regression test
`);
  }

  if (features.includes('api')) {
    sections.push(`### API Design
- RESTful conventions: GET/POST/PUT/PATCH/DELETE
- Consistent error format: \`{ error: { code, message } }\`
- Validate inputs at the API boundary
- Return correct HTTP status codes
- Paginate list endpoints
`);
  }

  if (features.includes('git-workflow')) {
    sections.push(`### Git
- Conventional commits: \`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`, \`test:\`
- Atomic commits — one logical change each
- Never commit secrets or .env files
`);
  }

  if (features.includes('auth')) {
    sections.push(`### Authentication
- Validate sessions server-side on protected routes
- Use HTTP-only cookies for session management
- Rate limit authentication endpoints
- Never expose credentials in API responses
`);
  }

  if (features.includes('database')) {
    sections.push(`### Database
- Use ORM — avoid raw SQL unless optimizing specific queries
- Always use migrations for schema changes
- Add indexes for frequently queried columns
- Use transactions for multi-step operations
`);
  }

  if (features.includes('ai-llm')) {
    sections.push(`### AI/LLM
- Stream all LLM responses to the UI
- Retry with exponential backoff (max 3 retries)
- Always set max_tokens to prevent runaway costs
- Use JSON mode for structured output
`);
  }

  if (features.includes('styling')) {
    sections.push(`### Styling
- Tailwind utility classes first — minimize custom CSS
- Mobile-first responsive design
- Support dark mode
- Semantic HTML elements
`);
  }

  if (features.includes('deployment')) {
    sections.push(`### Deployment
- Environment variables for all config — never hardcode
- Validate required env vars at startup
- Include health check endpoints
`);
  }

  if (features.includes('mlops')) {
    sections.push(`### MLOps
- Track all experiments with parameters, metrics, and artifacts
- Version datasets and models — never overwrite in place
- Use reproducible pipelines with pinned dependencies and random seeds
- Automate model validation before promotion (accuracy thresholds, drift checks)
- Store models in a registry with stage transitions (staging → production)
`);
  }

  if (features.includes('data-pipeline')) {
    sections.push(`### Data Pipelines
- Make all pipelines idempotent — safe to re-run without side effects
- Validate data quality at ingestion and transformation boundaries
- Use schema enforcement and evolution strategies
- Track data lineage end-to-end
- Partition large datasets by date or logical key
`);
  }

  if (features.includes('monitoring')) {
    sections.push(`### Monitoring
- Emit structured logs (JSON) with correlation IDs
- Track key metrics: latency, error rate, throughput, saturation
- Set up alerts for SLO violations
- Use distributed tracing for multi-service architectures
`);
  }

  if (features.includes('security')) {
    sections.push(`### Security
- Follow OWASP Top 10 mitigations
- Never hardcode secrets — use a secrets manager or env vars
- Validate and sanitize all user inputs
- Apply least-privilege IAM
- Enable audit logging for sensitive operations
`);
  }

  if (features.includes('ci-cd')) {
    sections.push(`### CI/CD
- Run lint, type check, and tests on every PR
- Use branch protection on main
- Automate deployments: staging on merge, production on release
- Cache dependencies for faster pipelines
- Fail fast — run cheapest checks first
`);
  }

  if (features.includes('containerization')) {
    sections.push(`### Containerization
- Multi-stage Docker builds for minimal images
- Pin base image versions — never use \`latest\` in production
- Run as non-root user
- Use .dockerignore to exclude unnecessary files
- Define resource limits in orchestration configs
`);
  }

  if (features.includes('documentation')) {
    sections.push(`### Documentation
- Write ADRs for significant technical decisions
- Keep API docs in sync with implementation (OpenAPI/Swagger)
- Include runbooks for operational procedures
- README should get new devs productive in < 30 minutes
`);
  }

  return sections.join('\n');
}

export function generateCodexFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return [
    {
      path: 'AGENTS.md',
      content: generateAgentsMd(projectName, projectType, features, role),
    },
  ];
}
