import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const techStackBlock: Record<ProjectType, string> = {
  nextjs: `## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js 20+
- **Package Manager:** npm`,
  'vite-react': `## Tech Stack
- **Framework:** React 19 + Vite
- **Language:** TypeScript (strict mode)
- **Runtime:** Browser + Node.js 20+ (dev)
- **Package Manager:** npm`,
  python: `## Tech Stack
- **Framework:** FastAPI / Flask
- **Language:** Python 3.12+
- **Package Manager:** pip + venv
- **Linting:** ruff, mypy`,
  nodejs: `## Tech Stack
- **Framework:** Express.js
- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js 20+
- **Package Manager:** npm`,
  general: `## Tech Stack
- Document your tech stack here`,
  'ml-python': `## Tech Stack
- **Language:** Python 3.11+
- **ML Frameworks:** scikit-learn, PyTorch, pandas, numpy
- **Experiment Tracking:** MLflow / Weights & Biases
- **Notebooks:** Jupyter / JupyterLab
- **Package Manager:** pip + venv (or conda)
- **Linting:** ruff, mypy`,
  'data-engineering': `## Tech Stack
- **Language:** Python 3.11+, SQL
- **Orchestration:** Apache Airflow
- **Processing:** Apache Spark (PySpark)
- **Transformation:** dbt
- **Package Manager:** pip + venv
- **Linting:** ruff, sqlfluff`,
  django: `## Tech Stack
- **Framework:** Django 5+ (with Django REST Framework)
- **Language:** Python 3.12+
- **ORM:** Django ORM
- **Package Manager:** pip + venv
- **Linting:** ruff, mypy`,
  'aws-cdk': `## Tech Stack
- **IaC Framework:** AWS CDK v2 (TypeScript)
- **Language:** TypeScript (strict mode)
- **Cloud:** AWS (CloudFormation under the hood)
- **Runtime:** Node.js 20+
- **Package Manager:** npm`,
  'gcp-terraform': `## Tech Stack
- **IaC Framework:** Terraform
- **Language:** HCL (HashiCorp Configuration Language)
- **Cloud:** Google Cloud Platform
- **CLI:** gcloud, terraform
- **State:** Remote state in GCS bucket`,
  'azure-infra': `## Tech Stack
- **IaC Framework:** Azure Bicep
- **Language:** Bicep templates
- **Cloud:** Microsoft Azure
- **CLI:** Azure CLI (az)
- **Deployment:** Azure Resource Manager (ARM)`,
  databricks: `## Tech Stack
- **Platform:** Databricks
- **Language:** Python (PySpark), SQL
- **Storage:** Delta Lake
- **Governance:** Unity Catalog
- **Notebooks:** Databricks Notebooks
- **Package Manager:** pip`,
  snowflake: `## Tech Stack
- **Platform:** Snowflake
- **Languages:** SQL, Python (Snowpark)
- **Transformation:** dbt
- **CLI:** SnowSQL
- **Linting:** sqlfluff`,
  'react-native': `## Tech Stack
- **Framework:** React Native (Expo)
- **Language:** TypeScript (strict mode)
- **Runtime:** iOS + Android
- **Package Manager:** npm
- **Navigation:** React Navigation`,
  'go-api': `## Tech Stack
- **Language:** Go 1.22+
- **Router:** Chi / Gin
- **Modules:** Go modules
- **Linting:** golangci-lint
- **Testing:** Go standard testing + testify`,
  'rust-cli': `## Tech Stack
- **Language:** Rust (latest stable)
- **Build:** Cargo
- **CLI Framework:** clap
- **Linting:** clippy
- **Formatting:** rustfmt`,
};

const commandsBlock: Record<ProjectType, string> = {
  nextjs: `## Commands
- \`npm run dev\` — Start dev server on localhost:3000
- \`npm run build\` — Production build
- \`npm run start\` — Run production server
- \`npm run lint\` — Run ESLint
- \`npm run test\` — Run test suite`,
  'vite-react': `## Commands
- \`npm run dev\` — Start Vite dev server with HMR
- \`npm run build\` — TypeScript check + production build
- \`npm run preview\` — Preview production build locally
- \`npm run lint\` — Run ESLint
- \`npm run test\` — Run test suite`,
  python: `## Commands
- \`python -m venv venv && source venv/bin/activate\` — Create virtual environment
- \`pip install -r requirements.txt\` — Install dependencies
- \`uvicorn main:app --reload\` — Start dev server
- \`pytest\` — Run tests
- \`ruff check .\` — Lint code`,
  nodejs: `## Commands
- \`npm run dev\` — Start dev server with nodemon
- \`npm run build\` — Compile TypeScript
- \`npm run start\` — Run production server
- \`npm run test\` — Run test suite
- \`npm run lint\` — Run ESLint`,
  general: `## Commands
- \`npm run dev\` — Start development
- \`npm run build\` — Build for production
- \`npm run test\` — Run tests`,
  'ml-python': `## Commands
- \`python -m venv venv && source venv/bin/activate\` — Create virtual environment
- \`pip install -r requirements.txt\` — Install dependencies
- \`jupyter lab\` — Launch Jupyter notebooks
- \`python train.py\` — Run training pipeline
- \`pytest\` — Run tests
- \`ruff check .\` — Lint code
- \`mlflow ui\` — Launch MLflow tracking UI`,
  'data-engineering': `## Commands
- \`python -m venv venv && source venv/bin/activate\` — Create virtual environment
- \`pip install -r requirements.txt\` — Install dependencies
- \`airflow db init && airflow webserver\` — Start Airflow
- \`dbt run\` — Run dbt transformations
- \`dbt test\` — Run dbt tests
- \`pytest\` — Run Python tests
- \`ruff check .\` — Lint code`,
  django: `## Commands
- \`python -m venv venv && source venv/bin/activate\` — Create virtual environment
- \`pip install -r requirements.txt\` — Install dependencies
- \`python manage.py runserver\` — Start dev server on localhost:8000
- \`python manage.py migrate\` — Run database migrations
- \`python manage.py test\` — Run test suite
- \`ruff check .\` — Lint code`,
  'aws-cdk': `## Commands
- \`npm install\` — Install dependencies
- \`npx cdk synth\` — Synthesize CloudFormation template
- \`npx cdk deploy\` — Deploy stack to AWS
- \`npx cdk diff\` — Compare deployed vs local
- \`npx cdk destroy\` — Tear down stack
- \`npm run test\` — Run tests
- \`npm run lint\` — Run ESLint`,
  'gcp-terraform': `## Commands
- \`terraform init\` — Initialize Terraform and download providers
- \`terraform plan\` — Preview infrastructure changes
- \`terraform apply\` — Apply infrastructure changes
- \`terraform destroy\` — Tear down infrastructure
- \`terraform fmt\` — Format HCL files
- \`terraform validate\` — Validate configuration
- \`gcloud auth login\` — Authenticate with GCP`,
  'azure-infra': `## Commands
- \`az login\` — Authenticate with Azure
- \`az deployment group create --template-file main.bicep\` — Deploy Bicep template
- \`az deployment group what-if --template-file main.bicep\` — Preview changes
- \`az bicep build --file main.bicep\` — Compile Bicep to ARM JSON
- \`az bicep lint --file main.bicep\` — Lint Bicep templates`,
  databricks: `## Commands
- \`pip install -r requirements.txt\` — Install dependencies
- \`databricks workspace list\` — List workspace contents
- \`databricks jobs create --json @job.json\` — Create a job
- \`databricks jobs run-now --job-id <id>\` — Trigger a job run
- \`pytest\` — Run local tests
- \`ruff check .\` — Lint code`,
  snowflake: `## Commands
- \`dbt run\` — Run dbt models
- \`dbt test\` — Run dbt tests
- \`dbt docs generate && dbt docs serve\` — Generate and serve docs
- \`snowsql -c my_connection\` — Connect to Snowflake via CLI
- \`sqlfluff lint models/\` — Lint SQL files
- \`sqlfluff fix models/\` — Auto-fix SQL linting issues`,
  'react-native': `## Commands
- \`npx expo start\` — Start Expo dev server
- \`npx expo start --ios\` — Run on iOS simulator
- \`npx expo start --android\` — Run on Android emulator
- \`npm run lint\` — Run ESLint
- \`npm run test\` — Run test suite
- \`npx expo build\` — Build for production`,
  'go-api': `## Commands
- \`go run ./cmd/server\` — Start dev server
- \`go build ./cmd/server\` — Build binary
- \`go test ./...\` — Run all tests
- \`go vet ./...\` — Vet code for suspicious constructs
- \`golangci-lint run\` — Run linter
- \`go mod tidy\` — Clean up dependencies`,
  'rust-cli': `## Commands
- \`cargo run\` — Build and run the CLI
- \`cargo build --release\` — Build optimized binary
- \`cargo test\` — Run all tests
- \`cargo clippy\` — Run linter
- \`cargo fmt\` — Format code
- \`cargo doc --open\` — Generate and open documentation`,
};

function featureRules(features: Feature[], projectType: ProjectType): string {
  const rules: string[] = [];

  if (features.includes('auth')) {
    rules.push(`### Authentication
- Never store passwords in plain text — always hash with bcrypt (cost factor >= 12)
- Use HTTP-only, Secure, SameSite cookies for session tokens
- Validate and sanitize all auth inputs server-side
- Implement rate limiting on login/signup endpoints (max 5 attempts/minute)
- Always check authorization on every protected route, not just authentication
- Use CSRF tokens for state-changing operations in server-rendered pages
- Log authentication events (login, logout, failed attempts) for audit trails`);
  }

  if (features.includes('database')) {
    if (projectType === 'python') {
      rules.push(`### Database
- Use SQLAlchemy or Tortoise ORM — never write raw SQL unless optimizing a specific query
- Always use migrations (Alembic) — never modify schema manually in production
- Add database indexes for columns used in WHERE, ORDER BY, and JOIN clauses
- Use connection pooling in production (SQLAlchemy pool_size=5, max_overflow=10)
- Validate all inputs before database operations — never trust user data
- Use transactions for multi-step operations — rollback on any failure
- Name migrations descriptively: \`add_user_email_index\`, not \`migration_003\``);
    } else {
      rules.push(`### Database
- Use an ORM (Prisma, Drizzle, or TypeORM) — never write raw SQL unless optimizing
- Always use migrations — never modify schema manually in production
- Add database indexes for columns used in WHERE, ORDER BY, and JOIN clauses
- Use connection pooling in production
- Validate all inputs with Zod before database operations
- Use transactions for multi-step operations — rollback on any failure
- Name migrations descriptively: \`add_user_email_index\`, not \`003_migration\``);
    }
  }

  if (features.includes('api')) {
    rules.push(`### API Design
- Use consistent REST conventions: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Always return appropriate HTTP status codes: 200 (ok), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- Validate request bodies and query params at the boundary — fail fast with clear error messages
- Use a consistent error response shape: \`{ error: { code: string, message: string, details?: unknown } }\`
- Paginate list endpoints by default — use cursor-based pagination for large datasets
- Version APIs in the URL path (/api/v1/) when breaking changes are needed
- Never expose internal IDs or stack traces in production error responses`);
  }

  if (features.includes('testing')) {
    rules.push(`### Testing
- Write tests BEFORE implementation (TDD red-green-refactor cycle)
- Every bug fix must include a regression test that fails without the fix
- Test behavior, not implementation details — test what it does, not how it does it
- Use descriptive test names: \`should return 404 when user not found\`, not \`test user\`
- Maintain test independence — each test must be able to run in isolation
- Mock external services (APIs, databases) at the boundary, not deep inside the code
- Aim for meaningful coverage on critical paths — not 100% coverage on everything
- Structure tests as Arrange-Act-Assert (AAA)`);
  }

  if (features.includes('ai-llm')) {
    rules.push(`### AI / LLM Integration
- Always stream LLM responses to the UI — never make users wait for the full response
- Set temperature to 0 for deterministic tasks (extraction, classification), 0.7+ for creative tasks
- Implement retry with exponential backoff for API calls (max 3 retries)
- Always set max_tokens to prevent runaway costs — estimate based on expected output
- Validate and sanitize LLM outputs before using them in application logic
- Log prompts and responses for debugging (redact PII in production)
- Use structured output (JSON mode) when you need to parse the response programmatically
- Implement cost tracking — log token usage per request`);
  }

  if (features.includes('styling')) {
    rules.push(`### Styling
- Use Tailwind CSS utility classes — avoid custom CSS unless absolutely necessary
- Follow mobile-first responsive design — start with small screens, add breakpoints up
- Use CSS variables (via Tailwind theme) for brand colors, spacing, and typography
- Keep component styles co-located — no global stylesheet soup
- Use semantic HTML elements (nav, main, section, article) before adding ARIA attributes
- Maintain a consistent spacing scale — never use arbitrary pixel values
- Support dark mode from the start using Tailwind's \`dark:\` variant`);
  }

  if (features.includes('deployment')) {
    rules.push(`### Deployment
- Never hardcode environment-specific values — always use environment variables
- Use .env.local for development, set production vars in deployment platform
- Validate all required environment variables at startup — fail fast if missing
- Set up health check endpoints (/api/health) that verify critical dependencies
- Use preview deployments for every pull request
- Pin dependency versions in production (use lockfile)
- Configure proper CORS headers for production domains only`);
  }

  if (features.includes('git-workflow')) {
    rules.push(`### Git Workflow
- Use conventional commits: \`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`, \`test:\`, \`chore:\`
- Branch naming: \`feat/description\`, \`fix/description\`, \`chore/description\`
- Never commit directly to main — always use feature branches and pull requests
- Keep commits atomic — one logical change per commit
- Write meaningful commit messages: explain WHY, not just WHAT
- Squash WIP commits before merging to main
- Never commit secrets, .env files, or API keys — use pre-commit hooks to prevent this`);
  }

  if (features.includes('mlops')) {
    rules.push(`### MLOps
- Track every experiment with MLflow or Weights & Biases — never run untracked experiments
- Version all models in a model registry with metadata (metrics, dataset hash, git SHA)
- Pin all dependency versions and set random seeds for full reproducibility
- Use feature stores for consistent feature computation between training and serving
- Implement A/B testing framework for model rollouts — never deploy without a rollback plan
- Version datasets with DVC or similar — link dataset version to each experiment
- Store hyperparameters, metrics, and artifacts together — every run must be reproducible`);
  }

  if (features.includes('data-pipeline')) {
    rules.push(`### Data Pipelines
- Make all transforms idempotent — re-running a pipeline must produce the same result
- Validate schemas at pipeline boundaries — fail fast on unexpected data shapes
- Implement data quality checks with great_expectations or dbt tests at every stage
- Use incremental processing where possible — avoid full recomputation on every run
- Partition data by date or logical key for efficient querying and backfills
- Track data lineage end-to-end — know where every column comes from
- Define SLA monitoring for pipeline freshness — alert when data is stale`);
  }

  if (features.includes('monitoring')) {
    rules.push(`### Monitoring & Observability
- Use structured logging (JSON format) — never use unstructured print statements in production
- Emit metrics to Prometheus or CloudWatch for all critical operations (latency, error rate, throughput)
- Implement distributed tracing (OpenTelemetry) across service boundaries
- Define alerting thresholds based on SLOs/SLIs — not arbitrary static values
- Set error budgets and track burn rate — trigger alerts when budget is being consumed too fast
- Maintain dashboards for each service covering the RED method (Rate, Errors, Duration)
- Log correlation IDs across all requests for end-to-end debugging`);
  }

  if (features.includes('security')) {
    rules.push(`### Security
- Address OWASP Top 10 vulnerabilities — injection, broken auth, XSS, CSRF, SSRF, etc.
- Validate and sanitize all user inputs at the boundary — never trust client data
- Use a secrets manager (Vault, AWS Secrets Manager) — never hardcode secrets or store in git
- Follow least privilege for all IAM roles and service accounts — no wildcard permissions
- Run dependency scanning (Dependabot, Snyk) on every PR — block merges with critical CVEs
- Implement SAST/DAST in CI pipeline — catch vulnerabilities before they reach production
- Maintain audit logging for all sensitive operations — who did what, when, from where`);
  }

  if (features.includes('ci-cd')) {
    rules.push(`### CI/CD
- Define pipeline as code (GitHub Actions, Jenkinsfile) — no manual CI configuration
- Keep feedback loop fast (< 10 minutes) — parallelize stages, cache dependencies aggressively
- Run stages in parallel where possible (lint, test, type-check can run simultaneously)
- Cache build artifacts and dependencies between runs — never re-download what hasn't changed
- Implement environment promotion: dev -> staging -> prod with gates between each
- Define rollback strategy for every deployment — automated rollback on health check failure
- Never deploy directly to production — always go through staging first`);
  }

  if (features.includes('containerization')) {
    rules.push(`### Containerization
- Use multi-stage Dockerfiles — keep production images minimal (no build tools, no dev deps)
- Run containers as non-root user — never use root in production containers
- Maintain a .dockerignore file — exclude node_modules, .git, .env, test files
- Define health checks in Dockerfile or compose — containers must report their own status
- Set resource limits (CPU, memory) for every container — prevent noisy neighbor issues
- Scan images for vulnerabilities (Trivy, Snyk) in CI — block deployment of images with critical CVEs
- Use docker-compose for local dev — match production topology as closely as possible`);
  }

  if (features.includes('documentation')) {
    rules.push(`### Documentation
- Record Architecture Decision Records (ADRs) for every significant technical decision
- Maintain API documentation (OpenAPI/Swagger) — auto-generate from code where possible
- Write runbooks for every production incident scenario — step-by-step resolution guides
- Keep README with quickstart guide — new developers should be productive in < 30 minutes
- Maintain a changelog (CHANGELOG.md) — document every user-facing change
- Include architecture diagrams (C4 model or similar) — keep them up to date with code changes
- Document non-obvious decisions inline with comments explaining WHY, not WHAT`);
  }

  return rules.length > 0 ? `## Rules\n\n${rules.join('\n\n')}` : '';
}

