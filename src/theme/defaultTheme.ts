import type { Theme } from './types';

const px = (value: number) => ({ value, unit: 'px' });
const em = (value: number) => ({ value, unit: 'em' });

const colors = {
  neutral0: '#ffffff',
  neutral50: '#f7f7f8',
  neutral100: '#eeeff1',
  neutral200: '#d9dbe0',
  neutral300: '#c3c6cc',
  neutral400: '#a9adb5',
  neutral500: '#8c919b',
  neutral600: '#6f7580',
  neutral700: '#555a63',
  neutral800: '#3b3f46',
  neutral900: '#22252a',
  neutral1000: '#0b0c0e',
  brand500: '#3b6cff',
  brand600: '#2f59d9',
  blue500: '#2f6bff',
  green500: '#1f9d61',
  yellow500: '#f2b01e',
  red500: '#e04f5f',
  alpha10: 'rgba(0, 0, 0, 0.1)',
  alpha20: 'rgba(0, 0, 0, 0.2)',
} as const;

const fontFamilies = {
  base: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
};

export const defaultTheme: Theme = {
  color: {
    semantic: {
      'text-primary': colors.neutral900,
      'text-secondary': colors.neutral700,
      'text-muted': colors.neutral500,
      'text-disabled': colors.neutral400,
      'text-inverse': colors.neutral0,
      'bg-surface-default': colors.neutral0,
      'bg-surface-muted': colors.neutral50,
      'bg-surface-raised': colors.neutral0,
      'bg-layer-0': colors.neutral0,
      'bg-layer-1': colors.neutral50,
      'bg-layer-2': colors.neutral100,
      'bg-layer-3': colors.neutral200,
      'border-subtle': colors.neutral200,
      'border-strong': colors.neutral400,
      'border-inverse': colors.neutral700,
      'focus-ring': colors.brand500,
      'link-default': colors.brand500,
      'intent-primary': colors.brand500,
      'intent-primary-hover': colors.brand600,
      'intent-success': colors.green500,
      'intent-warning': colors.yellow500,
      'intent-danger': colors.red500,
      'intent-info': colors.blue500,
      'text-on-intent': colors.neutral0,
    },
  },
  spacing: {
    semantic: {
      'space-inline-tight': px(6),
      'space-inline-default': px(12),
      'space-inline-loose': px(16),
      'space-stack-tight': px(8),
      'space-stack-default': px(16),
      'space-stack-loose': px(24),
      'space-inset-tight': px(8),
      'space-inset-default': px(16),
      'space-inset-loose': px(24),
    },
  },
  typography: {
    semantic: {
      'type-body': {
        fontFamily: fontFamilies.base,
        fontSize: px(16),
        fontWeight: 400,
        letterSpacing: em(0),
        lineHeight: 1.5,
      },
      'type-body-strong': {
        fontFamily: fontFamilies.base,
        fontSize: px(16),
        fontWeight: 600,
        letterSpacing: em(0),
        lineHeight: 1.5,
      },
      'type-caption': {
        fontFamily: fontFamilies.base,
        fontSize: px(14),
        fontWeight: 400,
        letterSpacing: em(0),
        lineHeight: 1.5,
      },
      'type-overline': {
        fontFamily: fontFamilies.base,
        fontSize: px(12),
        fontWeight: 500,
        letterSpacing: em(0.01),
        lineHeight: 1.2,
      },
      'type-heading-1': {
        fontFamily: fontFamilies.base,
        fontSize: px(36),
        fontWeight: 700,
        letterSpacing: em(-0.01),
        lineHeight: 1.2,
      },
      'type-heading-2': {
        fontFamily: fontFamilies.base,
        fontSize: px(30),
        fontWeight: 600,
        letterSpacing: em(-0.01),
        lineHeight: 1.2,
      },
      'type-heading-3': {
        fontFamily: fontFamilies.base,
        fontSize: px(24),
        fontWeight: 600,
        letterSpacing: em(-0.01),
        lineHeight: 1.2,
      },
    },
  },
  elevation: {
    semantic: {
      'elevation-flat': {
        color: 'rgba(0, 0, 0, 0)',
        offsetX: px(0),
        offsetY: px(0),
        blur: px(0),
        spread: px(0),
      },
      'elevation-raised': {
        color: colors.alpha10,
        offsetX: px(0),
        offsetY: px(1),
        blur: px(2),
        spread: px(0),
      },
      'elevation-overlay': {
        color: colors.alpha10,
        offsetX: px(0),
        offsetY: px(3),
        blur: px(6),
        spread: px(0),
      },
      'elevation-modal': {
        color: colors.alpha20,
        offsetX: px(0),
        offsetY: px(6),
        blur: px(12),
        spread: px(0),
      },
    },
  },
};
