#!/usr/bin/env bash
set -euo pipefail

# Returns the authenticated GitHub username.
# Usage: gh_me_login
function gh_me_login() {
  gh api user --jq .login
}

# Fetch full details for an issue, including project placement.
# Usage: gh_issue_full <issue_number> [repo_name] [owner]
# Example: gh_issue_full 12 lattice jbatte47
function gh_issue_full() {
  local issue_number=${1:?issue number required}
  local repo_name=${2:-lattice}
  local owner=${3:-}

  if [[ -z "${owner}" ]]; then
    owner="$(gh_me_login)"
  fi

  gh issue view "${issue_number}" \
    --repo "${owner}/${repo_name}" \
    --json number,title,state,labels,assignees,author,body,url,createdAt,updatedAt,milestone,projectItems
}

# Move a GitHub issue's project status (Project V2 single-select "Status" field).
# Usage: gh_issue_set_project_status <issue_number> [repo_name] [owner] [project_title] [status_name]
# Example: gh_issue_set_project_status 12 lattice jbatte47 "Lattice" "In Progress"
function gh_issue_set_project_status() {
  local issue_number=${1:?issue number required}
  local repo_name=${2:-lattice}
  local owner=${3:-}
  local project_title=${4:-Lattice}
  local status_name=${5:-In Progress}

  if [[ -z "${owner}" ]]; then
    owner="$(gh_me_login)"
  fi

  local project_json
  project_json="$(gh api graphql -f query='
query($login:String!){
  user(login:$login){
    projectsV2(first:50){
      nodes{
        id
        title
        fields(first:50){
          nodes{
            ... on ProjectV2SingleSelectField { id name options { id name } }
          }
        }
      }
    }
  }
}' -f login="${owner}")"

  local project_id
  local status_field_id
  local status_option_id
  project_id="$(jq -r --arg title "${project_title}" '.data.user.projectsV2.nodes[]? | select(.title==$title) | .id' <<< "${project_json}" | head -n1)"
  status_field_id="$(jq -r --arg title "${project_title}" '.data.user.projectsV2.nodes[]? | select(.title==$title) | .fields.nodes[]? | select(.name=="Status") | .id' <<< "${project_json}" | head -n1)"
  status_option_id="$(jq -r --arg title "${project_title}" --arg status "${status_name}" '.data.user.projectsV2.nodes[]? | select(.title==$title) | .fields.nodes[]? | select(.name=="Status") | .options[] | select(.name==$status) | .id' <<< "${project_json}" | head -n1)"

  if [[ -z "${project_id}" ]]; then
    project_json="$(gh api graphql -f query='
query($login:String!){
  organization(login:$login){
    projectsV2(first:50){
      nodes{
        id
        title
        fields(first:50){
          nodes{
            ... on ProjectV2SingleSelectField { id name options { id name } }
          }
        }
      }
    }
  }
}' -f login="${owner}" 2>/dev/null || true)"

    project_id="$(jq -r --arg title "${project_title}" '.data.organization.projectsV2.nodes[]? | select(.title==$title) | .id' <<< "${project_json}" | head -n1)"
    status_field_id="$(jq -r --arg title "${project_title}" '.data.organization.projectsV2.nodes[]? | select(.title==$title) | .fields.nodes[]? | select(.name=="Status") | .id' <<< "${project_json}" | head -n1)"
    status_option_id="$(jq -r --arg title "${project_title}" --arg status "${status_name}" '.data.organization.projectsV2.nodes[]? | select(.title==$title) | .fields.nodes[]? | select(.name=="Status") | .options[] | select(.name==$status) | .id' <<< "${project_json}" | head -n1)"
  fi

  if [[ -z "${project_id}" || -z "${status_field_id}" || -z "${status_option_id}" ]]; then
    echo "Failed to resolve project/status metadata for ${project_title} (${status_name})." >&2
    return 1
  fi

  local issue_json
  issue_json="$(gh api graphql -f query='
query($owner:String!, $repo:String!, $number:Int!){
  repository(owner:$owner, name:$repo){
    issue(number:$number){
      projectItems(first:50){
        nodes{
          id
          project { title }
        }
      }
    }
  }
}' -f owner="${owner}" -f repo="${repo_name}" -F number="${issue_number}")"

  local item_id
  item_id="$(jq -r --arg project "${project_title}" '.data.repository.issue.projectItems.nodes[]? | select(.project.title==$project) | .id' <<< "${issue_json}" | head -n1)"

  if [[ -z "${item_id}" ]]; then
    echo "No project item found for issue #${issue_number} in project ${project_title}." >&2
    return 1
  fi

  gh project item-edit \
    --id "${item_id}" \
    --field-id "${status_field_id}" \
    --project-id "${project_id}" \
    --single-select-option-id "${status_option_id}" \
    --format json >/dev/null
}