function conventionsBlock(projectType: ProjectType, features: Feature[]): string {
  const conventions: string[] = [];

  if (projectType === 'nextjs') {
    conventions.push(
      '- Use the App Router (app/) — do not use the Pages Router',
      '- Prefer Server Components by default; add "use client" only when needed (event handlers, hooks, browser APIs)',
      '- Co-locate components with their routes in the app/ directory',
      '- Use server actions for form mutations when possible',
      '- Naming: PascalCase for components, camelCase for utilities, kebab-case for routes',
    );
  } else if (projectType === 'vite-react') {
    conventions.push(
      '- Keep components small and focused — one component per file',
      '- Use functional components with hooks — no class components',
      '- Co-locate tests, styles, and types with their components',
      '- Naming: PascalCase for components, camelCase for hooks and utilities',
      '- Use React.lazy() for route-level code splitting',
    );
  } else if (projectType === 'python') {
    conventions.push(
      '- Follow PEP 8 style guide — enforce with ruff',
      '- Use type hints on all function signatures',
      '- Use Pydantic models for request/response validation',
      '- Naming: snake_case for functions/variables, PascalCase for classes',
      '- Structure: routers/, models/, services/, schemas/',
    );
  } else if (projectType === 'nodejs') {
    conventions.push(
      '- Use TypeScript strict mode — no any types',
      '- Structure: routes/, controllers/, services/, middleware/, models/',
      '- Use dependency injection for services — makes testing easier',
      '- Naming: camelCase for variables/functions, PascalCase for classes/types',
      '- Handle all async errors with try/catch or error middleware',
    );
  } else if (projectType === 'ml-python') {
    conventions.push(
      '- Follow PEP 8 style guide — enforce with ruff',
      '- Use type hints on all function signatures',
      '- Structure: notebooks/, src/, data/, models/, experiments/',
      '- Naming: snake_case for functions/variables, PascalCase for classes',
      '- Keep notebooks for exploration only — refactor production code into src/',
      '- Pin random seeds in every script and notebook for reproducibility',
      '- Use config files (YAML/TOML) for hyperparameters — never hardcode in scripts',
    );
  } else if (projectType === 'data-engineering') {
    conventions.push(
      '- Follow PEP 8 style guide — enforce with ruff',
      '- Use type hints on all function signatures',
      '- Structure: dags/, dbt/, spark_jobs/, tests/, config/',
      '- Naming: snake_case for functions/variables, PascalCase for classes',
      '- SQL style: uppercase keywords, lowercase identifiers, one clause per line',
      '- Every DAG must have an owner, retries, and SLA defined',
      '- Use dbt sources and refs — never hardcode table names',
    );
  } else if (projectType === 'django') {
    conventions.push(
      '- Follow PEP 8 style guide — enforce with ruff',
      '- Use type hints on all function signatures',
      '- Structure: apps/<app_name>/models.py, views.py, serializers.py, urls.py, tests/',
      '- Naming: snake_case for functions/variables, PascalCase for classes and models',
      '- Use Django REST Framework serializers for API validation',
      '- Keep views thin — business logic goes in services or model methods',
      '- Use Django migrations for all schema changes — never modify DB manually',
    );
  } else if (projectType === 'aws-cdk') {
    conventions.push(
      '- Use TypeScript strict mode — no any types',
      '- Structure: lib/ for stacks, bin/ for app entry, test/ for tests',
      '- Naming: PascalCase for constructs/stacks, camelCase for properties',
      '- Use L2/L3 constructs over L1 (Cfn*) unless you need fine-grained control',
      '- Tag all resources with environment, team, and cost-center',
      '- Use cdk.context.json for environment-specific config — never hardcode account IDs',
    );
  } else if (projectType === 'gcp-terraform') {
    conventions.push(
      '- Structure: modules/ for reusable modules, environments/ for env-specific configs',
      '- Naming: snake_case for resources, variables, and outputs',
      '- Use variables and locals — never hardcode project IDs or regions',
      '- Use remote state (GCS backend) with state locking enabled',
      '- Tag all resources with labels for cost tracking and ownership',
      '- Use terraform fmt and terraform validate in CI',
    );
  } else if (projectType === 'azure-infra') {
    conventions.push(
      '- Structure: modules/ for reusable Bicep modules, main.bicep as entry point',
      '- Naming: camelCase for parameters, PascalCase for resource symbolic names',
      '- Use parameter files for environment-specific values (dev.parameters.json, prod.parameters.json)',
      '- Use Bicep modules for reusable infrastructure patterns',
      '- Tag all resources with environment, team, and cost-center',
      '- Validate with az bicep lint before deploying',
    );
  } else if (projectType === 'databricks') {
    conventions.push(
      '- Follow PEP 8 style guide — enforce with ruff',
      '- Structure: notebooks/, src/, jobs/, tests/, config/',
      '- Use Unity Catalog for all table and data governance',
      '- Use Delta Lake format for all tables — never raw Parquet in production',
      '- Keep notebooks for exploration — refactor production logic into Python modules',
      '- Use Databricks Asset Bundles or Terraform for deployment automation',
      '- Naming: snake_case for functions/variables/tables, PascalCase for classes',
    );
  } else if (projectType === 'snowflake') {
    conventions.push(
      '- SQL style: uppercase keywords, lowercase identifiers, one clause per line',
      '- Structure: models/staging/, models/intermediate/, models/marts/ (dbt layering)',
      '- Use dbt sources and refs — never hardcode database/schema/table names',
      '- Use Snowpark Python for complex transformations that are hard in SQL',
      '- Naming: snake_case for all SQL objects, prefix staging models with stg_, marts with fct_/dim_',
      '- Use Snowflake roles and warehouses appropriately — never use ACCOUNTADMIN for routine work',
    );
  } else if (projectType === 'react-native') {
    conventions.push(
      '- Keep components small and focused — one component per file',
      '- Use functional components with hooks — no class components',
      '- Structure: src/screens/, src/components/, src/navigation/, src/hooks/, src/services/',
      '- Naming: PascalCase for components/screens, camelCase for hooks and utilities',
      '- Use React Navigation for routing — define types for all route params',
      '- Test on both iOS and Android — platform-specific code uses .ios.tsx/.android.tsx',
    );
  } else if (projectType === 'go-api') {
    conventions.push(
      '- Follow Effective Go and standard Go project layout',
      '- Structure: cmd/, internal/, pkg/, api/',
      '- Naming: camelCase for unexported, PascalCase for exported, short variable names in narrow scope',
      '- Use interfaces for dependency injection — define interfaces where they are used, not implemented',
      '- Handle errors explicitly — never ignore returned errors',
      '- Use context.Context for cancellation and timeouts on all API boundaries',
    );
  } else if (projectType === 'rust-cli') {
    conventions.push(
      '- Follow Rust API guidelines and idiomatic Rust patterns',
      '- Structure: src/main.rs (entry), src/lib.rs (library), src/commands/, src/config/',
      '- Naming: snake_case for functions/variables, PascalCase for types/traits, SCREAMING_SNAKE for constants',
      '- Use clap derive macros for CLI argument parsing',
      '- Use Result<T, E> for all fallible operations — propagate errors with ? operator',
      '- Prefer &str over String for function parameters when ownership is not needed',
    );
  } else {
    conventions.push(
      '- Be consistent with naming conventions across the codebase',
      '- Keep functions small and focused — single responsibility',
      '- Document non-obvious decisions with comments explaining WHY',
    );
  }

  if (features.includes('testing')) {
    conventions.push('- Place tests next to source files: `Component.test.tsx` beside `Component.tsx`');
  }

  return `## Conventions\n${conventions.map(c => c).join('\n')}`;
}

function rolePrefix(role: Role): string {
  const prefixes: Record<Role, string> = {
    developer: 'You are a software developer. Focus on writing clean, well-tested code and shipping features efficiently. Prioritize code readability, maintainability, and comprehensive test coverage.',
    'data-scientist': 'You are a data scientist. Focus on reproducibility, experiment tracking, and statistical rigor. Every analysis should be reproducible, every experiment tracked, and every conclusion backed by data.',
    devops: 'You are a DevOps/SRE engineer. Focus on infrastructure as code, reliability, and automation. Every manual process should be automated, every deployment should be repeatable, and every system should be observable.',
    pm: 'You are a product manager. Focus on requirements clarity, acceptance criteria, and user stories. Generated files should emphasize WHAT to build, not HOW. Define clear success metrics and user outcomes for every feature.',
    qa: 'You are a QA engineer. Focus on test coverage, edge cases, and quality gates. Every feature needs a test plan, every edge case needs coverage, and every release needs to pass defined quality criteria.',
    architect: 'You are a software architect. Focus on system design decisions, trade-offs, and Architecture Decision Records (ADRs). Document the WHY behind every significant technical choice and evaluate alternatives.',
  };
  return prefixes[role];
}

function generateClaudeMd(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections = [
    `# ${projectName}`,
    '',
    rolePrefix(role),
    '',
    techStackBlock[projectType],
    '',
    conventionsBlock(projectType, features),
    '',
    commandsBlock[projectType],
    '',
    featureRules(features, projectType),
  ];

  return sections.filter(Boolean).join('\n');
}

function generateReviewSkill(projectType: ProjectType, features: Feature[]): string {
  const checks: string[] = [
    'Check for bugs, logic errors, and edge cases',
    'Verify error handling is comprehensive',
    'Look for potential security vulnerabilities',
  ];

  if (features.includes('testing')) checks.push('Ensure new code has corresponding tests');
  if (features.includes('auth')) checks.push('Verify authentication and authorization checks are in place');
  if (features.includes('database')) checks.push('Check for N+1 queries and missing indexes');
  if (features.includes('api')) checks.push('Verify API responses use correct HTTP status codes');
  if (features.includes('styling')) checks.push('Ensure UI is responsive and accessible');

  const langNote = projectType === 'python'
    ? 'Pay special attention to type hints and Pydantic model usage.'
    : 'Pay special attention to TypeScript types — no `any` allowed.';

  return `---
name: review
description: Review code changes for bugs, security issues, and best practices
---

Review the current code changes thoroughly. For each file changed:

${checks.map((c, i) => `${i + 1}. ${c}`).join('\n')}

${langNote}

Format your review as:
- **Critical**: Must fix before merge (bugs, security issues)
- **Warning**: Should fix (performance, maintainability)
- **Suggestion**: Nice to have (style, minor improvements)

If the code looks good, say so — don't invent issues.
`;
}

function generateTestSkill(projectType: ProjectType): string {
  const framework = projectType === 'python' ? 'pytest' : 'vitest/jest';
  const example = projectType === 'python'
    ? `def test_should_describe_expected_behavior():
    # Arrange
    input_data = create_test_data()

    # Act
    result = function_under_test(input_data)

    # Assert
    assert result == expected_output`
    : `test('should describe expected behavior', () => {
  // Arrange
  const input = createTestData();

  // Act
  const result = functionUnderTest(input);

  // Assert
  expect(result).toEqual(expectedOutput);
});`;

  return `---
name: test
description: Write tests following TDD principles using ${framework}
---

Write tests for the specified code using ${framework}. Follow these principles:

1. **Red**: Write a failing test first that describes the desired behavior
2. **Green**: Write the minimum code to make the test pass
3. **Refactor**: Clean up while keeping tests green

Test naming convention: \`should [expected behavior] when [condition]\`

Structure each test as Arrange-Act-Assert:

\`\`\`
${example}
\`\`\`

Cover these scenarios:
- Happy path (expected inputs)
- Edge cases (empty, null, boundary values)
- Error cases (invalid inputs, network failures)
- Integration points (API calls, database queries) — mock at the boundary

Do NOT test implementation details — test behavior and outcomes.
`;
}

function generatePreCommitHook(): string {
  return `#!/bin/bash
# Pre-commit hook: prevent committing secrets and enforce standards

# Colors
RED='\\033[0;31m'
GREEN='\\033[0;32m'
NC='\\033[0m' # No Color

echo "Running pre-commit checks..."

# 1. Check for secrets and sensitive data
SECRETS_PATTERN='(PRIVATE.KEY|password\\s*=|secret\\s*=|api.key\\s*=|token\\s*=|AWS_SECRET|OPENAI_API_KEY|sk-[a-zA-Z0-9]{20,})'
FILES_WITH_SECRETS=$(git diff --cached --name-only | xargs grep -lE "$SECRETS_PATTERN" 2>/dev/null | grep -v '.env.example' | grep -v 'pre-commit')

if [ -n "$FILES_WITH_SECRETS" ]; then
  echo -e "\${RED}BLOCKED: Possible secrets detected in:\${NC}"
  echo "$FILES_WITH_SECRETS"
  echo "Remove secrets or add to .gitignore before committing."
  exit 1
fi

# 2. Check for .env files
ENV_FILES=$(git diff --cached --name-only | grep -E '^\\.env($|\\.local$|\\.production$)')
if [ -n "$ENV_FILES" ]; then
  echo -e "\${RED}BLOCKED: Attempting to commit .env files:\${NC}"
  echo "$ENV_FILES"
  exit 1
fi

# 3. Check for large files (> 5MB)
LARGE_FILES=$(git diff --cached --name-only | while read f; do
  if [ -f "$f" ]; then
    size=$(wc -c < "$f" 2>/dev/null)
    if [ "$size" -gt 5242880 ]; then
      echo "$f ($(( size / 1048576 ))MB)"
    fi
  fi
done)

if [ -n "$LARGE_FILES" ]; then
  echo -e "\${RED}BLOCKED: Large files detected:\${NC}"
  echo "$LARGE_FILES"
  exit 1
fi

# 4. Check for debug statements
DEBUG_PATTERN='(console\\.log|debugger|binding\\.pry|import pdb|breakpoint\\(\\))'
DEBUG_FILES=$(git diff --cached --name-only | grep -E '\\.(ts|tsx|js|jsx|py)$' | xargs grep -lE "$DEBUG_PATTERN" 2>/dev/null)

if [ -n "$DEBUG_FILES" ]; then
  echo -e "\${RED}WARNING: Debug statements found in:\${NC}"
  echo "$DEBUG_FILES"
  echo "Remove debug statements or use --no-verify to bypass."
  exit 1
fi

echo -e "\${GREEN}All pre-commit checks passed!\${NC}"
exit 0
`;
}

