import type { ProjectType, Feature, Role, GeneratedFile } from './types';

const roleIntros: Record<Role, string> = {
  developer: 'You are assisting a software developer focused on writing clean, maintainable, production-ready code.',
  'data-scientist': 'You are assisting a data scientist focused on experimentation, analysis, and ML model development.',
  devops: 'You are assisting a DevOps/SRE engineer focused on infrastructure, automation, and reliability.',
  pm: 'You are assisting a product manager focused on requirements clarity, acceptance criteria, and specs.',
  qa: 'You are assisting a QA engineer focused on test coverage, edge cases, and quality gates.',
  architect: 'You are assisting a software architect focused on system design, trade-offs, and technical decisions.',
};

function generateCursorrules(projectName: string, projectType: ProjectType, features: Feature[], role: Role): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Cursor Rules`);
  sections.push('');

  // Role context
  sections.push(roleIntros[role]);
  sections.push('');

  // Project context
  if (projectType === 'nextjs') {
    sections.push(`## Project Context
This is a Next.js 15 App Router project using TypeScript strict mode.
- Use Server Components by default; only add "use client" when event handlers, hooks, or browser APIs are needed
- Use the app/ directory structure — NOT pages/
- Prefer server actions for mutations over API routes
- Use next/image for images, next/link for navigation, next/font for fonts
`);
  } else if (projectType === 'vite-react') {
    sections.push(`## Project Context
This is a React + Vite project using TypeScript strict mode.
- Use functional components with hooks — no class components
- Keep components small and focused (< 150 lines)
- Use React.lazy() for route-level code splitting
`);
  } else if (projectType === 'python') {
    sections.push(`## Project Context
This is a Python project using FastAPI/Flask.
- Use type hints on ALL function signatures
- Use Pydantic models for request/response validation
- Follow PEP 8 — enforce with ruff
- Structure: routers/, models/, services/, schemas/
`);
  } else if (projectType === 'nodejs') {
    sections.push(`## Project Context
This is a Node.js Express API using TypeScript strict mode.
- Structure: routes/, controllers/, services/, middleware/, models/
- Use dependency injection for testability
- Handle all async errors with try/catch or error middleware
`);
  } else if (projectType === 'ml-python') {
    sections.push(`## Project Context
This is a Python ML/Data Science project.
- Python 3.12+, scikit-learn, PyTorch/TensorFlow, pandas, jupyter, matplotlib
- Use type hints on all function signatures
- Structure: notebooks/, src/data/, src/models/, src/features/, src/evaluation/
- Reproducibility: pin dependencies, set random seeds, version datasets
`);
  } else if (projectType === 'data-engineering') {
    sections.push(`## Project Context
This is a Data Engineering project.
- Python 3.12+, Apache Airflow, PySpark, dbt, Great Expectations
- Structure: dags/, models/, tests/, macros/, seeds/
- Idempotent pipelines, schema validation, data quality checks
`);
  } else if (projectType === 'django') {
    sections.push(`## Project Context
This is a Django project.
- Python 3.12+, Django 5+, Django REST Framework, PostgreSQL
- Use class-based views for complex logic, function-based for simple endpoints
- Structure: apps/<app_name>/models.py, views.py, serializers.py, urls.py
- Always use migrations; never modify the database manually
`);
  } else if (projectType === 'aws-cdk') {
    sections.push(`## Project Context
This is an AWS CDK infrastructure project.
- TypeScript, AWS CDK v2, CloudFormation, AWS CLI
- Structure: lib/ for stacks, bin/ for app entry, test/ for assertions
- Use L2/L3 constructs over L1 (Cfn*) when available
- Tag all resources, follow least-privilege IAM
`);
  } else if (projectType === 'gcp-terraform') {
    sections.push(`## Project Context
This is a GCP Terraform infrastructure project.
- HCL, Terraform, gcloud CLI, GCP APIs
- Structure: modules/, environments/, variables.tf, outputs.tf
- Use remote state backend, lock state files
- Follow Google Cloud best practices for IAM and networking
`);
  } else if (projectType === 'azure-infra') {
    sections.push(`## Project Context
This is an Azure infrastructure project.
- Bicep, Azure CLI, ARM templates
- Structure: modules/, main.bicep, parameters/
- Use parameter files per environment
- Follow Azure Well-Architected Framework principles
`);
  } else if (projectType === 'databricks') {
    sections.push(`## Project Context
This is a Databricks project.
- PySpark, Delta Lake, Unity Catalog, MLflow, Databricks CLI
- Structure: notebooks/, src/, jobs/, tests/
- Use Delta Lake for all tables, Unity Catalog for governance
- Track experiments with MLflow
`);
  } else if (projectType === 'snowflake') {
    sections.push(`## Project Context
