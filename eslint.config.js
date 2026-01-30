import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...react.configs['flat/recommended'],
    plugins: {
      ...(react.configs['flat/recommended']?.plugins ?? { react }),
      'react-hooks': reactHooks,
    },
    settings: {
      ...(react.configs['flat/recommended']?.settings ?? {}),
      react: {
        ...(react.configs['flat/recommended']?.settings?.react ?? {}),
        version: 'detect',
      },
    },
    rules: {
      ...(react.configs['flat/recommended']?.rules ?? {}),
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettier,
];
