# `@movable/eslint-config`

## Installation

The easiest way to set up this configuration is to leverage the Yeoman generator by running the following in the root of your project:

```bash
yarn create @movable/lint-config
```

This will ask you some questions about your project and set up the configuration for you based on the answers.

---

If you want to configure your project manually, you can do the following:

Add this package, as well as ESLint and Prettier, to your `devDependencies` by running:

```bash
yarn add -D @movable/eslint-config
```

## Configuration

A few ESLint configurations are provided, based on the kind of environment you are working in.

- [Base (`@movable/eslint-config`)](./index.js')
- [Node (`@movable/eslint-config-node`)](../node/index.js')
- [Ember (`@movable/eslint-config-ember`)](../ember/index.js')
- [React (`@movable/eslint-config-react`)](../react/index.js')

This sets up some shared rules, as well as configuring ESLint to run Prettier (so that both projects do not have to be run independently). You can extend from the base configuration like so:

```json
{
  "extends": "@movable/eslint-config"
}
```

Environment-specific packages can be included as well to better suit different use-cases. Note that each one is its own Node dependency and must be installed individually.

```json
{
  "extends": ["@movable/eslint-config", "@movable/eslint-config-node"]
}
```

## Linting Your Project

It is recommended that you add the following `package.json` to create an easy way to run ESLint from the command line:

```diff
{
  "scripts": {
+   "lint": "eslint ."
  }
}
```

This allows you to run the following:

```bash
yarn lint # Report errors in your project
yarn lint --fix # Fix anything that can be fixed automatically, and report everything else
```