function generateEnvExample(features: Feature[], projectType: ProjectType): string {
  const vars: string[] = [];

  if (projectType === 'nextjs') {
    vars.push('# Next.js', 'NEXT_PUBLIC_APP_URL=http://localhost:3000');
  }

  if (projectType === 'ml-python') {
    vars.push('# ML / Experiment Tracking', 'MLFLOW_TRACKING_URI=http://localhost:5000', 'WANDB_API_KEY=your-wandb-key-here');
  }

  if (projectType === 'databricks') {
    vars.push('# Databricks', 'DATABRICKS_HOST=https://your-workspace.cloud.databricks.com', 'DATABRICKS_TOKEN=your-token-here');
  }

  if (projectType === 'snowflake') {
    vars.push('# Snowflake', 'SNOWFLAKE_ACCOUNT=your-account', 'SNOWFLAKE_USER=your-user', 'SNOWFLAKE_PASSWORD=your-password', 'SNOWFLAKE_WAREHOUSE=your-warehouse', 'SNOWFLAKE_DATABASE=your-database', 'SNOWFLAKE_SCHEMA=your-schema');
  }

  if (projectType === 'aws-cdk') {
    vars.push('# AWS', 'AWS_REGION=us-east-1', 'AWS_ACCOUNT_ID=123456789012', 'AWS_PROFILE=default');
  }

  if (projectType === 'gcp-terraform') {
    vars.push('# GCP', 'GCP_PROJECT_ID=your-project-id', 'GCP_REGION=us-central1', 'GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json');
  }

  if (projectType === 'azure-infra') {
    vars.push('# Azure', 'AZURE_SUBSCRIPTION_ID=your-subscription-id', 'AZURE_RESOURCE_GROUP=your-resource-group', 'AZURE_LOCATION=eastus');
  }

  if (projectType === 'data-engineering') {
    vars.push('# Data Engineering', 'AIRFLOW_HOME=~/airflow', 'DBT_PROFILES_DIR=~/.dbt', 'SPARK_MASTER=local[*]');
  }

  if (projectType === 'django') {
    vars.push('# Django', 'DJANGO_SECRET_KEY=your-secret-key-here', 'DJANGO_DEBUG=True', 'DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1');
  }

  if (projectType === 'go-api') {
    vars.push('# Go API', 'PORT=8080', 'ENV=development');
  }

  if (projectType === 'rust-cli') {
    vars.push('# Rust CLI', 'RUST_LOG=info');
  }

  if (projectType === 'react-native') {
    vars.push('# React Native', 'API_BASE_URL=http://localhost:3000');
  }

  if (features.includes('database')) {
    vars.push('', '# Database', 'DATABASE_URL=postgresql://user:password@localhost:5432/dbname');
  }

  if (features.includes('auth')) {
    vars.push('', '# Authentication', 'AUTH_SECRET=your-secret-key-here', 'AUTH_URL=http://localhost:3000');
  }

  if (features.includes('ai-llm')) {
    vars.push('', '# AI / LLM', 'OPENAI_API_KEY=sk-your-key-here', 'LLM_MODEL=gpt-4o-mini', 'LLM_MAX_TOKENS=4096');
  }

  if (features.includes('deployment')) {
    vars.push('', '# Deployment', 'NODE_ENV=development');
  }

  if (features.includes('monitoring')) {
    vars.push('', '# Monitoring', 'PROMETHEUS_ENDPOINT=http://localhost:9090', 'OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317');
  }

  return vars.length > 0 ? vars.join('\n') + '\n' : '# No environment variables required\n';
}

// ---------------------------------------------------------------------------
// NEW GENERATOR FUNCTIONS
// ---------------------------------------------------------------------------