This is a Snowflake project.
- SQL, Snowpark Python, dbt, SnowSQL
- Structure: models/, macros/, tests/, seeds/, snapshots/
- Use dbt for transformations, Snowpark for complex UDFs
- Follow Snowflake cost-optimization practices (warehouse sizing, clustering)
`);
  } else if (projectType === 'react-native') {
    sections.push(`## Project Context
This is a React Native mobile project.
- React Native + Expo, TypeScript, React Navigation
- Structure: src/screens/, src/components/, src/hooks/, src/navigation/
- Use Expo managed workflow unless native modules require bare
- Test on both iOS and Android
`);
  } else if (projectType === 'go-api') {
    sections.push(`## Project Context
This is a Go API project.
- Go 1.22+, Chi/Gin, sqlx, Go modules
- Structure: cmd/, internal/handlers/, internal/services/, internal/models/
- Use standard library where possible; minimize dependencies
- Handle errors explicitly — no panic in production code
`);
  } else if (projectType === 'rust-cli') {
    sections.push(`## Project Context
This is a Rust CLI/service project.
- Rust, Cargo, clap, serde, tokio
- Structure: src/main.rs, src/lib.rs, src/commands/, src/models/
- Use Result<T, E> for error handling — avoid unwrap() in production
- Prefer owned types over lifetimes unless performance-critical
`);
  } else {
    sections.push(`## Project Context
Follow consistent coding conventions throughout the project.
`);
  }

  // Code style
  sections.push(`## Code Style
- Write TypeScript with strict mode — no \`any\` types
- Prefer \`const\` over \`let\`; never use \`var\`
- Use early returns to reduce nesting
- Maximum function length: 40 lines — extract helpers if longer
- Name booleans with is/has/should prefix: \`isLoading\`, \`hasError\`
- Use descriptive variable names — no abbreviations except \`i\`, \`j\` for loop indices
`);

  // Feature-specific rules
  if (features.includes('auth')) {
    sections.push(`## Authentication Rules
- Always validate sessions server-side on protected routes
- Never expose user passwords or tokens in API responses
- Use HTTP-only cookies for session management
- Implement rate limiting on authentication endpoints
`);
  }

  if (features.includes('database')) {
    sections.push(`## Database Rules
- Always use an ORM — no raw SQL unless optimizing specific queries
- Use migrations for all schema changes
- Add indexes for columns used in WHERE and JOIN clauses
- Use transactions for multi-step operations
- Validate all inputs before database operations
`);
  }

  if (features.includes('api')) {
    sections.push(`## API Rules
- Use consistent REST conventions: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Return correct HTTP status codes: 200, 201, 400, 401, 403, 404, 500
- Use a consistent error shape: \`{ error: { code, message, details? } }\`
- Validate all request inputs at the API boundary
- Paginate list endpoints by default
`);
  }

  if (features.includes('testing')) {
    sections.push(`## Testing Rules
- Write tests before implementation (TDD)
- Test naming: \`should [behavior] when [condition]\`
- Structure: Arrange-Act-Assert
- Mock external services at the boundary
- Every bug fix needs a regression test
`);
  }

  if (features.includes('ai-llm')) {
    sections.push(`## AI/LLM Rules
- Always stream responses to the UI
- Set temperature to 0 for deterministic tasks, 0.7+ for creative
- Implement retry with exponential backoff (max 3 retries)
- Always set max_tokens to prevent runaway costs
- Use JSON mode for structured outputs
`);
  }

  if (features.includes('styling')) {
    sections.push(`## Styling Rules
- Use Tailwind utility classes — minimize custom CSS
- Mobile-first responsive design
- Support dark mode with Tailwind's \`dark:\` variant
- Use semantic HTML elements
- Follow consistent spacing scale
`);
  }

  if (features.includes('deployment')) {
    sections.push(`## Deployment Rules
- Use environment variables for all config — never hardcode
- Validate required env vars at startup
- Include health check endpoints
- Use preview deployments for PRs
`);
  }

  if (features.includes('git-workflow')) {
    sections.push(`## Git Rules
- Use conventional commits: feat:, fix:, docs:, refactor:, test:, chore:
- Branch naming: feat/description, fix/description
- Never commit to main directly
- Atomic commits — one logical change per commit
`);
  }

  if (features.includes('mlops')) {
    sections.push(`## MLOps Rules
- Track all experiments with parameters, metrics, and artifacts
- Version datasets and models — never overwrite in place
- Use reproducible training pipelines with pinned dependencies and random seeds
- Automate model validation before deployment (accuracy thresholds, data drift checks)
- Store models in a registry with stage transitions (staging → production)
`);
  }

  if (features.includes('data-pipeline')) {
    sections.push(`## Data Pipeline Rules
- Make all pipelines idempotent — safe to re-run without side effects
- Validate data quality at ingestion and transformation boundaries
- Use schema enforcement and evolution strategies
- Track data lineage end-to-end
- Partition large datasets by date or logical key
`);
  }

  if (features.includes('monitoring')) {
    sections.push(`## Monitoring Rules
- Emit structured logs (JSON) with correlation IDs
- Track key metrics: latency, error rate, throughput, saturation
- Set up alerts for SLO violations, not just threshold breaches
- Use distributed tracing for multi-service architectures
- Dashboard critical paths and business metrics
`);
  }

  if (features.includes('security')) {
    sections.push(`## Security Rules
- Follow OWASP Top 10 mitigations
- Never hardcode secrets — use a secrets manager or environment variables
- Validate and sanitize all user inputs
- Apply least-privilege access for IAM roles and service accounts
- Enable audit logging for sensitive operations
`);
  }

  if (features.includes('ci-cd')) {
    sections.push(`## CI/CD Rules
- Run linting, type checking, and tests on every PR
- Use branch protection rules on main
- Automate deployments to staging on merge, production on release
- Cache dependencies and build artifacts for faster pipelines
- Fail fast — run cheapest checks first
`);
  }

  if (features.includes('containerization')) {
    sections.push(`## Containerization Rules
- Use multi-stage Docker builds to minimize image size
- Pin base image versions — never use \`latest\` in production
- Run containers as non-root users
- Use .dockerignore to exclude unnecessary files
- Define resource limits (CPU/memory) in orchestration configs
`);
  }

  if (features.includes('documentation')) {
    sections.push(`## Documentation Rules
- Write ADRs (Architecture Decision Records) for significant technical choices
- Keep API documentation in sync with implementation (OpenAPI/Swagger)
- Include runbooks for operational procedures
- Document setup instructions in README — new dev should be productive in < 30 minutes
- Add inline comments only for non-obvious "why" — not "what"
`);
  }

  return sections.join('\n');
}

