# [ripgrep][ripgrep]-js

> A Node.js wrapper around [ripgrep][ripgrep]

**Note:** I have nothing to do with `ripgrep` or the search functionality of this JS library.  This is only a wrapper to expose `ripgrep` results in Node.js.  All credit for the underlying tool go to [`@BurntSushi`][burntsushi] and the lovely contributors to his project.

## Usage

```javascript
const rg = require('ripgrep-js');

// Give `rg` an absolute path to search in and the search term
rg('path/to/search', 'foo').then((result) => {
  // `result` is an array of matches
  const [ firstMatch ] = results;

  // Match info provided by each result object
  const { file, column, line, match } = firstMatch;
});
```

[ripgrep]: https://github.com/BurntSushi/ripgrep
[burntsushi]: https://github.com/BurntSushi