function generateRoleSkills(role: Role, _projectType: ProjectType): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (role === 'developer') {
    files.push({
      path: 'skills/developer/refactor.md',
      content: `---
name: refactor
description: Systematic refactoring with safety checks and incremental steps
---

When asked to refactor code, follow this methodology:

1. **Understand**: Read the code and identify the smell (duplication, long method, god class, feature envy, etc.)
2. **Safety net**: Ensure tests exist for the code being refactored. If not, write characterization tests first that capture current behavior.
3. **Plan**: Describe the refactoring steps before making changes. Name the refactoring pattern (Extract Method, Move Field, Replace Conditional with Polymorphism, etc.)
4. **Incremental changes**: Make one small transformation at a time. Run tests after each step.
5. **Verify**: Confirm all tests pass and behavior is unchanged. Run the full test suite, not just related tests.

Rules:
- Never change behavior and structure in the same commit
- If you find a bug during refactoring, note it but do NOT fix it — refactoring and bug fixing are separate tasks
- Preserve the public API unless explicitly asked to change it
- Update any affected documentation or comments
- If the refactoring is large, break it into multiple PRs
`,
    });

    files.push({
      path: 'skills/developer/debug.md',
      content: `---
name: debug
description: Structured debugging methodology to isolate and fix issues
---

When asked to debug an issue, follow this structured approach:

1. **Reproduce**: Create a minimal reproduction of the bug. Define exact steps, inputs, and environment. If you cannot reproduce it, gather more information before proceeding.
2. **Isolate**: Narrow down the problem scope. Use binary search through the code path — add logging or breakpoints at midpoints to determine which half contains the bug.
3. **Identify root cause**: Find the ACTUAL cause, not just the symptom. Ask "why" at least 3 times. Check recent changes (git log/blame) in the affected area.
4. **Fix**: Make the minimal change that fixes the root cause. Do not refactor unrelated code in the same fix.
5. **Verify**: Write a regression test that fails without the fix and passes with it. Confirm no other tests break.
6. **Document**: Add a comment explaining why the fix works if the root cause is non-obvious.

Common debugging checklist:
- Check error messages and stack traces carefully — read from bottom to top
- Verify assumptions about input data (log actual values)
- Check for race conditions, null/undefined, off-by-one errors
- Review recent git changes in the affected files
`,
    });

    files.push({
      path: 'skills/developer/pr-review.md',
      content: `---
name: pr-review
description: Comprehensive pull request review checklist for developers
---

Review this pull request using the following checklist:

**Correctness**
- Does the code do what the PR description says?
- Are edge cases handled (empty inputs, nulls, boundary values, concurrent access)?
- Are error paths handled gracefully with appropriate error messages?

**Design**
- Is this the simplest solution that works? Could it be simpler?
- Does it follow existing patterns in the codebase?
- Are responsibilities clearly separated (no god functions/classes)?
- Are new dependencies justified?

**Testing**
- Are there tests for the happy path AND edge cases?
- Do tests actually assert meaningful behavior (not just "doesn't throw")?
- Are tests independent and not flaky?

**Security**
- Is user input validated and sanitized?
- Are there any hardcoded secrets or credentials?
- Are SQL queries parameterized?

**Performance**
- Are there any N+1 queries or unnecessary loops?
- Could this cause memory issues at scale?
- Are database queries using indexes?

Provide feedback as: MUST FIX (blocking), SHOULD FIX (important), or NIT (optional).
`,
    });
  }

  if (role === 'data-scientist') {
    files.push({
      path: 'skills/data-scientist/eda.md',
      content: `---
name: eda
description: Exploratory data analysis workflow for understanding datasets
---

When performing exploratory data analysis, follow this structured workflow:

1. **Overview**: Load the data and inspect shape, dtypes, head/tail, and memory usage. Print \`df.info()\` and \`df.describe()\`.
2. **Missing data**: Compute missing percentages per column. Visualize with a heatmap. Decide strategy per column: drop, impute (mean/median/mode/model-based), or flag.
3. **Distributions**: Plot histograms and box plots for numeric columns. Plot bar charts for categoricals. Check for skewness and consider log transforms.
4. **Outliers**: Use IQR method or z-scores to identify outliers. Investigate whether they are data errors or genuine extreme values. Document decisions.
5. **Correlations**: Compute correlation matrix for numerics. Use Cramer's V or mutual information for categoricals. Visualize with heatmap.
6. **Target analysis** (if supervised): Plot target distribution. Check class balance. Compute correlations between features and target.
7. **Key findings**: Summarize top 5 insights, data quality issues, and recommended preprocessing steps.

Output a clean notebook or report with visualizations and markdown commentary for each step.
`,
    });

    files.push({
      path: 'skills/data-scientist/experiment.md',
      content: `---
name: experiment
description: Experiment design framework with hypothesis, metrics, and analysis
---

When designing or running an experiment, follow this structure:

1. **Hypothesis**: State a clear, falsifiable hypothesis. Example: "Adding feature X will improve metric Y by at least Z%."
2. **Metrics**: Define primary metric (what you optimize) and guardrail metrics (what must not degrade). Specify how each is computed.
3. **Design**: Choose experiment type (A/B test, multi-armed bandit, offline evaluation). Define sample size, duration, and statistical power (aim for 80%+).
4. **Implementation**: Log all parameters, random seeds, data versions, and code versions. Use experiment tracking (MLflow/W&B).
5. **Run**: Execute with proper controls. Monitor for data quality issues during the run. Do NOT peek at results before the planned end date.
6. **Analyze**: Compute confidence intervals, p-values, and effect sizes. Check for Simpson's paradox by segmenting results. Visualize distributions, not just averages.
7. **Conclude**: State whether the hypothesis was supported or rejected. Document learnings and next steps regardless of outcome.

Always version the experiment config and results together for reproducibility.
`,
    });

    files.push({
      path: 'skills/data-scientist/model-eval.md',
      content: `---
name: model-eval
description: Model evaluation with metrics, fairness checks, and validation
---

When evaluating a model, cover all of these dimensions:

1. **Classification metrics**: Compute accuracy, precision, recall, F1, and ROC-AUC. Use confusion matrix to understand error types. Choose the metric that matches business cost (e.g., recall for fraud detection).
2. **Regression metrics**: Compute MAE, RMSE, MAPE, and R-squared. Plot predicted vs actual and residual plots.
3. **Cross-validation**: Use stratified k-fold (k=5 or 10). Report mean and standard deviation of metrics. Check for high variance across folds.
4. **Calibration**: Plot calibration curves. Well-calibrated probabilities are critical for downstream decisions.
5. **Bias and fairness**: Evaluate metrics across protected groups (gender, age, race). Check for disparate impact. Use fairness metrics: demographic parity, equalized odds.
6. **Error analysis**: Examine the worst predictions. Look for patterns in errors — specific subgroups, feature ranges, or data quality issues.
7. **Comparison**: Compare against baseline (random, majority class, simple heuristic). Show lift over baseline.

Present results in a structured table with all metrics. Include visualizations for confusion matrix, ROC curve, and feature importance.
`,
    });

    files.push({
      path: 'skills/data-scientist/feature-eng.md',
      content: `---
name: feature-eng
description: Feature engineering best practices and common transforms
---

When engineering features, follow these guidelines:

1. **Numeric transforms**: Consider log, sqrt, or Box-Cox for skewed distributions. Standardize or normalize based on model requirements. Create interaction terms for known relationships.
2. **Categorical encoding**: Use one-hot for low cardinality (<10), target encoding for high cardinality. Consider ordinal encoding when categories have natural order. Handle unseen categories at inference time.
3. **Datetime features**: Extract year, month, day, day-of-week, hour, is_weekend, is_holiday. Compute time-since features (days since last event). Create cyclical features with sin/cos for periodic patterns.
4. **Text features**: Compute length, word count, sentiment. Use TF-IDF or embeddings for content. Extract entities if relevant.
5. **Aggregation features**: Group-by aggregations (mean, count, std, min, max) for relational data. Window functions for time-series.
6. **Feature selection**: Remove features with >95% missing, zero variance, or >0.95 correlation with another feature. Use importance from tree models or mutual information.

Rules:
- Fit encoders on training data only — transform test/production data with the fitted encoder
- Document every feature with its definition and business meaning
- Store feature computation logic in reusable functions, not ad-hoc notebook cells
`,
    });
  }

  if (role === 'devops') {
    files.push({
      path: 'skills/devops/incident.md',
      content: `---
name: incident
description: Incident response runbook template for production issues
---

When responding to a production incident, follow this runbook:

1. **Detect**: Identify the scope and severity. Check dashboards, alerts, and error rates. Classify severity: SEV1 (full outage), SEV2 (degraded), SEV3 (minor impact).
2. **Communicate**: Post in the incident channel. Assign an Incident Commander. Update stakeholders with ETA every 15 minutes for SEV1, 30 minutes for SEV2.
3. **Triage**: Identify the most likely cause. Check recent deployments, config changes, infrastructure events, and dependency status. Use logs, metrics, and traces to narrow down.
4. **Mitigate**: Apply the fastest safe fix — rollback, feature flag toggle, traffic shift, or scaling. Prioritize restoring service over finding root cause.
5. **Resolve**: Once service is stable, identify and fix the root cause. Deploy the permanent fix through the normal pipeline.
6. **Postmortem**: Within 48 hours, write a blameless postmortem covering: timeline, root cause, impact (users affected, duration), what went well, what went poorly, and action items with owners and deadlines.

Generate the postmortem document in this format:
- Title, Date, Severity, Duration
- Summary (2-3 sentences)
- Timeline (timestamped events)
- Root Cause Analysis (5 Whys)
- Action Items (each with owner and due date)
`,
    });

    files.push({
      path: 'skills/devops/infra-review.md',
      content: `---
name: infra-review
description: Infrastructure code review checklist for IaC changes
---

When reviewing infrastructure code changes (Terraform, CDK, Bicep, CloudFormation), check:

**Blast radius**
- How many resources are affected? Could this break existing services?
- Is this change isolated to one environment or does it affect all?
- Are there dependent resources that might be destroyed and recreated?

**Rollback plan**
- Can this change be reverted safely? What is the rollback procedure?
- Are there any one-way operations (database deletions, DNS changes)?
- Is state migration needed?

**Security**
- Are IAM permissions following least privilege?
- Are secrets managed through a secrets manager (not hardcoded)?
- Are security groups and network ACLs properly scoped?
- Is encryption enabled at rest and in transit?

**Cost**
- What is the estimated monthly cost impact?
- Are there cheaper alternatives that meet requirements?
- Are resources right-sized (instance types, storage classes)?

**Reliability**
- Is there multi-AZ or multi-region redundancy where needed?
- Are auto-scaling policies defined?
- Are backup and disaster recovery configured?

Flag any change that destroys and recreates resources as HIGH RISK.
`,
    });

    files.push({
      path: 'skills/devops/capacity-plan.md',
      content: `---
name: capacity-plan
description: Capacity planning methodology for infrastructure sizing
---

When asked to plan capacity for a service or system:

1. **Baseline**: Gather current usage metrics — CPU, memory, disk, network, request rate, latency p50/p95/p99. Identify peak and average usage patterns.
2. **Growth projection**: Estimate growth rate from historical data or business projections. Model at least 3 scenarios: conservative (10%), expected (30%), aggressive (100%).
3. **Resource mapping**: Map workload characteristics to resource requirements. Consider: compute (CPU/GPU), memory, storage (IOPS, throughput, capacity), network bandwidth.
4. **Bottleneck analysis**: Identify which resource will hit limits first. Calculate headroom for each resource. Target 70% utilization at peak for buffer.
5. **Scaling strategy**: Define horizontal vs vertical scaling approach. Set auto-scaling triggers and limits. Plan for burst capacity (queue-based, spot instances).
6. **Cost modeling**: Estimate costs for each scenario. Compare reserved vs on-demand vs spot pricing. Identify optimization opportunities (right-sizing, scheduling, storage tiering).
7. **Recommendations**: Present a capacity plan with specific instance types, counts, and scaling rules. Include a review cadence (monthly or quarterly).

Output a capacity plan document with tables for current state, projected needs, and cost estimates.
`,
    });
  }

  if (role === 'pm') {
    files.push({
      path: 'skills/pm/prd.md',
      content: `---
name: prd
description: Product Requirements Document template with structured sections
---

When creating a PRD, use this structure:

1. **Problem statement**: What problem are we solving? Who has this problem? How painful is it? Include data or user quotes if available.
2. **Goals**: What does success look like? Define 2-3 measurable goals with target metrics. Example: "Reduce onboarding drop-off from 40% to 20% within 3 months."
3. **Non-goals**: What are we explicitly NOT doing? This prevents scope creep.
4. **User stories**: List key user stories in "As a [role], I want [action], so that [benefit]" format. Prioritize with MoSCoW (Must/Should/Could/Won't).
5. **Requirements**: Break down into functional requirements (what it does) and non-functional requirements (performance, security, accessibility).
6. **Success metrics**: Define how we will measure success post-launch. Include leading indicators (engagement) and lagging indicators (retention, revenue).
7. **Timeline**: High-level milestones with dates. Include design, development, testing, and launch phases.
8. **Risks and mitigations**: List top 3-5 risks with likelihood, impact, and mitigation strategy.
9. **Open questions**: List unresolved decisions that need stakeholder input.

Keep the PRD to 2-3 pages. Link to detailed specs for technical implementation.
`,
    });

    files.push({
      path: 'skills/pm/user-story.md',
      content: `---
name: user-story
description: User story writing guide with acceptance criteria
---

When writing user stories, follow this format:

**Story format**: "As a [specific user role], I want [specific action], so that [measurable benefit]."

**Acceptance criteria** (use Given/When/Then):
- Given [precondition], when [action], then [expected result]
- Include happy path, edge cases, and error scenarios
- Each criterion must be independently testable

**Definition of Done checklist**:
- [ ] Code complete and reviewed
- [ ] Unit tests written and passing
- [ ] Acceptance criteria verified
- [ ] Documentation updated
- [ ] Deployed to staging and tested

**Story sizing guidelines**:
- A story should be completable in 1-3 days
- If larger, split into smaller stories (vertical slices, not horizontal layers)
- Split by: user role, workflow step, data variation, or platform

**INVEST criteria** — every story should be:
- Independent (minimal dependencies)
- Negotiable (details can be discussed)
- Valuable (delivers user value)
- Estimable (team can size it)
- Small (fits in a sprint)
- Testable (clear pass/fail criteria)
`,
    });

    files.push({
      path: 'skills/pm/prioritize.md',
      content: `---
name: prioritize
description: Prioritization frameworks for feature and backlog decisions
---

When prioritizing features or backlog items, use one or both of these frameworks:

**RICE Scoring**:
- **Reach**: How many users will this affect per quarter? (number)
- **Impact**: How much will it affect each user? (3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal)
- **Confidence**: How sure are we about estimates? (100%=high, 80%=medium, 50%=low)
- **Effort**: Person-months of work (number)
- **Score** = (Reach x Impact x Confidence) / Effort
- Rank items by RICE score. Items scoring 2x+ above average are strong candidates.

**MoSCoW Method**:
- **Must have**: Non-negotiable for this release. Without these, the product does not work.
- **Should have**: Important but not critical. Workarounds exist.
- **Could have**: Nice to have. Include if time permits.
- **Won't have (this time)**: Explicitly deferred. Documented for future consideration.

Present prioritized items in a table with scores, categories, and rationale. Always include the reasoning for the top 3 and bottom 3 decisions.
`,
    });

    files.push({
      path: 'skills/pm/stakeholder-update.md',
      content: `---
name: stakeholder-update
description: Status update template for stakeholder communication
---

When writing a stakeholder status update, use this template:

**Subject line**: [Project Name] Status Update — [Date] — [On Track / At Risk / Blocked]

**TL;DR** (2-3 sentences): Overall status, key highlight, and any asks.

**Progress this period**:
- Completed: List 3-5 items shipped or milestones hit
- In progress: List 2-3 items actively being worked on with % complete

**Metrics** (if applicable):
- Key metric 1: [current] vs [target] (trend arrow)
- Key metric 2: [current] vs [target] (trend arrow)

**Risks and blockers**:
- [Risk/Blocker]: Description, impact, mitigation plan, owner
- Use RED/YELLOW/GREEN status for each

**Upcoming milestones**:
- [Date]: Milestone description
- [Date]: Milestone description

**Decisions needed**:
- [Decision]: Context, options, recommendation, deadline for decision

Keep updates to one page. Use bullet points, not paragraphs. Lead with the most important information.
`,
    });
  }

  if (role === 'qa') {
    files.push({
      path: 'skills/qa/test-plan.md',
      content: `---
name: test-plan
description: Test plan creation covering scope, approach, and risk
---

When creating a test plan for a feature or release, include:

1. **Scope**: What is being tested and what is NOT being tested. List features, components, and integrations in scope.
2. **Approach**: Testing types to apply — unit, integration, E2E, performance, security, accessibility. Specify tools for each.
3. **Test environment**: Required environments, test data setup, external service mocks or sandboxes.
4. **Entry criteria**: What must be true before testing starts (code complete, deployed to staging, test data loaded).
5. **Test cases**: Organized by feature area. For each: ID, description, preconditions, steps, expected result, priority (P0-P3).
6. **Exit criteria**: What must be true to consider testing complete — all P0/P1 tests pass, no open critical bugs, coverage threshold met.
7. **Schedule**: Testing phases with start/end dates and assigned testers.
8. **Risks**: What could go wrong (flaky tests, environment issues, data dependencies). Mitigation for each.

Prioritize test cases: P0 (blocks release), P1 (major functionality), P2 (minor functionality), P3 (edge cases).
`,
    });

    files.push({
      path: 'skills/qa/regression.md',
      content: `---
name: regression
description: Regression test suite management and maintenance
---

When managing a regression test suite:

1. **Inventory**: Catalog all existing regression tests by feature area, priority, and execution time. Identify gaps.
2. **Selection strategy**: For a given release, select regression tests based on: changed code paths, risk areas, historical failure patterns, and dependency graph.
3. **Maintenance rules**:
   - Remove tests for deprecated features immediately
   - Update tests when requirements change (not just to make them pass)
   - Mark flaky tests and fix within 1 sprint or delete them
   - Review the suite quarterly — remove redundant tests that cover the same path
4. **Execution**: Run full regression before every release. Run targeted regression on every PR (tests for changed areas + smoke tests).
5. **Metrics to track**:
   - Total tests, pass rate, execution time
   - Flaky test count and flaky rate
   - Defect escape rate (bugs found in production that regression should have caught)
   - Time to execute full suite (target: < 30 minutes)
6. **Optimization**: Parallelize test execution. Use test impact analysis to skip unaffected tests. Cache test environments.

Report regression results as: PASS (all green), PASS WITH KNOWN ISSUES (documented), or FAIL (blocking issues found).
`,
    });

    files.push({
      path: 'skills/qa/exploratory.md',
      content: `---
name: exploratory
description: Exploratory testing session guide with charter and reporting
---

When running an exploratory testing session:

1. **Charter**: Define the mission in one sentence. Format: "Explore [target] with [resources] to discover [information]."
   Example: "Explore the checkout flow with various payment methods to discover UX issues and edge cases."
2. **Timebox**: Set a fixed duration (60-90 minutes). Stay focused on the charter.
3. **Explore**: Use these heuristics:
   - Boundary values: test min, max, zero, negative, very large inputs
   - State transitions: test all possible state changes and invalid transitions
   - Interruptions: cancel mid-flow, lose connection, switch tabs, back button
   - Data variations: empty, special characters, unicode, very long strings, SQL/XSS payloads
   - Concurrency: multiple tabs, rapid clicking, simultaneous users
4. **Document as you go**: For each finding, note: what you did, what happened, what you expected, severity assessment, screenshot/recording.
5. **Debrief**: Summarize findings in a report:
   - Bugs found (with severity: critical/major/minor/cosmetic)
   - Areas that feel risky but no bug found yet
   - Questions for the team
   - Suggested follow-up sessions

File bugs immediately for anything critical. Batch minor issues.
`,
    });

    files.push({
      path: 'skills/qa/bug-report.md',
      content: `---
name: bug-report
description: Bug report template with reproduction steps and classification
---

When filing a bug report, include all of these fields:

**Title**: [Component] Brief description of unexpected behavior

**Severity**: Critical (data loss, security, crash) | Major (feature broken, no workaround) | Minor (feature broken, workaround exists) | Cosmetic (visual only)

**Environment**: OS, browser/device, app version, environment (staging/production), user role/permissions

**Steps to reproduce**:
1. [Exact step with specific data used]
2. [Next step]
3. [Step where bug occurs]

**Expected result**: What should happen according to requirements.

**Actual result**: What actually happens. Include error messages verbatim.

**Attachments**: Screenshots, screen recordings, console logs, network requests. Always include visual evidence.

**Frequency**: Always reproducible | Intermittent (X out of Y attempts) | One-time

**Workaround**: If one exists, describe it.

**Additional context**: Related bugs, recent changes that might be relevant, affected user count if known.

Do NOT editorialize ("this is terrible"). State facts. One bug per report.
`,
    });
  }

  if (role === 'architect') {
    files.push({
      path: 'skills/architect/adr.md',
      content: `---
name: adr
description: Architecture Decision Record template for documenting technical decisions
---

When documenting an architecture decision, use this ADR format:

**Title**: ADR-[number]: [Short decision title]

**Status**: Proposed | Accepted | Deprecated | Superseded by ADR-[number]

**Date**: [YYYY-MM-DD]

**Context**: What is the situation? What forces are at play? What constraints exist? Describe the problem that needs a decision. Include technical and business context.

**Decision**: What is the decision? State it clearly in one sentence, then elaborate. Example: "We will use PostgreSQL as our primary database."

**Alternatives considered**:
- Alternative 1: Brief description, pros, cons, why rejected
- Alternative 2: Brief description, pros, cons, why rejected

**Consequences**:
- Positive: What becomes easier or possible
- Negative: What becomes harder or impossible
- Neutral: What changes but is neither good nor bad

**Risks**: What could go wrong with this decision? How will we mitigate each risk?

**Review date**: When should this decision be revisited? (e.g., 6 months, after reaching 10k users)

Store ADRs in \`docs/adr/\` numbered sequentially. Never delete ADRs — supersede them.
`,
    });

    files.push({
      path: 'skills/architect/design-review.md',
      content: `---
name: design-review
description: System design review checklist for evaluating architecture proposals
---

When reviewing a system design or architecture proposal, evaluate:

**Functional fit**:
- Does the design satisfy all stated requirements?
- Are there requirements that are difficult to implement with this design?

**Scalability**:
- What is the expected load (requests/sec, data volume, concurrent users)?
- Where are the bottlenecks? How does the system scale horizontally?
- What happens at 10x and 100x current load?

**Reliability**:
- What are the single points of failure?
- What is the target availability (99.9%, 99.99%)?
- How does the system handle partial failures (circuit breakers, retries, fallbacks)?

**Security**:
- How is authentication and authorization handled?
- What is the attack surface? How is it minimized?
- How are secrets managed? Is data encrypted at rest and in transit?

**Operability**:
- How is the system monitored and debugged?
- What does deployment look like? Can you roll back?
- How are configuration changes applied?

**Cost**:
- What is the estimated infrastructure cost?
- Are there cheaper alternatives that meet requirements?
- What are the cost drivers at scale?

**Simplicity**:
- Is this the simplest design that meets requirements?
- Can any components be eliminated or combined?

Rate each dimension as: Strong / Adequate / Needs Work / Missing.
`,
    });

    files.push({
      path: 'skills/architect/rfc.md',
      content: `---
name: rfc
description: RFC template for proposing significant technical changes
---

When writing an RFC (Request for Comments) for a significant change:

**Title**: RFC-[number]: [Descriptive title]

**Author(s)**: [Names]
**Status**: Draft | In Review | Accepted | Rejected | Withdrawn
**Created**: [Date]
**Review deadline**: [Date — typically 1-2 weeks]

**Summary**: 2-3 sentence overview of what is being proposed and why.

**Motivation**: Why is this change needed? What problem does it solve? What is the cost of NOT doing this? Include data, user feedback, or incidents that motivate this.

**Detailed design**: How will this work? Include:
- Architecture diagrams (ASCII or linked images)
- API contracts or interface definitions
- Data model changes
- Migration strategy

**Alternatives considered**: At least 2 alternatives with pros/cons for each. Explain why the proposed solution is preferred.

**Rollout plan**: How will this be deployed? Phases, feature flags, migration steps. Include rollback plan.

**Open questions**: List unresolved design questions for reviewers to weigh in on.

**References**: Links to related ADRs, docs, RFCs, or external resources.

Circulate the RFC to all affected teams. Allow at least 5 business days for review.
`,
    });

    files.push({
      path: 'skills/architect/tradeoff.md',
      content: `---
name: tradeoff
description: Trade-off analysis template for evaluating technical options
---

When analyzing trade-offs between technical options:

1. **Define the decision**: What specific question are you answering? What are the constraints (budget, timeline, team skills)?

2. **List options**: Enumerate all viable options (minimum 2, ideally 3-4). Include "do nothing" if applicable.

3. **Define evaluation criteria**: Choose 4-6 criteria relevant to this decision. Common criteria:
   - Performance (latency, throughput)
   - Scalability (horizontal, data volume)
   - Developer experience (learning curve, ecosystem)
   - Operational complexity (deployment, monitoring, debugging)
   - Cost (infrastructure, licensing, maintenance)
   - Time to implement (weeks/months)
   - Risk (maturity, vendor lock-in, community size)

4. **Score each option**: Rate each option against each criterion (1-5 scale). Weight criteria by importance to this specific decision.

5. **Create comparison matrix**: Present as a table with options as columns and criteria as rows. Include weighted total.

6. **Recommendation**: State your recommendation with clear reasoning. Acknowledge what you are giving up (every choice has trade-offs). Define conditions under which you would revisit this decision.

Never present a trade-off analysis without a clear recommendation. Decision-makers need a point of view, not just data.
`,
    });
  }

  return files;
}

