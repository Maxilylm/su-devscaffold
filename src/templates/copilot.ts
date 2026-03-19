import type { ProjectType, Feature, GeneratedFile } from './types';

function generateCopilotInstructions(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — GitHub Copilot Instructions`);
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
  };

  sections.push(contextMap[projectType]);
  sections.push('');

  // Style rules
  sections.push(`## Code Style
- Use descriptive variable names — avoid abbreviations
- Keep functions under 40 lines; extract helpers when longer
- Use early returns to reduce nesting
- Handle all error cases explicitly
- ${projectType === 'python' ? 'Type hints on all function signatures' : 'No `any` types — use proper TypeScript types'}
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

  sections.push(featureRules.join('\n\n'));

  return sections.join('\n');
}

export function generateCopilotFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
): GeneratedFile[] {
  return [
    {
      path: '.github/copilot-instructions.md',
      content: generateCopilotInstructions(projectName, projectType, features),
    },
  ];
}
