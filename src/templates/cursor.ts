import type { ProjectType, Feature, GeneratedFile } from './types';

function generateCursorrules(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Cursor Rules`);
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

  return sections.join('\n');
}

function generateCursorRule(projectType: ProjectType): string {
  const lang = projectType === 'python' ? 'python' : 'typescript';
  return `---
description: Code review standards for ${lang} projects
globs: ${projectType === 'python' ? '**/*.py' : '**/*.{ts,tsx,js,jsx}'}
---

When reviewing or writing code in this project:

1. Ensure type safety — ${projectType === 'python' ? 'use type hints on all functions' : 'no `any` types allowed'}
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
): GeneratedFile[] {
  return [
    {
      path: '.cursorrules',
      content: generateCursorrules(projectName, projectType, features),
    },
    {
      path: '.cursor/rules/code-standards.mdc',
      content: generateCursorRule(projectType),
    },
  ];
}
