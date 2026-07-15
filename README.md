# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Server Deploy (No Node.js)

This project is deployed as a static build (Vite `dist/`). The server does not need Node.js.

### One-time server setup (Apache)

```bash
cd /home/u619583079/domains/m2phenom.ahriat.com/public_html
rm -rf ./*
git clone -b deploy --single-branch https://github.com/Abdul-Rehman06/m2phenom.git .
```

### Publish a new deploy build (Windows)

```powershell
npm run publish:deploy
```

### Update server to latest build

```bash
cd /home/u619583079/domains/m2phenom.ahriat.com/public_html
git pull origin deploy
```