function generateProjectSkills(projectType: ProjectType): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (projectType === 'nextjs') {
    files.push({
      path: 'skills/project/nextjs-patterns.md',
      content: `---
name: nextjs-patterns
description: Next.js App Router patterns for Server Components, caching, and data fetching
---

When building with Next.js App Router, follow these patterns:

**Server Components (default)**:
- Use Server Components for data fetching, database access, and static content
- Fetch data directly in the component with async/await — no useEffect needed
- Use \`loading.tsx\` for Suspense boundaries and \`error.tsx\` for error boundaries

**Client Components ("use client")**:
- Only add "use client" when you need: event handlers, useState, useEffect, browser APIs
- Keep client components as leaves — push "use client" as far down the tree as possible
- Pass server data to client components as props (serializable data only)

**Data fetching**:
- Use \`fetch()\` in Server Components — Next.js extends it with caching and revalidation
- Set \`revalidate\` for ISR: \`fetch(url, { next: { revalidate: 60 } })\`
- Use \`cache: 'no-store'\` for dynamic data that must be fresh on every request
- Use Server Actions for mutations — define with "use server" in a separate file

**Caching layers**:
- Request memoization: same fetch in multiple components deduplicates automatically
- Data cache: persists across requests, revalidate with time-based or on-demand
- Full route cache: static routes are cached at build time
- Use \`revalidatePath()\` or \`revalidateTag()\` for on-demand cache invalidation

**Routing**:
- Use route groups \`(group)\` for layout organization without affecting URL
- Use parallel routes \`@slot\` for simultaneously rendered sections
- Use intercepting routes \`(.)\` for modal patterns
`,
    });
  }

  if (projectType === 'vite-react') {
    files.push({
      path: 'skills/project/react-patterns.md',
      content: `---
name: react-patterns
description: React hooks, state management, and performance patterns
---

When building with React + Vite, follow these patterns:

**Component design**:
- One component per file, named exports (not default exports)
- Props interface defined above the component
- Destructure props in the function signature
- Keep components under 150 lines — extract sub-components when larger

**Hooks**:
- Custom hooks for reusable logic: \`useDebounce\`, \`useLocalStorage\`, \`useMediaQuery\`
- Always include all dependencies in useEffect/useMemo/useCallback dependency arrays
- Use useRef for values that should not trigger re-renders
- Avoid useEffect for derived state — compute during render or use useMemo

**State management**:
- Local state (useState) for component-specific UI state
- URL state (useSearchParams) for filterable/shareable UI state
- Context for theme/auth/locale — avoid using context as a global store
- External store (Zustand, Jotai) only when state is shared across distant components

**Performance**:
- Use React.memo only when profiling shows unnecessary re-renders
- Use React.lazy + Suspense for route-level code splitting
- Virtualize long lists with @tanstack/virtual
- Use useTransition for non-urgent state updates

**Data fetching**:
- Use @tanstack/react-query for server state (caching, refetching, optimistic updates)
- Keep fetch logic in custom hooks, not in components
- Handle loading, error, and empty states explicitly
`,
    });
  }

  if (projectType === 'ml-python') {
    files.push({
      path: 'skills/project/train-model.md',
      content: `---
name: train-model
description: ML training pipeline with validation, tuning, and tracking
---

When building or modifying a training pipeline:

1. **Data preparation**: Split data into train/validation/test (e.g., 70/15/15). Use stratified splits for classification. NEVER use test data for any training decisions.
2. **Baseline**: Train a simple model first (logistic regression, decision tree). This sets the bar for more complex models.
3. **Training loop**:
   - Set random seeds everywhere: numpy, torch, random, PYTHONHASHSEED
   - Log all hyperparameters to experiment tracker before training starts
   - Monitor training and validation metrics per epoch — watch for overfitting
   - Implement early stopping based on validation metric
4. **Hyperparameter tuning**: Use Optuna or similar. Define search space explicitly. Use cross-validation within the training set. Log every trial.
5. **Evaluation**: Evaluate final model on held-out test set exactly once. Compare to baseline. Compute confidence intervals via bootstrap.
6. **Artifacts**: Save model weights, preprocessing pipeline, feature list, training config, and evaluation metrics together. Version with experiment tracker.
7. **Reproducibility checklist**: Pin all library versions, save the exact command used, log git SHA, save a copy of the training config.

Never retrain on the full dataset (train+val+test) without a separate holdout for final evaluation.
`,
    });

    files.push({
      path: 'skills/project/feature-engineering.md',
      content: `---
name: feature-engineering
description: Feature engineering transforms, encoding, and selection for ML
---

When building features for an ML pipeline:

**Numeric features**:
- Standardize (zero mean, unit variance) for linear models, SVMs, neural nets
- Handle outliers: clip, winsorize, or log-transform before scaling
- Create polynomial and interaction features for known relationships
- Bin continuous features into quantiles when non-linear relationships exist

**Categorical features**:
- One-hot encode for low cardinality (< 15 categories)
- Target encode for high cardinality (use k-fold within training to avoid leakage)
- Hash encoding for very high cardinality (> 1000 categories)
- Create binary flags for rare categories

**Missing data**:
- Add a binary "is_missing" indicator column before imputing
- Use median imputation for numeric (robust to outliers)
- Use mode imputation for categorical
- Consider model-based imputation (KNN, iterative) for important features

**Feature selection**:
- Remove zero-variance and near-zero-variance features
- Remove one of each pair with correlation > 0.95
- Use permutation importance or SHAP for model-based selection
- Validate that removing features does not degrade validation performance

**Pipeline rules**:
- Fit all transformers on training data only — use sklearn Pipeline or ColumnTransformer
- Save fitted transformers with the model for inference consistency
- Test that the pipeline handles unseen categories and missing values gracefully
`,
    });
  }

  if (projectType === 'data-engineering') {
    files.push({
      path: 'skills/project/dbt-model.md',
      content: `---
name: dbt-model
description: dbt model design with staging, intermediate, and mart layers
---

When creating or modifying dbt models, follow the layered architecture:

**Staging (stg_)**:
- One staging model per source table
- Light transformations only: rename columns, cast types, add computed columns
- Reference sources with \`{{ source('schema', 'table') }}\`
- Materialized as views (cheap, always fresh)

**Intermediate (int_)**:
- Business logic, joins, aggregations, complex transformations
- One purpose per model — name describes the transformation
- Reference staging models with \`{{ ref('stg_model') }}\`
- Materialized as views or ephemeral

**Marts (fct_ / dim_)**:
- Final tables consumed by BI tools and analysts
- Fact tables (fct_): events, transactions — grain is one row per event
- Dimension tables (dim_): entities — one row per entity
- Materialized as tables with incremental where possible

**Testing**:
- Every model must have: unique, not_null on primary key
- Add accepted_values tests for status/type columns
- Add relationships tests for foreign keys
- Add custom data tests for business rules

**Documentation**:
- Every model needs a description in schema.yml
- Document columns that are not self-explanatory
- Add tags for domain grouping

Use \`{{ config(materialized='incremental', unique_key='id') }}\` for large tables.
`,
    });

    files.push({
      path: 'skills/project/pipeline-debug.md',
      content: `---
name: pipeline-debug
description: Debug data pipeline failures and data quality issues
---

When debugging a data pipeline failure:

1. **Identify the failure point**: Check orchestrator logs (Airflow UI, Dagster UI). Find the exact task that failed. Read the full error message and stack trace.
2. **Check common causes**:
   - Schema changes in source systems (new/removed/renamed columns)
   - Data volume spikes exceeding memory or timeout limits
   - Source system downtime or API rate limiting
   - Permission changes on source or target systems
   - Infrastructure issues (disk full, network timeouts)
3. **Inspect the data**: Query the source and target tables around the failure time. Check row counts, null rates, and value distributions. Compare with a known-good run.
4. **Reproduce locally**: Run the failing transformation on a sample of the problematic data. Use a debugger or add logging to trace the exact row/value causing the issue.
5. **Fix and validate**:
   - Fix the root cause (not just the symptom)
   - Add a data quality check that would catch this issue in the future
   - Backfill affected data if needed
   - Update monitoring/alerting if the failure was not caught quickly

**Data quality investigation**:
- Check row counts vs expected (compare with previous runs)
- Check null rates per column (sudden spike = problem)
- Check value distributions (min, max, distinct count, mean)
- Check for duplicates on primary/natural keys
- Check referential integrity across tables
`,
    });
  }

  if (projectType === 'databricks') {
    files.push({
      path: 'skills/project/spark-optimize.md',
      content: `---
name: spark-optimize
description: Spark job optimization for partitioning, caching, and joins
---

When optimizing Spark jobs on Databricks:

**Partitioning**:
- Partition tables by the most common filter column (usually date)
- Aim for partition files between 128MB-1GB each
- Use \`OPTIMIZE\` with Z-ORDER for columns frequently used in filters and joins
- Avoid over-partitioning (thousands of tiny files = slow reads)

**Shuffle optimization**:
- Use broadcast joins when one table is < 100MB: \`broadcast(small_df)\`
- Set \`spark.sql.shuffle.partitions\` based on data size (default 200 is often wrong)
- Use \`repartition()\` before writes, \`coalesce()\` to reduce partitions without full shuffle
- Avoid UDFs when possible — use built-in Spark functions (10-100x faster)

**Caching**:
- Cache DataFrames that are used multiple times: \`df.cache()\` or \`df.persist()\`
- Unpersist when done to free cluster memory
- Use Delta caching on Databricks for automatic disk-based caching

**Memory and execution**:
- Monitor the Spark UI: check for skewed tasks, spill to disk, and failed stages
- Fix data skew with salting or adaptive query execution (AQE)
- Set \`spark.sql.adaptive.enabled=true\` for automatic optimization
- Use \`explain()\` to inspect query plans before running expensive jobs

**Writing**:
- Write as Delta format with \`mode("overwrite")\` or merge for upserts
- Use \`OPTIMIZE\` after large writes to compact small files
- Set auto-optimization: \`delta.autoOptimize.optimizeWrite=true\`
`,
    });

    files.push({
      path: 'skills/project/notebook-review.md',
      content: `---
name: notebook-review
description: Databricks notebook code quality review checklist
---

When reviewing Databricks notebooks:

**Structure**:
- Does the notebook have a clear purpose stated in a markdown header?
- Is it organized into logical sections with markdown headers?
- Are parameters defined at the top (using dbutils.widgets or notebook parameters)?
- Is the notebook idempotent — can it be re-run safely?

**Code quality**:
- Are SQL queries formatted and readable (not one-liners)?
- Is PySpark code using built-in functions instead of UDFs?
- Are magic commands (%sql, %python) used appropriately?
- Is there any hardcoded data (dates, paths, table names) that should be parameterized?

**Data handling**:
- Are temporary views or tables cleaned up at the end?
- Is the output table written to the correct catalog/schema?
- Are write modes appropriate (append vs overwrite vs merge)?
- Is schema evolution handled (\`mergeSchema\` option where needed)?

**Production readiness**:
- Can this notebook run as a Databricks job without manual intervention?
- Are all dependencies declared (cluster libraries or %pip install)?
- Is there error handling for expected failure modes?
- Are results logged or written to a table (not just displayed)?

Flag notebooks that mix exploration and production logic — these should be split.
`,
    });
  }

  if (projectType === 'snowflake') {
    files.push({
      path: 'skills/project/query-optimize.md',
      content: `---
name: query-optimize
description: Snowflake query optimization using query profile and best practices
---

When optimizing Snowflake queries:

1. **Query Profile**: Open the query profile in the Snowflake UI. Look for:
   - Nodes with high percentage of total time (bottlenecks)
   - Spillage to local or remote storage (need larger warehouse)
   - Pruning statistics (are partitions being pruered effectively?)
   - Exploding joins (unexpected row multiplication)

2. **Clustering**:
   - Cluster large tables (> 1TB) on frequently filtered columns
   - Use \`SYSTEM$CLUSTERING_INFORMATION('table')\` to check clustering quality
   - Re-cluster after large data loads

3. **Warehouse sizing**:
   - Start with X-Small, scale up only when queries spill to disk
   - Use auto-suspend (1 min for dev, 5 min for prod)
   - Use multi-cluster warehouses for concurrent query workloads
   - Separate warehouses for ETL and analytics workloads

4. **Query patterns**:
   - Avoid SELECT * — specify only needed columns (columnar storage benefits)
   - Use approximate functions for analytics: APPROX_COUNT_DISTINCT, APPROX_PERCENTILE
   - Replace correlated subqueries with JOINs or window functions
   - Use QUALIFY instead of subqueries for window function filtering
   - Materialize CTEs used multiple times into temporary tables

5. **Cost control**:
   - Set resource monitors with credit quotas and alerts
   - Review query history for expensive queries weekly
   - Use result caching — identical queries within 24h are free
`,
    });

    files.push({
      path: 'skills/project/dbt-test.md',
      content: `---
name: dbt-test
description: dbt testing strategy for Snowflake with schema tests and freshness
---

When writing dbt tests for Snowflake models:

**Schema tests (in schema.yml)**:
- \`unique\` and \`not_null\` on every primary key
- \`accepted_values\` for status, type, and category columns
- \`relationships\` for foreign key integrity (e.g., order.customer_id references customers.id)

**Custom data tests (in tests/)**:
- Write SQL tests that return rows when the assertion FAILS (0 rows = pass)
- Test business rules: "revenue should never be negative", "end_date >= start_date"
- Test completeness: "no gaps in date spine", "all expected sources present"
- Test freshness: verify max(updated_at) is within expected window

**Source freshness**:
- Define freshness in sources.yml: \`warn_after: {count: 12, period: hour}\`
- Run \`dbt source freshness\` on schedule before transformation runs
- Block downstream runs if sources are stale

**Testing strategy by layer**:
- Staging: unique, not_null, accepted_values, relationships to source
- Intermediate: business rule tests, row count sanity checks
- Marts: all of the above plus cross-model consistency tests

**Running tests**:
- \`dbt test\` — run all tests
- \`dbt test --select model_name\` — test a specific model
- \`dbt test --select tag:critical\` — run only critical tests
- Add tests to CI pipeline — PRs must pass tests to merge

Tag critical tests and run them in CI. Run full test suite daily.
`,
    });
  }

  if (projectType === 'aws-cdk') {
    files.push({
      path: 'skills/project/cdk-construct.md',
      content: `---
name: cdk-construct
description: AWS CDK construct patterns for L2/L3 and custom constructs
---

When building AWS CDK constructs:

**L2 constructs (preferred)**:
- Use L2 constructs (e.g., \`s3.Bucket\`, \`lambda.Function\`) over L1 (\`CfnBucket\`)
- L2 constructs provide sensible defaults, helper methods, and grant() for IAM
- Only drop to L1 when L2 does not expose a needed CloudFormation property

**Custom L3 constructs**:
- Create L3 constructs for opinionated, reusable patterns (e.g., "API + Lambda + DynamoDB")
- Extend \`Construct\` class, accept a well-typed props interface
- Expose only what consumers need — hide internal resources
- Add sensible defaults but allow overrides via props

**Patterns**:
- Use \`grant*()\` methods for IAM instead of manually creating policies
- Use \`addEnvironment()\` on Lambda instead of passing env in props
- Use \`Stack.of(this).region\` and \`Stack.of(this).account\` for dynamic references
- Use \`RemovalPolicy.RETAIN\` for stateful resources (databases, S3 buckets)
- Use \`Tags.of(construct).add()\` for consistent tagging

**Testing**:
- Use \`assertions.Template.fromStack(stack)\` for snapshot and fine-grained tests
- Test that critical resources exist with expected properties
- Test IAM permissions are correctly scoped (no wildcards)
- Test that removal policies are set correctly for stateful resources

**Structure**: One construct per file in \`lib/constructs/\`. One stack per file in \`lib/\`.
`,
    });

    files.push({
      path: 'skills/project/iam-review.md',
      content: `---
name: iam-review
description: AWS IAM policy review for least privilege and security
---

When reviewing IAM policies in CDK, CloudFormation, or Terraform:

**Least privilege checklist**:
- Are actions scoped to specific services and operations (no \`*\` actions)?
- Are resources scoped to specific ARNs (no \`Resource: "*"\`)?
- Are conditions used to further restrict access (IP, time, MFA, tags)?
- Is \`iam:PassRole\` restricted to specific role ARNs?

**Common anti-patterns to flag**:
- \`Effect: Allow, Action: "*", Resource: "*"\` — full admin access
- \`s3:*\` on all buckets — should be specific bucket + specific actions
- Missing \`Condition\` blocks on sensitive actions (sts:AssumeRole, kms:Decrypt)
- Service roles with more permissions than the service needs

**CDK-specific**:
- Prefer \`bucket.grantRead(lambda)\` over manually creating IAM policies
- Use \`iam.PolicyStatement\` with explicit actions and resources
- Avoid \`.grantFullAccess()\` in production — use specific grants
- Review synthesized CloudFormation for auto-generated policies

**Review process**:
1. List all IAM roles, policies, and trust relationships in the change
2. For each policy: verify actions, resources, and conditions are minimally scoped
3. Check trust relationships: who can assume this role?
4. Check for privilege escalation paths (iam:CreateRole, iam:AttachPolicy, lambda:CreateFunction)
5. Verify no inline policies on users — use groups or roles

Flag any wildcard permissions as MUST FIX.
`,
    });
  }

  if (projectType === 'gcp-terraform') {
    files.push({
      path: 'skills/project/terraform-module.md',
      content: `---
name: terraform-module
description: Terraform module design, state management, and best practices
---

When creating or reviewing Terraform modules:

**Module design**:
- One module per logical resource group (e.g., networking, compute, database)
- Define clear input variables with descriptions, types, and defaults
- Define outputs for values other modules or the root need
- Use \`validation\` blocks on variables for input constraints
- Include a README with usage examples

**State management**:
- Use remote state backend (GCS) with state locking enabled
- Separate state files per environment (dev, staging, prod)
- Use \`terraform_remote_state\` data source sparingly — prefer passing outputs as variables
- Never manually edit state files — use \`terraform state\` commands

**Structure**:
- \`main.tf\` — primary resources
- \`variables.tf\` — all input variables
- \`outputs.tf\` — all outputs
- \`versions.tf\` — provider and terraform version constraints
- \`locals.tf\` — computed local values

**Best practices**:
- Pin provider versions: \`required_providers { google = { version = "~> 5.0" } }\`
- Use \`for_each\` over \`count\` for resources that need stable identity
- Use \`lifecycle { prevent_destroy = true }\` for critical resources
- Tag all resources with \`labels\` for cost tracking
- Run \`terraform plan\` and review before every apply — automate in CI
`,
    });
  }

  if (projectType === 'azure-infra') {
    files.push({
      path: 'skills/project/bicep-module.md',
      content: `---
name: bicep-module
description: Azure Bicep module patterns and what-if deployment validation
---

When creating or reviewing Bicep templates:

**Module design**:
- One module per logical resource group (e.g., networking, app-service, database)
- Use typed parameters with \`@description\`, \`@minLength\`, \`@allowed\` decorators
- Define outputs for resource IDs, endpoints, and connection strings needed by other modules
- Use parameter files per environment: \`dev.parameters.json\`, \`prod.parameters.json\`

**Patterns**:
- Use \`existing\` keyword to reference pre-existing resources
- Use \`dependsOn\` only when Bicep cannot infer the dependency (rare)
- Use conditional deployment: \`resource ... = if (deployRedis) { ... }\`
- Use loops: \`resource ... = [for item in list: { ... }]\`
- Use \`@secure()\` decorator for passwords and secrets

**Validation**:
- Always run \`az bicep lint\` before deploying
- Use \`az deployment group what-if\` to preview changes before applying
- Review the what-if output for unexpected deletions or modifications
- Test in a non-production subscription first

**Security**:
- Store secrets in Key Vault, reference them in Bicep with \`getSecret()\`
- Enable managed identity over service principals where possible
- Use private endpoints for PaaS services
- Enable diagnostic settings for all resources

**Naming**: Use a consistent naming convention: \`{resourceType}-{workload}-{environment}-{region}-{instance}\`
`,
    });
  }

  if (projectType === 'go-api') {
    files.push({
      path: 'skills/project/go-patterns.md',
      content: `---
name: go-patterns
description: Go error handling, interfaces, concurrency, and API patterns
---

When writing Go API code, follow these patterns:

**Error handling**:
- Always check returned errors — never use \`_\` for error values
- Wrap errors with context: \`fmt.Errorf("failed to create user: %w", err)\`
- Use custom error types for domain errors: \`type NotFoundError struct { ... }\`
- Use \`errors.Is()\` and \`errors.As()\` for error checking (not string matching)
- Return errors, don't panic — panics are for truly unrecoverable states

**Interfaces**:
- Define interfaces where they are consumed, not where they are implemented
- Keep interfaces small (1-3 methods) — prefer composition over large interfaces
- Use interfaces for dependency injection in constructors
- Name single-method interfaces with -er suffix: Reader, Writer, Storer

**Concurrency**:
- Use goroutines + channels for concurrent work, or \`errgroup\` for structured concurrency
- Always pass \`context.Context\` as the first parameter for cancellation and timeouts
- Use \`sync.Mutex\` for protecting shared state — keep critical sections small
- Never start goroutines that cannot be stopped — use context cancellation

**HTTP handlers**:
- Parse and validate input at the handler level — pass clean data to service layer
- Use middleware for cross-cutting concerns (logging, auth, CORS, rate limiting)
- Return structured JSON errors with appropriate HTTP status codes
- Use \`http.NewServeMux()\` (Go 1.22+) or Chi/Gin for routing

**Testing**:
- Use table-driven tests for multiple scenarios
- Use \`httptest.NewRecorder()\` for testing handlers without a server
- Mock dependencies with interfaces, not monkey-patching
`,
    });
  }

  if (projectType === 'rust-cli') {
    files.push({
      path: 'skills/project/rust-patterns.md',
      content: `---
name: rust-patterns
description: Rust ownership, error handling, and CLI patterns
---

When writing Rust CLI code, follow these patterns:

**Error handling**:
- Define a custom error enum with \`thiserror\` for library code
- Use \`anyhow::Result\` in application code (main, CLI handlers) for convenience
- Use \`?\` operator to propagate errors — add context with \`.context("message")\`
- Never use \`.unwrap()\` in production code — use \`.expect("reason")\` only when you can prove it won't panic

**Ownership and lifetimes**:
- Accept \`&str\` in function parameters, return \`String\` when creating new strings
- Use \`Clone\` sparingly — prefer borrowing. Profile before optimizing.
- Use \`Cow<'_, str>\` when a function sometimes borrows and sometimes owns
- Avoid lifetime annotations unless the compiler requires them — keep lifetimes simple

**CLI design (clap)**:
- Use derive macros: \`#[derive(Parser)]\` on your args struct
- Group related args into subcommands with \`#[command(subcommand)]\`
- Add \`#[arg(short, long, help = "...")]\` for all arguments
- Validate arguments in the parsing phase, not later

**Project structure**:
- \`src/main.rs\`: Parse args, set up logging, call into library
- \`src/lib.rs\`: Core logic as a library (testable without CLI)
- \`src/commands/\`: One module per subcommand
- Keep \`main()\` thin — it should only wire things together

**Testing**:
- Unit test library functions with \`#[cfg(test)]\` modules
- Integration test the CLI with \`assert_cmd\` and \`predicates\`
- Use \`tempfile\` for tests that need filesystem access
`,
    });
  }

  if (projectType === 'django') {
    files.push({
      path: 'skills/project/django-patterns.md',
      content: `---
name: django-patterns
description: Django models, views, and DRF serializer patterns
---

When building with Django and Django REST Framework:

**Models**:
- Add \`__str__\` and \`class Meta\` (ordering, verbose_name) to every model
- Use model managers for common queries: \`objects.active()\`, \`objects.published()\`
- Add database indexes on fields used in filters and ordering
- Use \`get_absolute_url()\` for model instances that have a detail view
- Never put business logic in views — use model methods or service functions

**Views (DRF)**:
- Use ViewSets for standard CRUD operations
- Use \`@action\` decorator for custom endpoints on a ViewSet
- Use \`APIView\` for non-CRUD endpoints that don't fit the ViewSet pattern
- Always set \`permission_classes\` on every view — never rely on global defaults alone

**Serializers**:
- Use \`ModelSerializer\` for straightforward model serialization
- Override \`validate_<field>()\` for field-level validation
- Override \`validate()\` for cross-field validation
- Use \`SerializerMethodField\` for computed read-only fields
- Use separate serializers for list vs detail vs create vs update

**Queries**:
- Use \`select_related()\` for ForeignKey/OneToOne (SQL JOIN)
- Use \`prefetch_related()\` for ManyToMany/reverse ForeignKey (separate query)
- Use \`only()\` or \`defer()\` to limit loaded fields on large models
- Use \`Q\` objects for complex filters, \`F\` expressions for database-level computation

**Testing**: Use \`APIClient\` for API tests, \`baker.make()\` (model_bakery) for test data.
`,
    });
  }

  if (projectType === 'react-native') {
    files.push({
      path: 'skills/project/rn-patterns.md',
      content: `---
name: rn-patterns
description: React Native navigation, native modules, and performance patterns
---

When building with React Native (Expo):

**Navigation (React Navigation)**:
- Define a typed navigation tree with \`ParamList\` types for every navigator
- Use native stack navigator (\`@react-navigation/native-stack\`) for best performance
- Use tab navigator for main app sections, stack navigator within each tab
- Handle deep linking by defining linking config upfront
- Persist navigation state for development (not production)

**Performance**:
- Use \`FlatList\` (not ScrollView) for long lists — set \`keyExtractor\` and \`getItemLayout\`
- Avoid inline functions in render — use \`useCallback\` for list item callbacks
- Use \`React.memo\` for list item components
- Avoid large images — resize and cache with \`expo-image\`
- Monitor with React DevTools Profiler and Flipper

**Platform-specific code**:
- Use \`.ios.tsx\` / \`.android.tsx\` file extensions for platform-specific components
- Use \`Platform.select()\` for small platform differences in styles
- Test on both platforms regularly — do not develop on only one

**State and data**:
- Use \`@tanstack/react-query\` for server state (API data)
- Use Zustand or Jotai for client state shared across screens
- Use \`expo-secure-store\` for sensitive data (tokens), \`AsyncStorage\` for non-sensitive preferences

**Common pitfalls**:
- Always handle keyboard overlap: use \`KeyboardAvoidingView\` or \`react-native-keyboard-aware-scroll-view\`
- Handle safe areas with \`SafeAreaView\` from \`react-native-safe-area-context\`
- Test on physical devices, not just simulators — performance differs significantly
`,
    });
  }

  if (projectType === 'python') {
    files.push({
      path: 'skills/project/fastapi-patterns.md',
      content: `---
name: fastapi-patterns
description: FastAPI dependency injection, middleware, and async patterns
---

When building with FastAPI:

**Dependency injection**:
- Use \`Depends()\` for shared logic: auth, database sessions, config, pagination
- Define dependencies as functions or classes with \`__call__\`
- Chain dependencies: a route can depend on something that depends on something else
- Use \`yield\` dependencies for setup/teardown (e.g., database sessions)

**Request validation**:
- Use Pydantic models for request bodies (\`Body\`), query params (\`Query\`), and path params
- Add field validators with \`@field_validator\` for custom validation logic
- Return 422 automatically for validation errors (FastAPI handles this)
- Use separate Pydantic models for create, update, and response

**Middleware and exception handling**:
- Add CORS middleware for frontend integration
- Create custom exception handlers: \`@app.exception_handler(NotFoundError)\`
- Use middleware for logging, request ID injection, and timing
- Structure: middleware runs for every request, dependencies run per-route

**Async**:
- Use \`async def\` for routes that call async I/O (databases, HTTP clients)
- Use \`def\` (sync) for CPU-bound routes — FastAPI runs them in a thread pool
- Use \`httpx.AsyncClient\` for async HTTP calls (not \`requests\`)
- Use async database drivers: \`asyncpg\`, \`databases\`, or SQLAlchemy async

**Project structure**:
- \`app/main.py\`: FastAPI app, middleware, routers
- \`app/routers/\`: Route handlers grouped by domain
- \`app/services/\`: Business logic
- \`app/models/\`: Pydantic schemas and ORM models
- \`app/dependencies.py\`: Shared dependencies
`,
    });
  }

  if (projectType === 'nodejs') {
    files.push({
      path: 'skills/project/express-patterns.md',
      content: `---
name: express-patterns
description: Express.js middleware chain, error handling, and security patterns
---

When building with Express.js:

**Middleware chain**:
- Order matters: security middleware first, then parsing, then auth, then routes, then error handler
- Use \`helmet()\` for security headers, \`cors()\` for CORS, \`express.json()\` for body parsing
- Create reusable middleware for auth, validation, rate limiting, and logging
- Use \`express.Router()\` to organize routes into modular files

**Error handling**:
- Create a central error handler middleware: \`(err, req, res, next) => { ... }\`
- Define custom error classes: \`class AppError extends Error { statusCode, code }\`
- Wrap async route handlers to catch promise rejections: \`asyncHandler(fn)\`
- Never expose stack traces in production — log them, return a generic message
- Return consistent error shape: \`{ error: { code, message, details } }\`

**Security**:
- Validate all input with Zod or Joi at the route handler level
- Use parameterized queries — never concatenate user input into SQL
- Set rate limiting on auth endpoints and expensive operations
- Use \`express-rate-limit\` with different limits per endpoint category
- Sanitize user input before logging (prevent log injection)

**Structure**:
- \`src/routes/\`: Route definitions (thin — delegate to controllers)
- \`src/controllers/\`: Request handling, validation, response formatting
- \`src/services/\`: Business logic (framework-agnostic, testable)
- \`src/middleware/\`: Reusable middleware functions
- \`src/models/\`: Database models and types

**Testing**: Use \`supertest\` for integration tests, mock services for unit tests.
`,
    });
  }

  return files;
}