# Create or switch to a short-lived branch following repo naming rules.
# Usage: gh_branch_start <scope> <issue_number> <description>
# Example: gh_branch_start docs 12 token-usage-storybook
function gh_branch_start() {
  local scope=${1:?scope required (feat|fix|chore|docs)}
  local issue_number=${2:?issue number required}
  local description=${3:?description required}
  local branch="${scope}/${issue_number}-${description}"

  case "${scope}" in
    feat|fix|chore|docs) ;;
    *)
      echo "Invalid scope: ${scope}. Use feat|fix|chore|docs." >&2
      return 1
      ;;
  esac

  local did_stash=0
  if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
    echo "Working tree is dirty. Stashing changes before branching..." >&2
    git stash push -u -m "gh_branch_start auto-stash" >/dev/null
    did_stash=1
  fi

  git fetch origin main
  git checkout main
  git pull --ff-only origin main

  if git show-ref --verify --quiet "refs/heads/${branch}"; then
    git checkout "${branch}"
  else
    git checkout -b "${branch}"
  fi

  if [[ "${did_stash}" -eq 1 ]]; then
    echo "Restoring stashed changes..." >&2
    git stash pop >/dev/null || {
      echo "Stash pop reported conflicts. Resolve them manually." >&2
      return 1
    }
  fi
}

# Commit changes following commitlint rules.
# Usage: gh_commit_issue <type> <scope> <description> <issue_number>
# Example: gh_commit_issue docs storybook "add token usage docs and playground" 12
function gh_commit_issue() {
  local type=${1:?type required}
  local scope=${2:?scope required}
  local description=${3:?description required}
  local issue_number=${4:?issue number required}

  case "${type}" in
    feat|fix|chore|docs|refactor|test|perf) ;;
    *)
      echo "Invalid type: ${type}. Use a conventional commit type." >&2
      return 1
      ;;
  esac

  if [[ -z "${scope}" ]]; then
    echo "Scope is required by commitlint." >&2
    return 1
  fi

  if [[ -z "$(git status --porcelain)" ]]; then
    echo "No changes to commit." >&2
    return 1
  fi

  git add -A
  git commit -m "${type}(${scope}): ${description} Fixes #${issue_number}"
}

# Create a PR from the current branch and move the issue to "In Review".
# Usage: gh_pr_create_and_mark_review <issue_number> <type> <scope> <description> [repo_name] [owner]
# Example: gh_pr_create_and_mark_review 12 docs storybook "add storybook docs and token playground"
function gh_pr_create_and_mark_review() {
  local issue_number=${1:?issue number required}
  local type=${2:?type required}
  local scope=${3:?scope required}
  local description=${4:?description required}
  local repo_name=${5:-lattice}
  local owner=${6:-}

  if [[ -z "${owner}" ]]; then
    owner="$(gh_me_login)"
  fi

  local branch
  branch="$(git branch --show-current)"
  if [[ -z "${branch}" ]]; then
    echo "No current branch detected." >&2
    return 1
  fi

  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Working tree is dirty. Commit changes before creating PR." >&2
    return 1
  fi

  local pr_title="${type}(${scope}): ${description}"
  local pr_body
  pr_body=$(
    cat <<EOF
## Summary
- ${description}

## Testing
- pnpm build-storybook

Fixes #${issue_number}
EOF
  )

  gh pr create \
    --title "${pr_title}" \
    --body "${pr_body}" \
    --base main \
    --head "${branch}" \
    --repo "${owner}/${repo_name}"

  gh_issue_set_project_status "${issue_number}" "${repo_name}" "${owner}" "Lattice" "In Review"
}
