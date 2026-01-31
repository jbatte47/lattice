/* global URL, console */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

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

await mkdir(dirname(outPath.pathname), { recursive: true });
await writeFile(outPath, css, 'utf8');

console.log('Generated dist/tokens.css');
