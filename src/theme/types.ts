import type {
  ColorSemanticToken,
  ElevationSemanticToken,
  SpacingSemanticToken,
  TypographySemanticToken,
} from './tokens';

export type DimensionValue = {
  value: number;
  unit: string;
};

export type ShadowValue = {
  color: string;
  offsetX: DimensionValue;
  offsetY: DimensionValue;
  blur: DimensionValue;
  spread: DimensionValue;
  inset?: boolean;
};

export type TypographyValue = {
  fontFamily: string[] | string;
  fontSize: DimensionValue;
  fontWeight: number;
  letterSpacing: DimensionValue;
  lineHeight: number;
};

export type Theme = {
  color: {
    semantic: Record<ColorSemanticToken, string>;
  };
  spacing: {
    semantic: Record<SpacingSemanticToken, DimensionValue>;
  };
  typography: {
    semantic: Record<TypographySemanticToken, TypographyValue>;
  };
  elevation: {
    semantic: Record<ElevationSemanticToken, ShadowValue>;
  };
};

export type ThemeOverride = {
  color?: {
    semantic?: Partial<Record<ColorSemanticToken, string>>;
  };
  spacing?: {
    semantic?: Partial<Record<SpacingSemanticToken, DimensionValue>>;
  };
  typography?: {
    semantic?: Partial<Record<TypographySemanticToken, TypographyValue>>;
  };
  elevation?: {
    semantic?: Partial<Record<ElevationSemanticToken, ShadowValue>>;
  };
};
