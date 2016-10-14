# [ripgrep][ripgrep]-js

> A Node.js wrapper around [ripgrep][ripgrep]

**Note:** I have nothing to do with `ripgrep` or the search functionality of this JS library.  This is only a wrapper to expose `ripgrep` results in Node.js.  All credit for the underlying tool go to [`@BurntSushi`][burntsushi] and the lovely contributors to the original project.

**Also Note:** `ripgrep` must be installed somewhere in your `$PATH` for this to work.

## Usage

```javascript
const rg = require('ripgrep-js');

// Give `rg` an absolute path to search in and the search term
rg('path/to/search', 'foo').then((result) => {
  // `result` is an array of matches
  const [ firstMatch ] = results;

  // Match info provided by each result object
  firstMatch.file;
  firstMatch.line;
  firstMatch.column;
  firstMatch.match;
});
```

You can also pass an object as the second argument, which supports the following keys:

- **regex: string** A regex pattern to match by. Note: this is a Rust-flavored regex pattern, not a JS one
- **string: string** A string to match by. Same as passing a string as the second argument.
- **globs: Array\<string\>** An array of glob patterns to limit the results by

For further details and information, you can find real usage examples in `test/test.js`.

[ripgrep]: https://github.com/BurntSushi/ripgrep
[burntsushi]: https://github.com/BurntSushi