function generateFeatureSkills(features: Feature[], _projectType: ProjectType): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (features.includes('mlops')) {
    files.push({
      path: 'skills/feature/experiment-track.md',
      content: `---
name: experiment-track
description: MLflow/W&B experiment logging, comparison, and model registry
---

When setting up or using experiment tracking:

**Logging**:
- Log at the start of every run: git SHA, branch, dataset version, all hyperparameters
- Log during training: metrics per epoch (loss, accuracy, etc.), learning rate schedule
- Log at the end: final metrics, model artifacts, confusion matrix, feature importance plot
- Use tags to categorize runs: \`mlflow.set_tag("type", "baseline")\`

**Comparison**:
- Compare runs using the tracking UI — filter by tag, sort by metric
- Create comparison charts: metric vs hyperparameter scatter plots
- Track the best run per experiment with a "champion" tag

**Model registry**:
- Register models that pass evaluation thresholds
- Use stages: Staging -> Production -> Archived
- Include metadata: training dataset hash, evaluation metrics, author, approval status
- Never promote to Production without a review

**Reproducibility checklist**:
- [ ] Random seeds logged and set
- [ ] Dataset version tracked (DVC, hash, or snapshot ID)
- [ ] Environment captured (pip freeze, conda export)
- [ ] Git SHA recorded
- [ ] Full config/hyperparameters logged
- [ ] Model artifact saved with the run

Use \`mlflow.autolog()\` for automatic logging with supported frameworks (sklearn, pytorch, etc.).
`,
    });
  }

  if (features.includes('data-pipeline')) {
    files.push({
      path: 'skills/feature/data-quality.md',
      content: `---
name: data-quality
description: Data quality checks with great_expectations, dbt tests, and schema validation
---

When implementing data quality checks:

**Schema validation**:
- Validate column names, types, and nullability at pipeline entry points
- Use Pydantic, pandera, or great_expectations for schema enforcement
- Fail fast on schema violations — do not propagate bad data downstream

**Statistical checks**:
- Row count within expected range (compare with previous run, allow 10-20% variance)
- Null rate per column within thresholds
- Value distributions within expected bounds (min, max, mean, stddev)
- Unique constraint on primary keys and natural keys
- Referential integrity across related tables

**dbt tests**:
- Built-in: \`unique\`, \`not_null\`, \`accepted_values\`, \`relationships\`
- Custom SQL tests in \`tests/\` directory for business rules
- Use \`dbt-expectations\` package for advanced statistical tests
- Run \`dbt test\` after every \`dbt run\` — never skip

**great_expectations**:
- Define expectation suites per dataset
- Run validations in pipeline with checkpoints
- Store results in a data docs site for visibility
- Use profiling to auto-generate initial expectations, then refine

**Alerting**:
- Alert immediately on critical failures (primary key duplicates, schema changes)
- Alert on warnings (row count anomaly, high null rate) with context
- Include: table name, check name, expected vs actual values, run timestamp
`,
    });
  }

  if (features.includes('monitoring')) {
    files.push({
      path: 'skills/feature/alert-design.md',
      content: `---
name: alert-design
description: SLO-based alerting design with error budgets and runbooks
---

When designing alerts for a service:

**SLO-based approach**:
1. Define SLIs (Service Level Indicators): availability, latency p99, error rate, throughput
2. Set SLOs (Service Level Objectives): "99.9% of requests succeed within 500ms"
3. Calculate error budget: 0.1% of requests can fail per month (43 minutes of downtime)
4. Alert on error budget burn rate, not absolute thresholds

**Alert design rules**:
- Every alert must have a runbook linked in the alert description
- Every alert must be actionable — if no human action is needed, it is a log, not an alert
- Use severity levels: PAGE (immediate action), TICKET (fix within hours), WARN (investigate when convenient)
- Set appropriate windows: short window (5 min) for burn rate, long window (1 hour) for trends

**What to alert on**:
- Error budget burn rate > 10x normal (fast burn — page)
- Error budget burn rate > 2x normal for > 1 hour (slow burn — ticket)
- Dependency failures (database down, external API errors)
- Resource saturation (CPU > 80%, memory > 85%, disk > 90%)

**What NOT to alert on**:
- Single transient errors (use rate, not count)
- Expected scaling events
- Informational metrics (log these, don't alert)

**Runbook template for each alert**:
- What this alert means
- Likely causes (ranked by probability)
- Diagnostic steps (commands, dashboards, logs to check)
- Remediation steps
- Escalation path
`,
    });
  }

  if (features.includes('security')) {
    files.push({
      path: 'skills/feature/security-audit.md',
      content: `---
name: security-audit
description: Security audit checklist with dependency scanning and secrets checks
---

When performing a security audit on the codebase:

**Dependency scanning**:
- Run \`npm audit\` / \`pip-audit\` / \`cargo audit\` for known vulnerabilities
- Check for outdated dependencies with known CVEs
- Review new dependencies: maintainer reputation, download count, last update date
- Flag any dependency with critical or high severity CVEs as MUST FIX

**Secrets detection**:
- Scan for hardcoded secrets: API keys, passwords, tokens, private keys
- Check all config files, environment files, and test fixtures
- Verify .gitignore includes: .env, *.pem, *.key, credentials.json
- Check git history for accidentally committed secrets (use trufflehog or gitleaks)

**SAST (Static Analysis)**:
- Check for SQL injection: any string concatenation in queries
- Check for XSS: unescaped user input in HTML/templates
- Check for path traversal: user input in file paths
- Check for insecure deserialization: pickle.loads, eval, exec on user data
- Check for SSRF: user-controlled URLs in server-side requests

**Authentication and authorization**:
- Verify all endpoints have appropriate auth checks
- Check for broken access control (can user A access user B's data?)
- Verify password hashing uses bcrypt/argon2 (not MD5/SHA1)
- Check session management: secure cookies, proper expiry, invalidation on logout

**Output**: Categorize findings as CRITICAL, HIGH, MEDIUM, LOW. Include remediation steps for each.
`,
    });
  }

  if (features.includes('ci-cd')) {
    files.push({
      path: 'skills/feature/pipeline-design.md',
      content: `---
name: pipeline-design
description: CI/CD pipeline design with stages, parallelism, and quality gates
---

When designing or reviewing a CI/CD pipeline:

**Stage ordering** (run in this order):
1. **Install**: Install dependencies (cache aggressively — use lockfile hash as cache key)
2. **Lint + Type-check + Format** (parallel): Fast static checks, fail fast
3. **Unit tests** (parallel with above if fast): Run with coverage reporting
4. **Build**: Compile/bundle the application
5. **Integration tests**: Run against real (or containerized) dependencies
6. **Security scan**: Dependency audit + SAST
7. **Deploy to staging**: Automated deployment to staging environment
8. **E2E tests**: Run against staging
9. **Deploy to production**: Manual approval gate, then automated deployment

**Parallelism**:
- Run independent stages in parallel (lint, test, type-check)
- Use matrix builds for multi-platform/multi-version testing
- Split large test suites across parallel runners

**Caching**:
- Cache: node_modules (key: lockfile hash), pip cache, build artifacts
- Use layer caching for Docker builds
- Cache test fixtures and large datasets

**Quality gates** (block merge if any fail):
- All tests pass
- No critical or high security vulnerabilities
- Code coverage does not decrease
- Linting passes with zero warnings
- Build succeeds

**Pipeline as code**:
- Store pipeline config in the repo (GitHub Actions, Jenkinsfile)
- Use reusable workflow templates for common patterns
- Pin action versions to specific SHAs (not tags) for security
`,
    });
  }

  if (features.includes('containerization')) {
    files.push({
      path: 'skills/feature/dockerfile-review.md',
      content: `---
name: dockerfile-review
description: Dockerfile review for multi-stage builds, security, and optimization
---

When reviewing or writing Dockerfiles:

**Multi-stage builds**:
- Stage 1 (builder): Install dependencies, compile code, run tests
- Stage 2 (production): Copy only built artifacts, minimal base image
- Use specific base image tags (not \`latest\`): \`node:20-alpine\`, \`python:3.12-slim\`

**Security**:
- Run as non-root: \`RUN adduser --disabled-password appuser\` then \`USER appuser\`
- Do not install unnecessary packages (no curl, wget, vim in production)
- Do not copy secrets into the image — use runtime environment variables or secret mounts
- Scan the built image with Trivy or Snyk before pushing to registry

**Optimization**:
- Order layers by change frequency: OS packages (rare) -> dependencies (occasional) -> app code (frequent)
- Copy package manifest first, install deps, THEN copy source code (maximizes layer cache)
- Use \`.dockerignore\` to exclude: .git, node_modules, .env, test files, documentation
- Minimize layer count: combine related RUN commands with \`&&\`
- Set \`HEALTHCHECK\` instruction for container orchestrators

**Checklist**:
- [ ] Base image is pinned to specific version
- [ ] Multi-stage build separates build and runtime
- [ ] Runs as non-root user
- [ ] .dockerignore excludes unnecessary files
- [ ] No secrets baked into the image
- [ ] HEALTHCHECK defined
- [ ] Resource limits documented (for docker-compose or K8s)
`,
    });
  }

  if (features.includes('documentation')) {
    files.push({
      path: 'skills/feature/adr-write.md',
      content: `---
name: adr-write
description: Guide for when and how to write Architecture Decision Records
---

When deciding whether and how to write an ADR:

**When to write an ADR**:
- Choosing a database, framework, or major library
- Changing the project structure or deployment strategy
- Adding a new external service or dependency
- Making a decision you expect someone will question later
- Any decision that is difficult, expensive, or impossible to reverse

**When NOT to write an ADR**:
- Routine code style decisions (covered by linting rules)
- Bug fixes or minor refactors
- Decisions already covered by an existing ADR

**ADR format** (save in \`docs/adr/NNNN-short-title.md\`):

\`\`\`
# NNNN. Short Title

Date: YYYY-MM-DD
Status: Proposed | Accepted | Deprecated | Superseded by NNNN

## Context
[What is the situation? What problem needs a decision?]

## Decision
[What did we decide? State clearly in one sentence, then elaborate.]

## Alternatives Considered
[What else did we consider? Why did we reject it?]

## Consequences
[What are the positive, negative, and neutral effects of this decision?]
\`\`\`

Number ADRs sequentially. Never delete an ADR — mark it as Deprecated or Superseded. Keep ADRs concise (1 page max).
`,
    });
  }

  return files;
}

