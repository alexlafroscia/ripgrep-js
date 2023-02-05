'use strict';

const path = require('path');
const { ESLint } = require('eslint');

test('it uses the right basic configuration', async () => {
  const eslint = new ESLint();
  const config = await eslint.calculateConfigForFile(
    path.resolve(__dirname, './fixtures/normal-project/index.ts')
  );

  expect(config.parser).toBe(require.resolve('@typescript-eslint/parser'));
  expect(config.parserOptions.ecmaFeatures).toEqual({
    legacyDecorators: true,
  });

  expect(config.plugins).toEqual([
    'prettier',
    'no-unsanitized',
    '@movable/no-wildcard-postmessage',
    '@typescript-eslint',
  ]);

  // Recommended TS config is applied
  expect(config.rules['no-unused-vars']).toEqual(['off']);

  expect(config.rules['prettier/prettier']).toEqual(['error']);
});

test('it uses the right test configuration', async () => {
  const eslint = new ESLint();
  const config = await eslint.calculateConfigForFile(
    path.resolve(__dirname, './fixtures/normal-project/tests/index-test.ts')
  );

  expect(config.rules['@typescript-eslint/no-empty-function']).toEqual(['off']);
});
