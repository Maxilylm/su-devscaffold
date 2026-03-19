import type { ProjectType, Feature, GeneratedFile } from './types';

function generateGeminiMd(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Gemini CLI Instructions`);
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

  if (features.includes('styling')) sections.push(`## Styling
- Tailwind utility-first
- Mobile-first responsive
- Dark mode support
- Semantic HTML
`);

  if (features.includes('git-workflow')) sections.push(`## Git
- Conventional commits: feat:, fix:, docs:, refactor:, test:, chore:
- Feature branches, atomic commits
- Never commit .env or secrets
`);

  return sections.join('\n');
}

export function generateGeminiFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
): GeneratedFile[] {
  return [
    {
      path: 'GEMINI.md',
      content: generateGeminiMd(projectName, projectType, features),
    },
  ];
}
