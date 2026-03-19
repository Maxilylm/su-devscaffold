import type { ProjectType, Feature, GeneratedFile } from './types';

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

function generateClaudeMd(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections = [
    `# ${projectName}`,
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

  return vars.length > 0 ? vars.join('\n') + '\n' : '# No environment variables required\n';
}

export function generateClaudeCodeFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push({
    path: 'CLAUDE.md',
    content: generateClaudeMd(projectName, projectType, features),
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
