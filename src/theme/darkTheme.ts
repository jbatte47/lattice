import { defaultTheme } from './defaultTheme';
import type { Theme } from './types';

const darkColors = {
  'text-primary': '#f7f7f8',
  'text-secondary': '#c3c6cc',
  'text-muted': '#8c919b',
  'text-disabled': '#6f7580',
  'text-inverse': '#22252a',
  'bg-surface-default': '#0b0c0e',
  'bg-surface-muted': '#22252a',
  'bg-surface-raised': '#22252a',
  'bg-layer-0': '#0b0c0e',
  'bg-layer-1': '#22252a',
  'bg-layer-2': '#3b3f46',
  'bg-layer-3': '#555a63',
  'border-subtle': '#3b3f46',
  'border-strong': '#6f7580',
  'border-inverse': '#d9dbe0',
  'focus-ring': '#3b6cff',
  'link-default': '#3b6cff',
  'intent-primary': '#3b6cff',
  'intent-primary-hover': '#2f59d9',
  'intent-success': '#1f9d61',
  'intent-warning': '#f2b01e',
  'intent-danger': '#e04f5f',
  'intent-info': '#2f6bff',
  'text-on-intent': '#ffffff',
} as const;

export const darkTheme: Theme = {
  ...defaultTheme,
  color: {
    semantic: {
      ...defaultTheme.color.semantic,
      ...darkColors,
    },
  },
};
