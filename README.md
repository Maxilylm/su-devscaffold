# DevScaffold

> A four-step wizard that generates the config files your AI coding assistant needs, bundled as a downloadable ZIP.

**[Live demo](https://su-devscaffold.vercel.app)**

Every AI coding CLI expects its own instruction file — `CLAUDE.md` for Claude Code, `.cursorrules` for Cursor, `AGENTS.md` for Codex, `.github/copilot-instructions.md` for Copilot — and writing a good one from scratch for each new project is tedious. DevScaffold walks you through picking a CLI, a project type, and the features you actually use, then composes the matching files from templates and zips them in the browser. There is no backend and no LLM call: every file is generated locally from typed template functions, so the whole thing runs as a static site.

## Features

- Six AI CLI targets: Claude Code, Cursor, Codex CLI, GitHub Copilot, OpenCode, and Gemini CLI
- Sixteen project types across web/mobile, backend, ML & data, and cloud infrastructure
- Fifteen optional feature modules (auth, database, testing, MLOps, CI/CD, Docker/K8s, security, and more) that inject extra rules
- Role selector — developer, data scientist, DevOps, PM, QA, or architect — that tailors the generated guidance
- Live file preview with per-file copy, plus a ZIP download of the whole config set

## Stack

- React 19 + TypeScript + Vite
- JSZip for client-side archive generation
- No backend, no external APIs — fully static
- Deployed on Vercel

## Running locally

```bash
npm install
npm run dev
```

---

Part of a series of 91 small web apps. [Browse them all](https://su-slopmachine.vercel.app).
