import type { Theme, ThemeOverride } from './types';

const mergeSemantic = <T extends Record<string, unknown>>(
  base: T,
  overrides: Array<Partial<T> | undefined>,
) => {
  return Object.assign({}, base, ...overrides.filter(Boolean));
};

export const mergeThemes = (base: Theme, ...overrides: ThemeOverride[]) => {
  return {
    color: {
      semantic: mergeSemantic(
        base.color.semantic,
        overrides.map((override) => override.color?.semantic),
      ),
    },
    spacing: {
      semantic: mergeSemantic(
        base.spacing.semantic,
        overrides.map((override) => override.spacing?.semantic),
      ),
    },
    typography: {
      semantic: mergeSemantic(
        base.typography.semantic,
        overrides.map((override) => override.typography?.semantic),
      ),
    },
    elevation: {
      semantic: mergeSemantic(
        base.elevation.semantic,
        overrides.map((override) => override.elevation?.semantic),
      ),
    },
  };
};
