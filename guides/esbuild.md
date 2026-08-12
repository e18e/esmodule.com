---
title: esbuild
stack: Bundler
description: Update from cjs to esm output in esbuild
---

esbuild is a JavaScript bundler built in Go. It handles ESM natively and bundles for the browser out of the box. Most of the work here is removing the CommonJS output you no longer need.

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

Since the default for esbuild is esm, you can omit the `format` parameter if you've previously defined `cjs` as its value.

```js
import * as esbuild from 'esbuild';

await esbuild.build({
	entryPoints: ['src/index.js'],
	bundle: true,
	outfile: 'dist/index.js'
});
```

Alternatively, if you are using the cli:

```bash
esbuild "src/index.js" --bundle --outfile="dist/index.js"
```

If you were previously building both CJS and ESM formats, remove the separate
build step or output for CommonJS.

### "platform" flag

If you are using the `platform` parameter with the value of `node` and `bundle` is set to true, this will default to the `cjs` format. In this case, you need to explicitly define the `format` to `esm`:

```js
import * as esbuild from 'esbuild';

await esbuild.build({
	entryPoints: ['src/index.js'],
	platform: 'node',
	bundle: true,
	format: 'esm',
	outfile: 'dist/index.js'
});
```

and in the cli:

```bash
esbuild "src/index.js" --platform=node --bundle --format=esm --outfile="dist/index.js"
```

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
