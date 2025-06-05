import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        before: 'writable',
        after: 'writable'
      }
    },
    rules: {
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: { project: './tsconfig.json' },
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
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
    ignores: ['htmldiff-cli.js', '**/*.d.ts']
  }
];
