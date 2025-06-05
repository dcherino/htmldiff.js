import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: { project: './tsconfig.json' },
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jsdoc: jsdocPlugin
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/restrict-template-expressions': ['off', { allowBoolean: true, allowAny: true }],
      'no-case-declarations': 'off',
      'jsdoc/require-jsdoc': ['warn', {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true
        },
        contexts: [
          'Property',
          'ClassProperty:not([accessibility="private"])',
          'TSMethodSignature',
          'TSEnumDeclaration',
          'TSInterfaceDeclaration',
          'TSTypeAliasDeclaration',
          '-TSPropertySignature',
          'ExportNamedDeclaration'
        ],
        checkGetters: true,
        checkSetters: true,
        exemptEmptyConstructors: true
      }],
      'jsdoc/newline-after-description': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/no-undefined-types': 'warn'
    }
  },
  {
    ignores: ['*.js', '*.d.ts']
  }
];
