import type { ProjectType, Feature, GeneratedFile } from './types';

function generateAgentsMd(projectName: string, projectType: ProjectType, features: Feature[]): string {
  const sections: string[] = [];

  sections.push(`# ${projectName} — Codex Agent Instructions`);
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

  if (projectType !== 'python') {
    sections.push(`### TypeScript
- Use strict mode — no \`any\` types
- Prefer \`const\` over \`let\`; never use \`var\`
- Define explicit return types for public functions
- Use interface for object shapes, type for unions/intersections
- Prefer named exports over default exports
`);
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

  return sections.join('\n');
}

export function generateCodexFiles(
  projectName: string,
  projectType: ProjectType,
  features: Feature[],
): GeneratedFile[] {
  return [
    {
      path: 'AGENTS.md',
      content: generateAgentsMd(projectName, projectType, features),
    },
  ];
}
