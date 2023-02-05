# `@movable/prettier-config`

## Installation

If you run the Yeoman generator, the installation will be run for you:

```bash
yarn create @movable/lint-config
```

---

If you want to configure Prettier manually, add it to your `devDependencies` by running:

```bash
yarn add -D @movable/prettier-config prettier
```

You should then set up Prettier to use the configuration by creating a file called `.prettierrc` with the following contents:

```txt
"@movable/prettier-config"
```

This ensures that not only the ESLint configuration will use the shared configuration, but also any tooling like `vscode-prettier` or `coc.nvim`.
