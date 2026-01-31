/* global URL, console */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const { defaultTheme, darkTheme, themeToCssVars } = await import(
  new URL('../dist/index.js', import.meta.url).href
);

const toCssBlock = (selector, vars) => {
  const lines = Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
};

const lightVars = themeToCssVars(defaultTheme);
const darkVars = themeToCssVars(darkTheme);

const css = `${toCssBlock(':root', lightVars)}\n\n${toCssBlock("[data-theme='dark']", darkVars)}\n`;
const outPath = new URL('../dist/tokens.css', import.meta.url);
const outFilePath = fileURLToPath(outPath);

await mkdir(dirname(outFilePath), { recursive: true });
await writeFile(outFilePath, css, 'utf8');

console.log('Generated dist/tokens.css');
