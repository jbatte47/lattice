/* global console */
/* global URL */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const rootUrl = new URL('..', import.meta.url);
const dataPath = fileURLToPath(new URL('tokens/semantic-tokens.json', rootUrl));
const jsPath = fileURLToPath(new URL('tokens/semantic-tokens.js', rootUrl));
const dtsPath = fileURLToPath(new URL('tokens/semantic-tokens.d.ts', rootUrl));

const data = JSON.parse(await readFile(dataPath, 'utf8'));

const categories = [
  { key: 'color', exportName: 'colorSemanticTokens' },
  { key: 'spacing', exportName: 'spacingSemanticTokens' },
  { key: 'typography', exportName: 'typographySemanticTokens' },
  { key: 'elevation', exportName: 'elevationSemanticTokens' },
];

const formatArray = (items, indent = '  ') => items.map((item) => `${indent}'${item}',`).join('\n');

const jsLines = categories.map(({ key, exportName }) => {
  const items = data[key];
  if (!Array.isArray(items)) {
    throw new Error(`Expected array for ${key}.`);
  }

  return `/** @type {const} */\nexport const ${exportName} = [\n${formatArray(items, '  ')}\n];`;
});

const dtsLines = categories.map(({ key, exportName }) => {
  const items = data[key];
  if (!Array.isArray(items)) {
    throw new Error(`Expected array for ${key}.`);
  }

  return `export const ${exportName}: readonly [\n${formatArray(items, '  ')}\n];`;
});

await writeFile(jsPath, `${jsLines.join('\n\n')}\n`, 'utf8');
await writeFile(dtsPath, `${dtsLines.join('\n\n')}\n`, 'utf8');

console.log('Generated tokens/semantic-tokens.js and tokens/semantic-tokens.d.ts');
