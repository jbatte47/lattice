import type { Theme } from './types';
import {
  colorSemanticTokens,
  elevationSemanticTokens,
  spacingSemanticTokens,
  typographySemanticTokens,
} from './tokens';
import type { DimensionValue, ShadowValue, TypographyValue } from './types';

const dimensionToCss = (dimension: DimensionValue) =>
  `${dimension.value}${dimension.unit}`;

const fontFamilyToCss = (fontFamily: TypographyValue['fontFamily']) => {
  const families: string[] = Array.isArray(fontFamily)
    ? [...fontFamily]
    : [fontFamily];
  return families
    .map((family) => {
      if (family.startsWith('"') || family.startsWith("'")) {
        return family;
      }

      if (/\s/.test(family)) {
        return `"${family}"`;
      }

      return family;
    })
    .join(', ');
};

const shadowToCss = (shadow: ShadowValue) => {
  const inset = shadow.inset ? 'inset ' : '';
  return `${inset}${dimensionToCss(shadow.offsetX)} ${dimensionToCss(
    shadow.offsetY,
  )} ${dimensionToCss(shadow.blur)} ${dimensionToCss(shadow.spread)} ${
    shadow.color
  }`;
};

export const themeToCssVars = (theme: Theme) => {
  const vars: Record<string, string> = {};

  for (const token of colorSemanticTokens) {
    vars[`--lt-color-${token}`] = theme.color.semantic[token];
  }

  for (const token of spacingSemanticTokens) {
    vars[`--lt-spacing-${token}`] = dimensionToCss(
      theme.spacing.semantic[token],
    );
  }

  for (const token of typographySemanticTokens) {
    const value = theme.typography.semantic[token];
    const base = `--lt-typography-${token}`;

    vars[`${base}-font-family`] = fontFamilyToCss(value.fontFamily);
    vars[`${base}-font-size`] = dimensionToCss(value.fontSize);
    vars[`${base}-font-weight`] = `${value.fontWeight}`;
    vars[`${base}-letter-spacing`] = dimensionToCss(value.letterSpacing);
    vars[`${base}-line-height`] = `${value.lineHeight}`;
  }

  for (const token of elevationSemanticTokens) {
    vars[`--lt-elevation-${token}`] = shadowToCss(
      theme.elevation.semantic[token],
    );
  }

  return vars;
};
