# Releasing Lattice

## Overview

Lattice releases are fully automated via semantic-release. Any commit merged into `main` that follows Conventional Commits can trigger a new version, GitHub Release Notes, and an npm publish.

## Requirements

- All commits to `main` follow Conventional Commits.
- CI must pass (`lint`, `typecheck`, `build`) before a release is attempted.
- npm trusted publishing is configured for the package.
- The release workflow has `id-token: write` permission.
- npm CLI >= 11.5.1 is available in CI for OIDC publishing.
- `package.json` includes a `repository.url` matching the GitHub repo for provenance checks.

## Workflow

1. Open a PR with Conventional Commits.
2. Merge to `main` after CI passes.
3. The `Release` workflow runs and, if needed, publishes:
   - GitHub release notes
   - npm package publish
   - package.json version is updated during the release job (not committed)

## Trusted publishing setup (OIDC)

1. In npm, open the package settings for `@jbatte47/lattice` and add a **Trusted Publisher**.
2. Select GitHub Actions and bind it to this repository and the `Release` workflow.
3. Ensure the workflow has `id-token: write` permissions and uses npm CLI >= 11.5.1.

## Notes

- Releases only run on `main`.
- If no release-worthy commits are detected, semantic-release exits without publishing.
- If a release fails, fix the issue and re-run the workflow; no manual versioning is needed.
- No `NPM_TOKEN` secret is required when using trusted publishing.
- Publishing uses the npm CLI via semantic-release exec (OIDC-based).
