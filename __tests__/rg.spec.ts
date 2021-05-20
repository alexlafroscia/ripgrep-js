import { Factory } from 'file-fixture-factory';

import { ripGrep as rg } from '../src/index';
import { Match } from '../src/types';

const factory = new Factory('ripgrep-js');

afterAll(async function () {
  await factory.disposeAll();
});

describe('input validation', function () {
  test('requires that a CWD is provided', async function () {
    // @ts-expect-error
    await expect(rg()).rejects.toThrow('No `cwd` provided');
  });

  test('requires that a search term is provided', async function () {
    // @ts-expect-error
    await expect(rg('foo')).rejects.toThrow('No search term provided');
  });
});

describe('search api', function () {
  test('returns an array of matches', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
    });
    const resolution = await rg(temp.dir, 'foo');

    expect(resolution).toBeInstanceOf(Array);

    resolution.forEach(function (match) {
      expect(match).toBeInstanceOf(Match);
    });
  });

  test('returns an empty array when there are no matches', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
    });
    const result = await rg(temp.dir, 'bar');

    expect(result).toEqual([]);
  });

  test('combines results from multiple files', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
      'other.txt': 'foo',
    });
    const result = await rg(temp.dir, 'foo');

    expect(result.length).toBe(2);
  });

  test('handling multiple results in one file', async function () {
    const temp = await factory.createStructure({
      'foo.txt': `
        foo
        foo
      `,
    });
    const result = await rg(temp.dir, 'foo');

    expect(result.length).toBe(2);
  });

  test('can use a regex to make a search', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
    });
    const result = await rg(temp.dir, {
      regex: 'fo{2}',
    });

    expect(result.length).toBe(1);
  });

  test('can provide a search string through the `options` object', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
    });
    const result = await rg(temp.dir, { string: 'foo' });

    expect(result.length).toBe(1);
  });

  test('can add glob patterns to limit search results', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
      'ignore-this-directory': {
        'foo.txt': 'foo',
      },
      'ignore-this-directory-too': {
        'foo.txt': 'foo',
      },
    });
    const result = await rg(temp.dir, {
      string: 'foo',
      globs: ['!ignore-this-directory/**', '!ignore-this-directory-too/**'],
    });

    expect(result.length).toBe(1);
  });

  test('can provide file type to search by', async function () {
    const temp = await factory.createStructure({
      'foo.txt': 'foo',
    });
    const result = await rg(temp.dir, {
      string: 'foo',
      fileType: 'html',
    });

    expect(result.length).toBe(0);
  });

  test('can perform a multi-line search', async function () {
    const temp = await factory.createStructure({
      'foo.txt': `
        foo
        bar
      `,
    });
    const result = await rg(temp.dir, {
      regex: '"foo\\n(\\s*)bar"',
      multiline: true,
    });

    expect(result.length).toBe(1);
  });
});

describe('Match class', function () {
  let result: Match;

  beforeAll(async function () {
    const temp = await factory.createStructure({
      'file.txt': 'foo',
    });
    const allResults = await rg(temp.dir, 'foo');

    result = allResults[0];
  });

  test('contains the file name of the match', function () {
    expect(result.file).toBe('file.txt');
  });

  test('contains the matches text', function () {
    expect(result.match).toBe('foo');
  });

  test('contains the line number of the match', function () {
    expect(result.line).toBe(1);
  });

  test('contains the column number of the match', function () {
    expect(result.column).toBe(1);
  });
});
