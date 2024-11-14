# unplugin-whistle-proxy

[![NPM version](https://img.shields.io/npm/v/unplugin-whistle-proxy?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-whistle-proxy)

> Starter template for [unplugin](https://github.com/unjs/unplugin).

## What's this?
A simple plugin for whistle proxy.

Start a whistle proxy server when developing, and automatically select the rule.

## Install

```bash
npm i unplugin-whistle-proxy --dev
pnpm add unplugin-whistle-proxy -D
yarn add unplugin-whistle-proxy -D
```

Create a `proxy-rule` file in the root directory of your project.

```plaintext
// proxy-rule
helloworld.com localhost:5173
```

And then add the following code to enable the plugin.

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import whistle from 'unplugin-whistle-proxy/vite'

export default defineConfig({
  plugins: [
    whistle({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import whistle from 'unplugin-whistle-proxy/rollup'

export default {
  plugins: [
    whistle({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-whistle-proxy/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-whistle-proxy/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-whistle-proxy/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import whistle from 'unplugin-whistle-proxy/esbuild'

build({
  plugins: [whistle()],
})
```

<br></details>
