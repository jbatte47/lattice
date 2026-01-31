import React, { useEffect, useMemo, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { applyTheme } from '../theme/applyTheme';
import { defaultTheme } from '../theme/defaultTheme';
import { mergeThemes } from '../theme/mergeThemes';
import type { ThemeOverride } from '../theme/types';
import styles from './TokenPlayground.module.css';

const meta: Meta<typeof TokenPlayground> = {
  title: 'Foundations/Token Playground',
  component: TokenPlayground,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    baseSurface: { control: 'color' },
    layerSurface: { control: 'color' },
    overlaySurface: { control: 'color' },
    textPrimary: { control: 'color' },
    textMuted: { control: 'color' },
    accent: { control: 'color' },
    warning: { control: 'color' },
    danger: { control: 'color' },
    borderStrong: { control: 'color' },
    spacing: { control: { type: 'range', min: 8, max: 28, step: 2 } },
  },
  args: {
    baseSurface: '#ffffff',
    layerSurface: '#f7f7f8',
    overlaySurface: '#eeeff1',
    textPrimary: '#22252a',
    textMuted: '#6f7580',
    accent: '#3b6cff',
    warning: '#f2b01e',
    danger: '#e04f5f',
    borderStrong: '#a9adb5',
    spacing: 16,
  },
};

export default meta;

type Story = StoryObj<typeof TokenPlayground>;

export const Primary: Story = {};

type TokenPlaygroundProps = {
  baseSurface: string;
  layerSurface: string;
  overlaySurface: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  warning: string;
  danger: string;
  borderStrong: string;
  spacing: number;
};

function TokenPlayground({
  baseSurface,
  layerSurface,
  overlaySurface,
  textPrimary,
  textMuted,
  accent,
  warning,
  danger,
  borderStrong,
  spacing,
}: TokenPlaygroundProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nestedRef = useRef<HTMLDivElement | null>(null);

  const baseTheme = useMemo(() => {
    const overrides: ThemeOverride = {
      color: {
        semantic: {
          'bg-layer-0': baseSurface,
          'bg-surface-default': baseSurface,
          'bg-layer-1': layerSurface,
          'bg-surface-muted': layerSurface,
          'bg-layer-2': overlaySurface,
          'bg-surface-raised': overlaySurface,
          'text-primary': textPrimary,
          'text-secondary': textPrimary,
          'text-muted': textMuted,
          'border-strong': borderStrong,
          'border-subtle': borderStrong,
          'intent-primary': accent,
          'intent-primary-hover': accent,
          'link-default': accent,
          'intent-warning': warning,
          'intent-danger': danger,
        },
      },
      spacing: {
        semantic: {
          'space-stack-default': { value: spacing, unit: 'px' },
          'space-stack-loose': { value: spacing + 8, unit: 'px' },
          'space-inset-default': { value: spacing, unit: 'px' },
          'space-inline-default': { value: spacing - 4, unit: 'px' },
        },
      },
    };

    return mergeThemes(defaultTheme, overrides);
  }, [
    accent,
    baseSurface,
    borderStrong,
    danger,
    layerSurface,
    overlaySurface,
    spacing,
    textMuted,
    textPrimary,
    warning,
  ]);

  const layerTheme = useMemo(() => {
    const overrides: ThemeOverride = {
      color: {
        semantic: {
          'bg-layer-1': overlaySurface,
          'bg-layer-2': layerSurface,
        },
      },
    };

    return mergeThemes(baseTheme, overrides);
  }, [baseTheme, layerSurface, overlaySurface]);

  useEffect(() => {
    if (rootRef.current) {
      applyTheme(baseTheme, rootRef.current);
    }
  }, [baseTheme]);

  useEffect(() => {
    if (nestedRef.current) {
      applyTheme(layerTheme, nestedRef.current);
    }
  }, [layerTheme]);

  return (
    <div className={styles.playground} ref={rootRef}>
      <header className={styles.header}>
        <span className={styles.kicker}>Lattice playground</span>
        <h2 className={styles.title}>Theme layering and token-driven UI</h2>
        <p className={styles.description}>
          Adjust the controls to see semantic tokens drive surface, text, and intent styling across
          multiple layers.
        </p>
      </header>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Layered surfaces</h3>
          <p className={styles.meta}>
            Nested themes override background tokens without changing structure.
          </p>
          <div className={styles.layerWrapper}>
            <div className={styles.layerSurface}>
              <strong>Base layer</strong>
              <p className={styles.meta}>bg-layer-1, border-subtle</p>
            </div>
            <div className={`${styles.layerSurface} ${styles.layerCard}`} ref={nestedRef}>
              <strong>Nested layer</strong>
              <p className={styles.meta}>bg-layer-2 via nested theme</p>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Intent actions</h3>
          <p className={styles.meta}>
            Intent tokens keep color semantics consistent across actions.
          </p>
          <div className={styles.buttonRow}>
            <button className={styles.button} type="button">
              Primary
            </button>
            <button className={`${styles.button} ${styles.buttonWarning}`} type="button">
              Warning
            </button>
            <button className={`${styles.button} ${styles.buttonDanger}`} type="button">
              Danger
            </button>
          </div>
          <span className={styles.badge}>intent-info badge</span>
        </article>

        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Typography stack</h3>
          <p className={styles.meta}>Type tokens set font, size, and spacing across content.</p>
          <div>
            <div
              style={{
                fontFamily: 'var(--lt-typography-type-heading-2-font-family)',
                fontSize: 'var(--lt-typography-type-heading-2-font-size)',
                fontWeight: 'var(--lt-typography-type-heading-2-font-weight)',
                lineHeight: 'var(--lt-typography-type-heading-2-line-height)',
                letterSpacing: 'var(--lt-typography-type-heading-2-letter-spacing)',
              }}
            >
              Heading 2 sample
            </div>
            <p style={{ margin: '8px 0', color: 'var(--lt-color-text-secondary)' }}>
              Body text uses type-body with semantic spacing tokens.
            </p>
            <p className={styles.code}>Tokens: type-heading-2, type-body, text-secondary</p>
          </div>
        </article>

        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Tailwind compatibility</h3>
          <p className={styles.meta}>
            This card uses Tailwind utilities for layout, spacing, and typography (no CSS module
            layout).
          </p>
          <div className="grid gap-space-stack-default rounded-2xl border border-subtle bg-surface-default p-space-inset-default shadow-elevation-raised">
            <div className="flex items-center justify-between">
              <span className="text-primary font-semibold">Tailwind-only layout</span>
              <span className="text-muted text-xs uppercase tracking-[0.2em]">tokens</span>
            </div>
            <p className="text-secondary text-sm">
              Spacing uses semantic tokens: <code>gap-space-stack-default</code> and{' '}
              <code>p-space-inset-default</code>.
            </p>
            <div className="flex flex-wrap gap-space-inline-tight">
              <span className="rounded-full bg-layer-1 px-space-inline-default py-1 text-xs text-muted">
                bg-layer-1
              </span>
              <span className="rounded-full bg-layer-2 px-space-inline-default py-1 text-xs text-muted">
                bg-layer-2
              </span>
              <span className="rounded-full bg-layer-3 px-space-inline-default py-1 text-xs text-muted">
                bg-layer-3
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
