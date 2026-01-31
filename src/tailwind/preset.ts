import {
  colorSemanticTokens,
  elevationSemanticTokens,
  spacingSemanticTokens,
  typographySemanticTokens,
} from '../../tokens/semantic-tokens.js';

const toCssVar = (prefix: string, token: string) => `var(--lt-${prefix}-${token})`;

const mapTokens = (prefix: string, tokens: readonly string[]) =>
  Object.fromEntries(tokens.map((token) => [token, toCssVar(prefix, token)]));

const stripPrefix = (token: string, prefix: string) => token.slice(prefix.length);

const textColor = Object.fromEntries(
  colorSemanticTokens
    .filter((token) => token.startsWith('text-'))
    .map((token) => [stripPrefix(token, 'text-'), toCssVar('color', token)]),
);

const backgroundColor = Object.fromEntries(
  colorSemanticTokens
    .filter((token) => token.startsWith('bg-'))
    .map((token) => [stripPrefix(token, 'bg-'), toCssVar('color', token)]),
);

const borderColor = Object.fromEntries(
  colorSemanticTokens
    .filter((token) => token.startsWith('border-'))
    .map((token) => [stripPrefix(token, 'border-'), toCssVar('color', token)]),
);

const intentColors = Object.fromEntries(
  colorSemanticTokens
    .filter((token) => token.startsWith('intent-'))
    .map((token) => [token, toCssVar('color', token)]),
);

const fontFamily = Object.fromEntries(
  typographySemanticTokens.map((token) => [token, toCssVar('typography', `${token}-font-family`)]),
);

const fontSize = Object.fromEntries(
  typographySemanticTokens.map((token) => [
    token,
    [
      toCssVar('typography', `${token}-font-size`),
      {
        lineHeight: toCssVar('typography', `${token}-line-height`),
        letterSpacing: toCssVar('typography', `${token}-letter-spacing`),
        fontWeight: toCssVar('typography', `${token}-font-weight`),
      },
    ],
  ]),
);

const preset = {
  theme: {
    extend: {
      colors: mapTokens('color', colorSemanticTokens),
      textColor,
      backgroundColor: {
        ...backgroundColor,
        ...intentColors,
      },
      borderColor,
      ringColor: {
        focus: toCssVar('color', 'focus-ring'),
      },
      spacing: mapTokens('spacing', spacingSemanticTokens),
      fontFamily,
      fontSize,
      boxShadow: mapTokens('elevation', elevationSemanticTokens),
    },
  },
};

export default preset;
