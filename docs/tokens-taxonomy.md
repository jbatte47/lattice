# Lattice token taxonomy (domain-first)

## Naming convention

- **kebab-case** for all token names.
- **Domain-first** file layout: `tokens/color.json`, `tokens/spacing.json`, `tokens/typography.json`, `tokens/elevation.json`.
- **Tier groups** per domain:
  - `global`: raw values (primitives).
  - `semantic`: intent-based aliases.
  - `component`: deferred until primitives consume them.

## Format (W3C Design Tokens Community Group)

- Tokens are expressed using `$type`, `$value`, `$description`.
- References use `{path.to.token}`.
- Groups are organizational only; tools should not infer type from group names.

## Global vs semantic

- **Global** tokens should be raw, reusable values (colors, dimensions, weights).
- **Semantic** tokens should be intent-driven and map to globals within the same domain.
- **Component** tokens are deferred until a primitive requires component-specific overrides.

## Mapping guidelines

### Color

- **Use semantic tokens in UI** (e.g., `text-primary`, `bg-layer-1`, `border-subtle`).
- **Map semantics to global palette**, then swap palette values for themes.
- **Layering** uses `bg-layer-*` to model nested surfaces.
- **Intent colors** (`intent-primary`, `intent-success`, etc.) are the base for component states.

### Spacing

- **Use semantic spacing** (`space-inline-*`, `space-stack-*`, `space-inset-*`) in layout and components.
- **Global scale** supports the semantic tokens; do not consume global values directly in components.

### Typography

- **Use semantic typography** (`type-body`, `type-heading-*`) for text styles.
- **Global tokens** provide shared font stacks, sizes, weights, and line-height values.

### Elevation

- **Use semantic elevations** (`elevation-raised`, `elevation-overlay`) for surfaces.
- **Global shadows** are raw shadow recipes referenced by semantic tokens.

## Component tokens (deferred)

Component tokens will be added when primitives first require overrides (e.g., `button`, `input`).
This keeps v0 focused on a clean semantic layer and avoids guessing component roles too early.

## Notes on standards and gaps

- The DTCG spec defines token types and value structure; taxonomy decisions live in this document.
- Carbon’s layering guidance implies explicit layer tokens for surfaces; that’s why `bg-layer-*` exists.
- Spectrum demonstrates a deep component-token layer; we will align later when primitives land.
- Current token values are placeholders and should be replaced once visual direction is defined.

## Next steps

- Validate placeholder values against product direction.
- Add theme overlays (light/dark) once tokens are wired to styles.
- Introduce component tokens when primitives are implemented.
