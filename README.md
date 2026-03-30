# Turbopack: `browserslist-rs` data mismatch causes panic on `**` operator

Minimal reproduction for a Turbopack bug where stale browser data in the Rust `browserslist-rs` crate causes all SWC compat transforms to be enabled unnecessarily, triggering a panic in the ES2015 generator transform on the `**` (exponentiation) operator.

## Reproduction

```bash
npm install
npm run dev
# Visit http://localhost:3000 -> 500 error with panic
```

## Root cause

1. Next.js resolves the browserslist query on the JS side using up-to-date `caniuse-lite` data (knows Chrome 146, Firefox 148, etc.)
2. The resolved browser strings are sent to Turbopack, which re-resolves them using the Rust `browserslist-rs` crate (v0.19.0, bundled data only knows up to ~Chrome 141)
3. Unknown versions are silently dropped (`ignore_unknown_versions: true`), returning an empty distribution list
4. `is_any_target()` returns `true` (all versions are `None`), enabling every SWC compat transform
5. The ES2015 generator transform encounters `10n ** 18n` in `permissionless` and panics at `todo!("right-associative binary expression")`

## Workaround

Use webpack: `npm run dev:webpack`
