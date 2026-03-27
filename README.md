# React + TypeScript + Vite Frame

A minimal, opinionated starter repository for building modern React applications with TypeScript and Vite.

This repository is intended to be used as a **project frame**: clone or generate a new repository from it, rename it, and build on top without redoing basic setup each time.

---

## Features

* **React + TypeScript + Vite** for a fast development experience.
* **ESLint (flat config) + Prettier** for code quality and consistent formatting.
* **Path alias** `@/` → `src/` for cleaner imports.
* **Environment variable** handling via `.env`.
* **Scalable folder structure** designed for growth.
* **Minimal starter components** to get you moving immediately.
* **Project rename script** to quickly personalize new clones.

---

## Getting Started

### Use as a template (Recommended)

1. Click **"Use this template"** on GitHub.
2. Create a new repository from the template.
3. Clone your new repository locally.
4. Install dependencies:

```bash
npm install
npm run dev

```

### Clone manually

If you prefer to clone the repository directly:

```bash
git clone <repo-url> my-new-project
cd my-new-project
npm install

```

**Rename the project:**
To update your `package.json` and project references automatically:

```bash
npm run rename -- my-new-project

```

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to find code issues |
| `npm run format` | Format code with Prettier |
| `npm run rename -- <name>` | Rename the project (updates `package.json`) |

---

## Environment Variables

This project uses Vite’s environment variable system. Create a `.env` file based on the provided example:

```bash
cp .env.example .env

```

> **Note:** All public variables must be prefixed with `VITE_` to be accessible in your application.

---

## Path Aliases

The alias `@/` points to the `src/` directory, allowing for cleaner imports regardless of file depth.

**Example:**

```ts
import { Button } from '@/components/Button';
import { useAuth } from '@/lib/hooks';

```

---

## Project Structure

```text
src/
├── app/          # Application shell, providers, layout
├── components/   # Reusable UI components
├── lib/          # Utilities, hooks, and helpers
├── styles/       # Global styles and themes
└── types/        # Shared TypeScript types and interfaces

```

---

## Formatting & Linting

* **ESLint** handles code quality and identifies common React/TypeScript issues.
* **Prettier** is responsible for code formatting only.
* Conflicting ESLint formatting rules are disabled via `eslint-config-prettier`.

**Recommended Editor Setup:**

* Enable **Format on Save**.
* Install the **ESLint** and **Prettier** extensions (e.g., for VS Code).

---

## Adding More Tooling

This frame intentionally avoids locking in specific libraries to remain flexible. Add these as needed:

* **Styling:** Tailwind CSS, CSS Modules, or Styled Components.
* **Routing:** React Router or TanStack Router.
* **State Management:** Zustand, Redux Toolkit, or Jotai.
* **Testing:** Vitest and React Testing Library.
