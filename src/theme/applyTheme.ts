import { themeToCssVars } from './cssVars';
import type { Theme } from './types';

const isDocument = (value: Document | HTMLElement): value is Document => {
  return 'documentElement' in value;
};

const resolveTarget = (target?: Document | HTMLElement) => {
  if (target) {
    return isDocument(target) ? target.documentElement : target;
  }

  if (typeof document === 'undefined') {
    throw new Error('applyTheme requires a Document or HTMLElement target.');
  }

  return document.documentElement;
};

export const applyTheme = (theme: Theme, target?: Document | HTMLElement) => {
  const root = resolveTarget(target);
  const vars = themeToCssVars(theme);

  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }

  return vars;
};
