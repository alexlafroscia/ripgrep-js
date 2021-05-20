# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/alexlafroscia/ripgrep-js/compare/v2.3.0...v3.0.0) (2021-05-20)

### ⚠ BREAKING CHANGES

- The output of the search command is now different; it's a JSON representation that matches the format that RipGrep itself produces exactly.

- remove custom `Match` class ([939ff87](https://github.com/alexlafroscia/ripgrep-js/commit/939ff87e16ff41f9dc8195b1cafbef018d55e260))

## [2.3.0](https://github.com/alexlafroscia/ripgrep-js/compare/v2.2.0...v2.3.0) (2021-05-20)

### Features

- support multi-line searching option ([eff9453](https://github.com/alexlafroscia/ripgrep-js/commit/eff94531ef1daedf7c386873d7133481a32fe299))

## [2.2.0](https://github.com/alexlafroscia/ripgrep-js/compare/v2.1.0...v2.2.0) (2021-02-12)

### Features

- support filtering by file type ([62ad760](https://github.com/alexlafroscia/ripgrep-js/commit/62ad760cba1f4d0c9831a69d12c0a4b9e71ac1fb))

## [2.1.0](https://github.com/alexlafroscia/ripgrep-js/compare/v2.0.0...v2.1.0) (2021-02-12)

### Features

- add debug logging ([4b9e54a](https://github.com/alexlafroscia/ripgrep-js/commit/4b9e54a2ec081d69d6af9c87d1aeab7624b2c9f1))

## [2.0.0](https://github.com/alexlafroscia/ripgrep-js/compare/v1.1.0...v2.0.0) (2021-02-12)

### ⚠ BREAKING CHANGES

- The search function is now exported as a named function, rather than as the default. This is easier for bundlers and developers, as named exports help promote auto-importing modules and things of that nature.
- No longer testing against Node versions below 14

- convert library to TypeScript ([21910e2](https://github.com/alexlafroscia/ripgrep-js/commit/21910e260b91195dec3dcf3d217a1cf5727283c9))
- use Volta to provide Node ([3b94651](https://github.com/alexlafroscia/ripgrep-js/commit/3b94651efc457d40d625b0ece59c6c8d7c5acf0d))
