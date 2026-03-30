# Turbopack: BigInt exponentiation operator causes panic in generator transform

Minimal reproduction for a Turbopack bug where the `**` (exponentiation) operator in `node_modules` causes a Rust panic when `compiler.styledComponents` is enabled.

## Reproduction

```bash
npm install
npm run dev    # starts with --turbopack
# Visit http://localhost:3000 -> 500 error
```

## What happens

Turbopack panics at `swc_ecma_compat_es2015/src/generator.rs:507`:

```
not yet implemented: right-associative binary expression
```

The `**` operator is the only right-associative binary operator in JavaScript. SWC's ES2015 generator transform has a `todo!()` for it instead of an implementation.

## Trigger conditions

1. `compiler: { styledComponents: true }` in `next.config.ts`
2. `styled-components` installed as a dependency
3. Any `node_modules` code using the `**` operator (here: `permissionless` uses `10n ** 18n`)

## Workaround

Use `--webpack` instead of `--turbopack`:

```bash
npm run dev:webpack
```
