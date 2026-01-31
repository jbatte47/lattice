# Lattice

Lattice is a set of simple, domain-agnostic UI primitives designed to be composed into higher-order interfaces without prescribing product logic.

Lattice is not a page builder, a theme, or a product-specific design system. It is a **structural layer**—a small, opinionated foundation that makes it easy to build consistent, accessible interfaces while staying out of the way of application-specific concerns.

---

## Philosophy

Lattice is built on a few core ideas:

- **Composition over configuration**  
  Complex interfaces should emerge from combining small, predictable pieces—not from large, over-configured components.

- **Domain-agnostic by default**  
  Lattice components never encode business logic, workflows, or product semantics. Those belong higher in the stack.

- **Structure creates strength**  
  Like a physical lattice, the system gains power from the relationships between simple parts, not from the complexity of the parts themselves.

- **Constraints are a feature**  
  Clear rules reduce entropy, improve consistency, and make systems easier to reason about over time.

---

## What Lattice Is

- A collection of **UI primitives** (e.g. Button, Input, Stack, Text)
- A **semantic token system** built on CSS variables
- A **Tailwind-based implementation** with strict conventions
- A foundation for building your _own_ product design systems

## What Lattice Is Not

- A product UI kit
- A page or layout builder
- A replacement for product-specific components
- A place for business rules or workflows

---

## Architecture Overview

Lattice is intentionally layered:

1. **Tokens**  
   Semantic design tokens (color, typography, radius, motion) defined as CSS variables. These are the single source of truth for visual identity.

2. **Tailwind Adapter**  
   Tailwind configuration maps semantic tokens into utility classes, enabling consistency without hard-coded values.

3. **Primitives**  
   Small, focused React components built from Tailwind utilities and token-driven styles.

4. **Composition**  
   Product teams compose primitives into higher-order components outside of Lattice.

---

## Core Rules

To keep the system coherent and scalable, Lattice enforces a few non-negotiable rules:

- No raw color utilities in components (use semantic tokens only)
- No product or domain concepts in Lattice components
- No arbitrary values except as a last resort
- All interactive components must be accessible by default
- Variants are explicit and intentional—no one-off styles

---

## Technology Choices

- **React + TypeScript**
- **Tailwind CSS** for styling
- **CSS variables** for theming
- **Variant-based class composition** (e.g. CVA or equivalent)
- Optional **Radix primitives** for accessibility and behavior

---

## Intended Usage

Lattice is meant to sit at the bottom of your UI stack:

```
Product UI
↑
Product-specific components
↑
Lattice primitives
↑
Design tokens
```

Teams are encouraged to build their own design systems _on top of_ Lattice, extending it without modifying its core principles.

---

## Status

Lattice is currently in early development. APIs, component sets, and conventions will stabilize as the system grows, but the guiding philosophy is expected to remain constant.

---

## Development & Contribution

### Getting Started

Run the build once before your first typecheck so Tailwind + types have the generated token artifacts available.

```
pnpm install
pnpm build
```

### Branch Management

We follow **Trunk-Based Development**. All development happens in short-lived feature branches that are merged into `main` after review.

- **Branch Naming**: Use semantic prefixes followed by the issue number and a short description.
  - `feat/<issue-number>-<description>` (e.g., `feat/2-lint-setup`)
  - `fix/<issue-number>-<description>`
  - `chore/<issue-number>-<description>`
  - `docs/<issue-number>-<description>`

### Commit Message Conventions

Commit messages must be clear and concise. Always reference the relevant GitHub issue number in the footer or subject line.

- **Pattern**: `<type>(<scope>): <description> <issue-reference>`
- **Example**: `feat(tooling): add pnpm workspace configuration. Fixes #1`

### Pull Request Description

PR descriptions must follow this format and include the issue link that will be closed on merge:

```
## Summary
- <summary bullet 1>
- <summary bullet 2>

## Testing
- <what you ran or why not>

Fixes #<issue-number>
```

### Pull Request Title

PR titles must use Conventional Commit format. When we squash merge, the PR title becomes the commit subject, which drives semantic-release.

- **Pattern**: `<type>(<scope>): <description>`
- **Example**: `feat(tokens): generate tokens.css at build time`

### Tooling (Lint + Format)

Lattice uses `pnpm` and a repo-wide ESLint + Prettier setup.

- **Lint**: `pnpm lint`
- **Lint (fix)**: `pnpm lint:fix`
- **Format**: `pnpm format`
- **Format (write)**: `pnpm format:write`

### Build + Typecheck

To validate TypeScript types and produce build artifacts:

- **Typecheck**: `pnpm typecheck`
- **Build**: `pnpm build`

### Editor Setup (VS Code)

Recommended extensions:

- **ESLint**
- **Prettier - Code formatter**

Recommended workspace settings:

```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Versioning

Lattice follows **Semantic Versioning (SemVer)**. Major, minor, and patch updates are determined by the impact of changes on the public API of the structural primitives.