function generateSynergySkills(features: Feature[], projectType: ProjectType, role: Role): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // ml-python + mlops
  if (projectType === 'ml-python' && features.includes('mlops')) {
    files.push({
      path: 'skills/synergy/ml-deploy-checklist.md',
      content: `---
name: ml-deploy-checklist
description: Model deployment readiness checklist for ML projects with MLOps
---

Before deploying a model to production, verify every item:

**Model quality**:
- [ ] Evaluated on held-out test set (never used during training or tuning)
- [ ] Performance meets or exceeds acceptance threshold on primary metric
- [ ] Guardrail metrics checked (latency, fairness, calibration)
- [ ] Compared against current production model (if exists) — must be better
- [ ] Error analysis completed — understand where the model fails

**Reproducibility**:
- [ ] Training code, config, and dataset version linked in experiment tracker
- [ ] Random seeds set and recorded
- [ ] Model can be retrained from scratch and produce similar results

**Serving**:
- [ ] Model artifact registered in model registry with version and metadata
- [ ] Inference pipeline tested end-to-end (preprocessing -> predict -> postprocess)
- [ ] Latency measured under expected load (p50, p95, p99)
- [ ] Memory and CPU requirements documented

**Monitoring**:
- [ ] Prediction distribution logging enabled (detect drift)
- [ ] Input feature distribution logging enabled (detect data drift)
- [ ] Alerts set for: prediction anomalies, latency spikes, error rate increase
- [ ] Dashboard created for model performance metrics

**Rollback**:
- [ ] Previous model version tagged and deployable
- [ ] Rollback procedure documented and tested
- [ ] A/B test or shadow mode configured for gradual rollout
`,
    });
  }

  // data-engineering + monitoring
  if (projectType === 'data-engineering' && features.includes('monitoring')) {
    files.push({
      path: 'skills/synergy/pipeline-observability.md',
      content: `---
name: pipeline-observability
description: Data pipeline observability with SLAs, freshness, and quality alerts
---

When setting up observability for data pipelines:

**Pipeline SLAs**:
- Define freshness SLAs for each table: "mart_orders must be updated by 8:00 AM UTC daily"
- Monitor pipeline duration trends — alert if a job takes 2x its normal duration
- Track success/failure rates per DAG and per task

**Freshness monitoring**:
- Query max(updated_at) for each critical table on a schedule
- Alert if a table is staler than its SLA (e.g., > 4 hours for hourly pipeline)
- Use dbt source freshness or custom checks
- Dashboard showing freshness status for all tables (green/yellow/red)

**Data quality metrics**:
- Track row counts over time — alert on unexpected drops or spikes (> 20% change)
- Track null rates for important columns — alert on increases
- Track unique constraint violations — should always be zero
- Log data quality check results to a metrics table for historical analysis

**Alerting channels**:
- CRITICAL (page): Pipeline failure that blocks downstream consumers, data loss
- WARNING (Slack/email): SLA at risk, quality anomaly, long-running job
- INFO (dashboard only): Normal completion, minor row count variance

**Dashboard essentials**:
- Pipeline run status timeline (success/fail per run)
- Table freshness overview (all tables, current status)
- Data quality trends (row counts, null rates over time)
- Cost tracking (compute hours, warehouse credits)
`,
    });
  }

  // cloud infra + security
  const cloudProjects: ProjectType[] = ['aws-cdk', 'gcp-terraform', 'azure-infra'];
  if (cloudProjects.includes(projectType) && features.includes('security')) {
    files.push({
      path: 'skills/synergy/iam-audit.md',
      content: `---
name: iam-audit
description: Cloud IAM audit checklist for AWS, GCP, and Azure infrastructure
---

When auditing IAM configuration in cloud infrastructure:

**Principle of least privilege**:
- List all IAM roles/policies/service accounts in the project
- For each: verify actions are scoped to specific resources (no wildcards)
- Check for unused roles/permissions — remove anything not used in 90 days
- Ensure no service accounts have owner/admin level access

**Access patterns**:
- Verify human access uses SSO/federation (not long-lived API keys)
- Verify service-to-service access uses service accounts/roles (not user credentials)
- Check for cross-account or cross-project access — is it intended and documented?
- Verify MFA is enforced for all human accounts with elevated privileges

**Dangerous permissions to flag**:
- iam:* (can create new admin accounts)
- *.* or Action: "*" (full access)
- PassRole/ActAs without resource constraints
- Ability to modify audit logs or security controls

**Automation checks**:
- Use cloud-native tools: AWS IAM Access Analyzer, GCP IAM Recommender, Azure Advisor
- Run Checkov, tfsec, or cfn-lint on IaC for security misconfigurations
- Enable CloudTrail/Cloud Audit Logs/Activity Log and verify they are not tampered with

**Report format**:
- CRITICAL: Wildcard permissions, exposed credentials, missing MFA on admin
- HIGH: Over-provisioned roles, unused service accounts
- MEDIUM: Missing resource constraints, broad network access
- LOW: Naming convention violations, missing tags
`,
    });
  }

  // testing + ci-cd
  if (features.includes('testing') && features.includes('ci-cd')) {
    files.push({
      path: 'skills/synergy/quality-gate.md',
      content: `---
name: quality-gate
description: Automated quality gates in CI for test coverage and code health
---

When defining quality gates in the CI pipeline:

**Gate 1: All tests pass** (BLOCKING)
- Unit tests, integration tests must pass with zero failures
- Flaky tests count as failures — fix or quarantine them
- No skipped tests without a linked issue for re-enabling

**Gate 2: Coverage threshold** (BLOCKING)
- Overall coverage must not decrease from the base branch
- New code must have at least 80% line coverage
- Critical paths (auth, payment, data handling) must have 90%+ coverage
- Use coverage diff tools to show coverage on changed lines specifically

**Gate 3: Static analysis** (BLOCKING)
- Zero linting errors
- Zero type errors
- No new security warnings from SAST tools
- Complexity metrics within threshold (cyclomatic complexity < 15 per function)

**Gate 4: Build health** (BLOCKING)
- Build completes successfully
- Bundle size within limits (if frontend)
- No new deprecated API usage

**Gate 5: Documentation** (WARNING)
- Public API changes have updated docs
- New features have changelog entries
- ADRs written for significant decisions

**Implementation**:
- Configure as required checks on the main branch
- Display results as PR comments with pass/fail badges
- Allow override only with 2 reviewer approvals + comment explaining why
`,
    });
  }

  // data-scientist role + documentation feature
  if (role === 'data-scientist' && features.includes('documentation')) {
    files.push({
      path: 'skills/synergy/model-card.md',
      content: `---
name: model-card
description: Model card template for documenting ML models
---

When creating a model card for a trained model:

**Model details**:
- Model name and version
- Model type (classification, regression, ranking, etc.)
- Framework and architecture (e.g., "XGBoost classifier, 500 trees, max_depth=6")
- Training date and training duration
- Author/team

**Intended use**:
- Primary use case and target users
- Out-of-scope use cases (what this model should NOT be used for)
- Known limitations

**Training data**:
- Dataset description (source, size, date range)
- Feature list with descriptions
- Data preprocessing steps applied
- Known biases in the training data

**Evaluation**:
- Metrics on test set: accuracy, precision, recall, F1, AUC (as applicable)
- Performance by subgroup (gender, age, region) — fairness analysis
- Comparison with baseline and previous model version
- Confusion matrix or error analysis summary

**Ethical considerations**:
- Potential for bias or discrimination
- Privacy implications of input features
- Impact of false positives vs false negatives on users
- Mitigations implemented

**Deployment**:
- Serving infrastructure and latency requirements
- Monitoring and alerting setup
- Retraining schedule
- Rollback procedure

Store model cards alongside model artifacts in the model registry.
`,
    });
  }

  // devops role + containerization feature
  if (role === 'devops' && features.includes('containerization')) {
    files.push({
      path: 'skills/synergy/k8s-deploy.md',
      content: `---
name: k8s-deploy
description: Kubernetes deployment checklist for container workloads
---

When deploying or reviewing Kubernetes manifests:

**Deployment config**:
- [ ] Resource requests AND limits set for CPU and memory on every container
- [ ] Readiness probe defined (determines when pod can receive traffic)
- [ ] Liveness probe defined (determines when pod should be restarted)
- [ ] Startup probe defined for slow-starting containers
- [ ] Rolling update strategy configured with maxSurge and maxUnavailable
- [ ] Pod disruption budget set to maintain availability during node maintenance

**Security**:
- [ ] Runs as non-root: \`securityContext.runAsNonRoot: true\`
- [ ] Read-only root filesystem where possible
- [ ] No privileged containers
- [ ] Network policies restrict ingress/egress to only what is needed
- [ ] Secrets stored in Secret objects (or external secrets operator), not ConfigMaps
- [ ] Service account with minimal RBAC permissions

**Scaling**:
- [ ] HorizontalPodAutoscaler configured with appropriate min/max replicas
- [ ] Metrics server or custom metrics adapter deployed for autoscaling
- [ ] Pod topology spread constraints for high availability across zones

**Observability**:
- [ ] Structured JSON logging to stdout/stderr
- [ ] Prometheus annotations for metrics scraping
- [ ] Labels and annotations for service discovery and debugging

**Checklist before apply**:
- Run \`kubectl diff\` to preview changes
- Verify in a non-production namespace first
- Ensure rollback procedure is documented and tested
`,
    });
  }

  // pm role + testing feature
  if (role === 'pm' && features.includes('testing')) {
    files.push({
      path: 'skills/synergy/acceptance-test.md',
      content: `---
name: acceptance-test
description: Map acceptance criteria to automated test cases
---

When translating acceptance criteria into test cases:

**Process**:
1. Take each user story's acceptance criteria (Given/When/Then format)
2. Map each criterion to one or more test cases
3. Classify each test: automated (unit, integration, E2E) or manual (exploratory, UX)
4. Prioritize: P0 tests must be automated before the story is considered done

**Mapping template**:

| Acceptance Criterion | Test Type | Test Description | Automated? | Priority |
|---|---|---|---|---|
| Given [context], When [action], Then [result] | E2E | Verify [result] after [action] | Yes | P0 |
| Error case: [condition] | Integration | Verify error handling for [condition] | Yes | P1 |
| Edge case: [scenario] | Unit | Test boundary for [scenario] | Yes | P2 |

**Rules**:
- Every "Must Have" acceptance criterion gets at least one automated test
- Error scenarios and edge cases get integration or unit tests
- UX/visual criteria get manual exploratory test sessions
- Performance criteria get load test scripts

**Definition of Done for testing**:
- All P0 tests automated and passing
- All P1 tests automated and passing
- P2 tests documented (automated if time permits)
- Exploratory testing session completed and findings documented
- No open critical or major bugs
`,
    });
  }

  // architect role + security feature
  if (role === 'architect' && features.includes('security')) {
    files.push({
      path: 'skills/synergy/threat-model.md',
      content: `---
name: threat-model
description: STRIDE threat modeling for system architecture review
---

When performing threat modeling on a system design:

**STRIDE framework** — for each component and data flow, evaluate:

- **Spoofing**: Can an attacker pretend to be a legitimate user or service?
  - Mitigation: strong authentication, mutual TLS, API keys with rotation
- **Tampering**: Can data be modified in transit or at rest without detection?
  - Mitigation: input validation, checksums, signed tokens, encryption
- **Repudiation**: Can a user deny performing an action?
  - Mitigation: audit logging, non-repudiation tokens, immutable logs
- **Information Disclosure**: Can sensitive data be accessed by unauthorized parties?
  - Mitigation: encryption at rest and in transit, access controls, data masking
- **Denial of Service**: Can the system be overwhelmed or made unavailable?
  - Mitigation: rate limiting, auto-scaling, circuit breakers, CDN
- **Elevation of Privilege**: Can a user gain access beyond their authorization level?
  - Mitigation: least privilege, RBAC, input validation, secure defaults

**Process**:
1. Draw a data flow diagram (DFD) showing: external entities, processes, data stores, data flows, trust boundaries
2. For each element crossing a trust boundary, apply STRIDE
3. Rate each threat: likelihood (1-3) x impact (1-3) = risk score
4. For risk score >= 4: define mitigation and add to backlog
5. Document accepted risks with justification

**Output**: Threat model document with DFD, threat table (component, threat, STRIDE category, risk score, mitigation, status), and prioritized action items.
`,
    });
  }

  return files;
}

