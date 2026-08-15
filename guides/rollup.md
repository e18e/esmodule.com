---
title: Rollup
stack: Bundler
description: Switch a Rollup build to ESM output and drop the CommonJS bundle.
---

Rollup has been ESM-first since the beginning, so most of the work here is
removing the CommonJS output you no longer need.

## 1. Mark the package as ESM

Add `type: "module"` to your `package.json`. Every `.js` file in the package is
now treated as an ES module.

```json
{
	"name": "my-package",
	"type": "module"
}
```

Any file that genuinely still has to be CommonJS (e.g. a config file for an older
tool) can keep the `.cjs` extension.

## 2. Emit a single ESM bundle

Drop the `cjs` entry from your output config:

```ts
export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'es'
	}
};
```

If you were using `output` as an array to emit both formats, it can go back to
being a single object.

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
