import {
  colorSemanticTokens,
  elevationSemanticTokens,
  spacingSemanticTokens,
  typographySemanticTokens,
} from '../../tokens/semantic-tokens.js';

export type ColorSemanticToken = (typeof colorSemanticTokens)[number];

export type SpacingSemanticToken = (typeof spacingSemanticTokens)[number];

export type TypographySemanticToken = (typeof typographySemanticTokens)[number];

export type ElevationSemanticToken = (typeof elevationSemanticTokens)[number];

export {
  colorSemanticTokens,
  spacingSemanticTokens,
  typographySemanticTokens,
  elevationSemanticTokens,
};
