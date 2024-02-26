module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['script/*'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'parameter',
        format: [],
        leadingUnderscore: 'allow',
      },

      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-implicit-coercion': ['error', { boolean: false }],
    'object-shorthand': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        semi: true,
        bracketSpacing: true,
      },
    ],
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/alt-text': 'off',
    '@next/next/no-img-element': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    'no-empty-pattern': 'warn',
  },
};
