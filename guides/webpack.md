---
title: Webpack
stack: Bundler
description: Update webpack to output ES Modules
---

webpack is one of the early bundlers for the JavaScript ecosystem. Currently, support for ESM-format outputs is still under `experiements`

## 1. Mark the package as ESM

Add `type: "module"` to your `package.json`. Every `.js` file in the package is
now treated as an ES module.

```json
{
	"name": "my-package",
	"type": "module"
}
```

Any file that genuinely still has to be CommonJS (for example, a legacy config
file for another tool) can keep the `.cjs` extension.

## 2. Emit a single ESM bundle

In webpack 5, enable module output and set the library to `module`:

```js
export default {
	mode: 'production',
	entry: './src/index.js',
	experiments: {
		outputModule: true
	},
	output: {
		filename: 'index.js',
		module: true,
		library: {
			type: 'module'
		},
		chunkFormat: 'module'
	}
};
```

If you had a separate CommonJS build, remove it and keep just the ESM output.
For config files that must stay CommonJS, rename them to `.cjs` instead of `.js`.

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
references, publishing config, and other package metadata issues.

```sh
npx publint
```