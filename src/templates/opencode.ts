import type { ProjectType, Feature, GeneratedFile } from './types';

function generateOpencodeMd(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — OpenCode Instructions`);
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
  };

  sections.push(contextMap[projectType]);
  sections.push('');

  sections.push(`## Standards
- Descriptive names, no abbreviations
- Functions under 40 lines
- Early returns over deep nesting
- Explicit error handling
- ${projectType === 'python' ? 'Type hints everywhere' : 'No `any` — proper TypeScript types'}
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

  return sections.join('\n');
}

export function generateOpenCodeFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
): GeneratedFile[] {
  return [
    {
      path: 'opencode.md',
      content: generateOpencodeMd(projectName, projectType, features),
    },
  ];
}
