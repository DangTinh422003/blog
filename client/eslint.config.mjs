import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@lexical/recommended',
  ),
  ...compat.plugins('immer', 'import', 'simple-import-sort', '@typescript-eslint', 'readable-tailwind'),
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      semi: 'warn',
      curly: ['error', 'multi-line'],
      'prettier/prettier': 'warn',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsForRegex: ['^draft', 'state'],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/jsx-wrap-multilines': [
        'error',
        {
          prop: 'ignore',
        },
      ],
      'react/state-in-constructor': ['error', 'never'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function', 'function-declaration', 'function-expression'],
          unnamedComponents: 'arrow-function',
        },
      ],
      'immer/no-update-map': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/extensions': ['error', 'never'],
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      'readable-tailwind/multiline': [
        'warn',
        {
          callees: ['tw', 'twMerge', 'cva', 'cn', 'clsx'],
          printWidth: 80,
        },
      ],
      'readable-tailwind/no-unnecessary-whitespace': [
        'error',
        {
          callees: ['tw', 'twMerge', 'cva', 'cn', 'clsx'],
        },
      ],
      'readable-tailwind/sort-classes': [
        0,
        {
          callees: ['tw', 'twMerge', 'cva', 'cn', 'clsx'],
        },
      ],
      'readable-tailwind/no-duplicate-classes': [
        'error',
        {
          callees: ['tw', 'twMerge', 'cva', 'cn', 'clsx'],
        },
      ],
    },
  },
];

export default eslintConfig;