function generateCursorRule(projectType: ProjectType): string {
  const langMap: Record<ProjectType, string> = {
    nextjs: 'typescript',
    'vite-react': 'typescript',
    python: 'python',
    nodejs: 'typescript',
    general: 'typescript',
    'ml-python': 'python',
    'data-engineering': 'python',
    django: 'python',
    'aws-cdk': 'typescript',
    'gcp-terraform': 'hcl',
    'azure-infra': 'bicep',
    databricks: 'python',
    snowflake: 'sql',
    'react-native': 'typescript',
    'go-api': 'go',
    'rust-cli': 'rust',
  };

  const globMap: Record<ProjectType, string> = {
    nextjs: '**/*.{ts,tsx,js,jsx}',
    'vite-react': '**/*.{ts,tsx,js,jsx}',
    python: '**/*.py',
    nodejs: '**/*.{ts,tsx,js,jsx}',
    general: '**/*.{ts,tsx,js,jsx}',
    'ml-python': '**/*.{py,ipynb}',
    'data-engineering': '**/*.{py,sql,yml}',
    django: '**/*.py',
    'aws-cdk': '**/*.{ts,tsx,js,jsx}',
    'gcp-terraform': '**/*.{tf,tfvars}',
    'azure-infra': '**/*.{bicep,json}',
    databricks: '**/*.{py,sql,ipynb}',
    snowflake: '**/*.{sql,py,yml}',
    'react-native': '**/*.{ts,tsx,js,jsx}',
    'go-api': '**/*.go',
    'rust-cli': '**/*.rs',
  };

  const typeHintMap: Record<ProjectType, string> = {
    nextjs: 'no `any` types allowed',
    'vite-react': 'no `any` types allowed',
    python: 'use type hints on all functions',
    nodejs: 'no `any` types allowed',
    general: 'no `any` types allowed',
    'ml-python': 'use type hints on all functions',
    'data-engineering': 'use type hints on all functions',
    django: 'use type hints on all functions',
    'aws-cdk': 'no `any` types allowed',
    'gcp-terraform': 'use proper variable types and validation',
    'azure-infra': 'use explicit parameter types',
    databricks: 'use type hints on all functions',
    snowflake: 'use explicit column types',
    'react-native': 'no `any` types allowed',
    'go-api': 'use explicit types — no empty interface{}',
    'rust-cli': 'use explicit types — minimize type inference for public APIs',
  };

  const lang = langMap[projectType];
  const globs = globMap[projectType];
  const typeHint = typeHintMap[projectType];

  return `---
description: Code review standards for ${lang} projects
globs: ${globs}
---

When reviewing or writing code in this project:

1. Ensure type safety — ${typeHint}
2. Handle all error cases explicitly
3. Use early returns to reduce nesting
4. Keep functions under 40 lines
5. Name variables descriptively
6. Add JSDoc/docstring comments for public APIs
`;
}

export function generateCursorFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
  role: Role = 'developer',
): GeneratedFile[] {
  return [
    {
      path: '.cursorrules',
      content: generateCursorrules(projectName, projectType, features, role),
    },
    {
      path: '.cursor/rules/code-standards.mdc',
      content: generateCursorRule(projectType),
    },
  ];
}
