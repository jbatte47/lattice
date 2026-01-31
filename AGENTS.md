# Lattice Agent Instructions

## Issue Creation Routine (Authoritative)

When creating GitHub issues, always follow this workflow to preserve template formatting and project/milestone metadata.

### 1) Draft the issue body in `sandbox/`

- Create a markdown file at `sandbox/issue-<slug>.md`.
- Use **H3 headings** (`###`) exactly as GitHub issue forms render them.
- Use blank lines between headings and content.
- Avoid `gh issue create -b` for bodies; always use `-F` with the file.

### 2) Create the issue (MCP preferred, `gh` fallback)

Always include labels, milestone, and project.

Preferred: use the GitHub MCP server when available. If MCP is unavailable or unsupported for the action, use the `gh` CLI with `-F`.

Fallback `gh` templates:

```
# Feature

gh issue create \
  -t "[Feature] <title>" \
  -F sandbox/issue-<slug>.md \
  -l "type:feature" -l "area:<area>" \
  -m "<milestone>" \
  --project "Lattice"

# Spike

gh issue create \
  -t "[Spike] <title>" \
  -F sandbox/issue-<slug>.md \
  -l "type:spike" -l "area:<area>" \
  -m "<milestone>" \
  --project "Lattice"

# Primitive

gh issue create \
  -t "[Primitive] <title>" \
  -F sandbox/issue-<slug>.md \
  -l "type:primitive" -l "area:primitives" \
  -m "<milestone>" \
  --project "Lattice"

# Bug

gh issue create \
  -t "[Bug] <title>" \
  -F sandbox/issue-<slug>.md \
  -l "type:bug" -l "area:<area>" \
  -m "<milestone>" \
  --project "Lattice"
```

### 3) Required GH auth scope

`gh` must have the `project` scope to add issues to the Project.
If `--project "Lattice"` fails, refresh auth:

```
gh auth refresh -h github.com -s project
```

### 4) Formatting reference (example)

```
### Problem statement

<text>

### Proposed change

<text>
```

### 5) Notes

- `sandbox/` is gitignored and is the canonical staging area for issue bodies.
- Store transient artifacts (exports, local snapshots, scratch JSON, etc.) in `sandbox/` to avoid polluting git history.
- Always prefer adding more issues over bloating a single issue.
- Do not skip milestones or project assignment.

## Item Detail Retrieval (Authoritative)

When retrieving details for an item (issue, PR, etc.), use the helper functions in `.agent/tools.sh` instead of ad-hoc `gh` commands.

### Required method

1. Source the helper script:

```
source .agent/tools.sh
```

2. Use the `gh_issue_full` function to fetch full issue details (includes project placement):

```
gh_issue_full <issue_number> [repo_name]
```

### Notes

- `gh_issue_full` resolves the authenticated GitHub username via `gh api user --jq .login`.
- Use `--owner @me` only when explicitly passing the `--owner` flag to `gh`.

## Branching Workflow (Authoritative)

When starting work on an issue, use the helper functions in `.agent/tools.sh` instead of custom or one-off git/gh commands.

### Required method

1. Source the helper script:

```
source .agent/tools.sh
```

2. Create or switch to the correct short-lived branch:

```
gh_branch_start <scope> <issue_number> <description>
```

### Notes

- `gh_branch_start` will safely stash dirty work, update `main`, create/switch the branch, and restore the stash.
- Preferred scopes are `feat`, `fix`, `chore`, and `docs`.

## Preferred Helper Commands (Authoritative)

Use these `.agent/tools.sh` functions instead of custom or one-off commands whenever possible.

### GitHub helpers

- `gh_me_login`
- `gh_issue_full`
- `gh_issue_set_project_status`

### Git helpers

- `gh_branch_start`

## MCP Servers

- Use MCP servers when available for GitHub operations (issues, milestones, projects) instead of the `gh` CLI.
- GitHub MCP is configured as `github` via:
  `codex mcp add github --url https://api.githubcopilot.com/mcp/`

### MCP usage pattern (GitHub)

1. Discover capabilities:
   - List MCP resources and templates (if none are exposed, MCP is not usable here yet).
2. Prefer MCP for:
   - Creating issues with labels, milestone, and project.
   - Editing issues (milestone/project/labels).
3. If MCP reports no capabilities or fails, fall back to the `gh` CLI examples above.

### MCP concrete examples

Currently unavailable in this environment: MCP discovery returns no GitHub resources/templates, so there are no concrete MCP calls to document yet. Revisit once the GitHub MCP server exposes issue/project methods.