function generateRoleHooks(role: Role, features: Feature[]): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (role === 'qa') {
    files.push({
      path: 'hooks/pre-push-test.sh',
      content: `#!/bin/bash
# Pre-push hook: run full test suite before pushing

RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
NC='\\033[0m'

echo -e "\${YELLOW}Running full test suite before push...\${NC}"

# Detect project type and run appropriate test command
if [ -f "package.json" ]; then
  npm test 2>&1
  TEST_EXIT=$?
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
  python -m pytest 2>&1
  TEST_EXIT=$?
elif [ -f "Cargo.toml" ]; then
  cargo test 2>&1
  TEST_EXIT=$?
elif [ -f "go.mod" ]; then
  go test ./... 2>&1
  TEST_EXIT=$?
else
  echo -e "\${YELLOW}No test framework detected, skipping.\${NC}"
  exit 0
fi

if [ $TEST_EXIT -ne 0 ]; then
  echo -e "\${RED}BLOCKED: Tests failed. Fix failing tests before pushing.\${NC}"
  exit 1
fi

echo -e "\${GREEN}All tests passed. Push allowed.\${NC}"
exit 0
`,
    });
  }

  if (role === 'devops') {
    files.push({
      path: 'hooks/validate-infra.sh',
      content: `#!/bin/bash
# Pre-commit hook: validate infrastructure files before committing

RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
NC='\\033[0m'

echo "Validating infrastructure files..."

ERRORS=0

# Check for Terraform files
TF_FILES=$(git diff --cached --name-only | grep -E '\\.tf$')
if [ -n "$TF_FILES" ]; then
  echo -e "\${YELLOW}Terraform files changed, validating...\${NC}"
  if command -v terraform &> /dev/null; then
    terraform fmt -check -diff . 2>&1
    if [ $? -ne 0 ]; then
      echo -e "\${RED}Terraform formatting check failed. Run 'terraform fmt' to fix.\${NC}"
      ERRORS=$((ERRORS + 1))
    fi
    terraform validate 2>&1
    if [ $? -ne 0 ]; then
      echo -e "\${RED}Terraform validation failed.\${NC}"
      ERRORS=$((ERRORS + 1))
    fi
  else
    echo -e "\${YELLOW}terraform not found, skipping validation.\${NC}"
  fi
fi

# Check for CDK files
CDK_FILES=$(git diff --cached --name-only | grep -E 'lib/.*\\.ts$|bin/.*\\.ts$')
if [ -n "$CDK_FILES" ]; then
  echo -e "\${YELLOW}CDK files changed, running synth check...\${NC}"
  if [ -f "cdk.json" ] && command -v npx &> /dev/null; then
    npx tsc --noEmit 2>&1
    if [ $? -ne 0 ]; then
      echo -e "\${RED}CDK TypeScript compilation failed.\${NC}"
      ERRORS=$((ERRORS + 1))
    fi
  fi
fi

# Check for Bicep files
BICEP_FILES=$(git diff --cached --name-only | grep -E '\\.bicep$')
if [ -n "$BICEP_FILES" ]; then
  echo -e "\${YELLOW}Bicep files changed, linting...\${NC}"
  if command -v az &> /dev/null; then
    for f in $BICEP_FILES; do
      az bicep lint --file "$f" 2>&1
      if [ $? -ne 0 ]; then
        ERRORS=$((ERRORS + 1))
      fi
    done
  fi
fi

if [ $ERRORS -gt 0 ]; then
  echo -e "\${RED}BLOCKED: $ERRORS infrastructure validation error(s) found.\${NC}"
  exit 1
fi

echo -e "\${GREEN}Infrastructure validation passed.\${NC}"
exit 0
`,
    });
  }

  if (features.includes('security')) {
    files.push({
      path: 'hooks/dependency-scan.sh',
      content: `#!/bin/bash
# Pre-commit hook: scan for vulnerable dependencies

RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
NC='\\033[0m'

echo "Scanning dependencies for vulnerabilities..."

CRITICAL=0

# Node.js projects
if [ -f "package-lock.json" ]; then
  echo -e "\${YELLOW}Checking npm dependencies...\${NC}"
  AUDIT_OUTPUT=$(npm audit --json 2>/dev/null)
  CRITICAL_COUNT=$(echo "$AUDIT_OUTPUT" | grep -o '"critical":[0-9]*' | head -1 | grep -o '[0-9]*')
  HIGH_COUNT=$(echo "$AUDIT_OUTPUT" | grep -o '"high":[0-9]*' | head -1 | grep -o '[0-9]*')
  if [ "\${CRITICAL_COUNT:-0}" -gt 0 ] || [ "\${HIGH_COUNT:-0}" -gt 0 ]; then
    echo -e "\${RED}Found \${CRITICAL_COUNT:-0} critical and \${HIGH_COUNT:-0} high vulnerabilities.\${NC}"
    echo "Run 'npm audit' for details and 'npm audit fix' to resolve."
    CRITICAL=1
  fi
fi

# Python projects
if [ -f "requirements.txt" ]; then
  echo -e "\${YELLOW}Checking Python dependencies...\${NC}"
  if command -v pip-audit &> /dev/null; then
    pip-audit -r requirements.txt 2>&1
    if [ $? -ne 0 ]; then
      echo -e "\${RED}Vulnerable Python dependencies found.\${NC}"
      CRITICAL=1
    fi
  else
    echo -e "\${YELLOW}pip-audit not installed, skipping. Install with: pip install pip-audit\${NC}"
  fi
fi

# Rust projects
if [ -f "Cargo.lock" ]; then
  echo -e "\${YELLOW}Checking Rust dependencies...\${NC}"
  if command -v cargo-audit &> /dev/null; then
    cargo audit 2>&1
    if [ $? -ne 0 ]; then
      echo -e "\${RED}Vulnerable Rust dependencies found.\${NC}"
      CRITICAL=1
    fi
  fi
fi

if [ $CRITICAL -gt 0 ]; then
  echo -e "\${RED}BLOCKED: Critical/high dependency vulnerabilities found. Fix before committing.\${NC}"
  exit 1
fi

echo -e "\${GREEN}No critical dependency vulnerabilities found.\${NC}"
exit 0
`,
    });
  }

  if (role === 'data-scientist') {
    files.push({
      path: 'hooks/notebook-clean.sh',
      content: `#!/bin/bash
# Pre-commit hook: strip Jupyter notebook outputs before committing

RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
NC='\\033[0m'

NOTEBOOKS=$(git diff --cached --name-only | grep -E '\\.ipynb$')

if [ -z "$NOTEBOOKS" ]; then
  exit 0
fi

echo "Checking Jupyter notebooks for outputs..."

DIRTY=0
for nb in $NOTEBOOKS; do
  if [ ! -f "$nb" ]; then
    continue
  fi

  # Check if notebook has outputs
  HAS_OUTPUTS=$(python3 -c "
import json, sys
with open('$nb') as f:
    nb = json.load(f)
for cell in nb.get('cells', []):
    if cell.get('cell_type') == 'code' and cell.get('outputs'):
        print('yes')
        sys.exit(0)
    if cell.get('cell_type') == 'code' and cell.get('execution_count') is not None:
        print('yes')
        sys.exit(0)
print('no')
" 2>/dev/null)

  if [ "$HAS_OUTPUTS" = "yes" ]; then
    echo -e "\${YELLOW}Stripping outputs from $nb\${NC}"
    if command -v jupyter &> /dev/null; then
      jupyter nbconvert --ClearOutputPreprocessor.enabled=True --inplace "$nb" 2>/dev/null
      git add "$nb"
    else
      echo -e "\${RED}jupyter not found. Install with: pip install jupyter\${NC}"
      echo -e "\${RED}Or manually clear outputs in $nb before committing.\${NC}"
      DIRTY=1
    fi
  fi
done

if [ $DIRTY -gt 0 ]; then
  echo -e "\${RED}BLOCKED: Notebook outputs could not be stripped automatically.\${NC}"
  exit 1
fi

echo -e "\${GREEN}Notebooks cleaned.\${NC}"
exit 0
`,
    });
  }

  return files;
}

// ---------------------------------------------------------------------------
// MAIN EXPORT — updated to call all generators
// ---------------------------------------------------------------------------

export function generateClaudeCodeFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role,
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // CLAUDE.md — always generated
  files.push({
    path: 'CLAUDE.md',
    content: generateClaudeMd(projectName, projectType, features, role),
  });

  // .env.example — always generated
  files.push({
    path: '.env.example',
    content: generateEnvExample(features, projectType),
  });

  // Core skills — always generated
  files.push({
    path: 'skills/review.md',
    content: generateReviewSkill(projectType, features),
  });

  // Testing skill — if testing feature selected
  if (features.includes('testing')) {
    files.push({
      path: 'skills/test.md',
      content: generateTestSkill(projectType),
    });
  }

  // Git workflow hook — if git-workflow feature selected
  if (features.includes('git-workflow')) {
    files.push({
      path: 'hooks/pre-commit.sh',
      content: generatePreCommitHook(),
    });
  }

  // Role-specific skills
  files.push(...generateRoleSkills(role, projectType));

  // Project-type-specific skills
  files.push(...generateProjectSkills(projectType));

  // Feature-specific skills
  files.push(...generateFeatureSkills(features, projectType));

  // Synergy skills (combination-specific)
  files.push(...generateSynergySkills(features, projectType, role));

  // Role-specific hooks
  files.push(...generateRoleHooks(role, features));

  return files;
}
