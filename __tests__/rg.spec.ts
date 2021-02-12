import { resolve } from 'path';

import { ripGrep as rg } from '../src/index';
import { Match } from '../src/types';

function fixtureDir(name: string) {
  return resolve(__dirname, '../__fixtures__', name);
}

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
    const resolution = await rg(fixtureDir('single-file-with-foo'), 'foo');

    expect(resolution).toBeInstanceOf(Array);

    resolution.forEach(function (match) {
      expect(match).toBeInstanceOf(Match);
    });
  });

  test('returns an empty array when there are no matches', async function () {
    const result = await rg(fixtureDir('single-file-with-foo'), 'bar');

    expect(result).toEqual([]);
  });

  test('combines results from multiple files', async function () {
    const result = await rg(fixtureDir('multiple-files-with-foo'), 'foo');

    expect(result.length).toBe(2);
  });

  test('can use a regex to make a search', async function () {
    const result = await rg(fixtureDir('single-file-with-foo'), {
      regex: 'fo{2}',
    });

    expect(result.length).toBe(1);
  });

  test('can provide a search string through the `options` object', async function () {
    const result = await rg(fixtureDir('single-file-with-foo'), { string: 'foo' });

    expect(result.length).toBe(1);
  });

  test('can add glob patterns to limit search results', async function () {
    const result = await rg(fixtureDir('glob-ignore'), {
      string: 'foo',
      globs: ['!ignore-this-directory/**', '!ignore-this-directory-too/**'],
    });

    expect(result.length).toBe(1);
  });

  test('can provide file type to search by', async function () {
    const result = await rg(fixtureDir('single-file-with-foo'), {
      string: 'foo',
      fileType: 'html',
    });

    expect(result.length).toBe(0);
  });
});

describe('Match class', function () {
  let result: Match;

  beforeEach(async function () {
    const allResults = await rg(fixtureDir('single-file-with-foo'), 'foo');

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
