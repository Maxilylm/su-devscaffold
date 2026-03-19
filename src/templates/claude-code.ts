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

export function generateClaudeCodeFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role,
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push({
    path: 'CLAUDE.md',
    content: generateClaudeMd(projectName, projectType, features, role),
  });

  files.push({
    path: 'skills/review.md',
    content: generateReviewSkill(projectType, features),
  });

  if (features.includes('testing')) {
    files.push({
      path: 'skills/test.md',
      content: generateTestSkill(projectType),
    });
  }

  if (features.includes('git-workflow')) {
    files.push({
      path: 'hooks/pre-commit.sh',
      content: generatePreCommitHook(),
    });
  }

  files.push({
    path: '.env.example',
    content: generateEnvExample(features, projectType),
  });

  return files;
}
