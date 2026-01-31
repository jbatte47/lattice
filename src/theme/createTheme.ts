import { defaultTheme } from './defaultTheme';
import { mergeThemes } from './mergeThemes';
import type { Theme, ThemeOverride } from './types';

export const createTheme = (...overrides: ThemeOverride[]): Theme => {
  return mergeThemes(defaultTheme, ...overrides);
};
