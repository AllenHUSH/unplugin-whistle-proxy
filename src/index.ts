import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { createUnplugin } from 'unplugin'
import whistle from 'whistle'

const getGreenText = (text: string) => `\x1B[32m${text}\x1B[0m`
const getRedText = (text: string) => `\x1B[31m${text}\x1B[0m`
const getUnderlineText = (text: string) => `\x1B[4m${text}\x1B[0m`

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-whistle-proxy',
  buildStart() {
    try {
      const packageJson = JSON.parse(readFileSync(resolve(cwd(), 'package.json'), 'utf-8'))

      const port = options?.port || 9000
      const uiport = options?.uiport || port

      const ruleKey = `[auto]${packageJson.name}`
      const rulePath = options?.rulePath || './proxy-rule'
      const ruleValue = readFileSync(resolve(cwd(), rulePath), 'utf-8')
      const rules = { [ruleKey]: ruleValue }

      // Start whistle proxy server
      whistle({
        ...options,
        port,
        uiport,
        rules,
      })

      // Select the rule
      fetch(`http://localhost:${uiport}/cgi-bin/rules/select`, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `name=${ruleKey}&value=${encodeURIComponent(ruleValue)}`,
        method: 'POST',
      })

      // Print necessary information to the console
      console.log(`${getGreenText('[unplugin-whistle-proxy]')} Whistle proxy server started on port ${port}`)
      console.log(`${getGreenText('[unplugin-whistle-proxy]')} Visit ${getUnderlineText(`http://localhost:${uiport}`)} to manage proxy rules`)
    }
    catch (err) {
      console.error(`${getRedText('[unplugin-whistle-proxy]')} Failed to start whistle proxy:`, err)
    }
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
