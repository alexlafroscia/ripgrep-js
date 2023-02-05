# `file-fixture-factory`

> Declaratively create real file system fixtures in Node.js

Many times, when writing tests, you need to scaffold out files in a directory to run your tests again. You can manually creates these folder structures as part of our repository, but there are some downsides to this:

1. You frequently have to bounce between your test files, that read these directories, and the fixtures themselves, which define them
2. Naming, locating, reading and writing fixtures can be a pain

This package aims to address these problems by allowing your tests to declare the fixture structure that they require in the code itself, allowing the library to handle the creation of the files for you.

## Installation and Usage

The package can be installed from `npm` under the name `file-fixture-factory`:

```bash
yarn add -D file-fixture-factory
```

Note: this package is tested against Node 14, the current LTS release at the time of writing. Other versions might work, but your results may vary!

## Usage

Below is an example Jest test that shows how you might use this library in a test file.

```typescript
import { Factory } from 'file-fixture-factory';

// Create a "factory" with a unique name, to help name the underlying directory that will be created
const factory = new Factory('demo-test-module');

afterAll(async function () {
  // After all the tests in this module have run, clean up all the temp directories
  await factory.disposeAll();
});

test('reading and writing files', async () => {
  // Use an object structure to define the contents of the directory
  // Nested objects are supported for sub-directories
  const tempDir = await factory.createStructure({
    'README.md': '# Hello, World!',
    src: {
      'index.html': '<h1>A nested file!</h1>',
    },
  });

  // Interact with the `tempDir` object to work with the files

  // `path` returns the full path for a file
  expect(tempDir.path('src/index.html')).toContain('/src/index.html');

  // `read` resolves to the contents of a file
  expect(await tempDir.read('src/index.html')).toBe('<h1>A nested file!</h1>');

  // `write` allows for writing additional files to the location
  await tempDir.write('src/index.css', '.some-class {}');
});
```

## Debugging

This package uses the `debug` library for logging under the `fff` namespace. To print information about the files being created, prefix whatever command runs your code with `DEBUG=fff:*` like so:

```bash
DEBUG=fff:* yarn test
```

## Other Useful Packages

- [`theredoc`](https://github.com/testdouble/theredoc) - Allows for cleanly writing multi-line strings using template literals. Can be handy for more complex files in your fixtures.
