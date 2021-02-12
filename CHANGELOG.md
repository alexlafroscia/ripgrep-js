# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/alexlafroscia/ripgrep-js/compare/v1.1.0...v2.0.0) (2021-02-12)

### ⚠ BREAKING CHANGES

- The search function is now exported as a named function, rather than as the default. This is easier for bundlers and developers, as named exports help promote auto-importing modules and things of that nature.
- No longer testing against Node versions below 14

- convert library to TypeScript ([21910e2](https://github.com/alexlafroscia/ripgrep-js/commit/21910e260b91195dec3dcf3d217a1cf5727283c9))
- use Volta to provide Node ([3b94651](https://github.com/alexlafroscia/ripgrep-js/commit/3b94651efc457d40d625b0ece59c6c8d7c5acf0d))
