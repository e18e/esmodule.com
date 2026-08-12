---
title: esbuild
stack: Bundler
description: Switch an esbuild build to ESM output and drop the CommonJS bundle.
---

esbuild is a lightning-fast JavaScript bundler built in Go. It handles ESM natively
and makes converting to ESM-only output straightforward. Most of the work here is
removing the CommonJS output you no longer need.

## 1. Mark the package as ESM

Add `type: "module"` to your `package.json`. Every `.js` file in the package is
now an ES module.

```json
{
	"name": "my-package",
	"type": "module"
}
```

Any file that genuinely still has to be CommonJS (e.g. a config file for an older
tool) can keep the `.cjs` extension.

## 2. Emit a single ESM bundle

Configure esbuild to output only ESM format. If you have an esbuild config file,
update it to remove the CommonJS output:

```js
import * as esbuild from 'esbuild';

await esbuild.build({
	entryPoints: ['src/index.js'],
	bundle: true,
	format: 'esm',
	outfile: 'dist/index.js'
});
```

If you were previously building both CJS and ESM formats, remove the separate
build step or output for CommonJS.

## 3. Point `exports` at the bundle

Replace `main` with an `exports` field. This is what lets Node.js and bundlers
resolve your package, and it stops deep imports into your `dist` folder from
becoming part of your public API by accident.

```json
{
	"exports": {
		".": "./dist/index.js"
	},
	"files": ["dist"]
}
```

## 4. Check the result

Run [publint](https://publint.dev) to catch problems with leftover CommonJS
references, publishing config, etc.

```sh
npx publint
```
