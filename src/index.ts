import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd, env } from 'node:process'

import { createUnplugin } from 'unplugin'
import whistle from 'whistle'

import { getGreenText, getRedText, getUnderlineText } from './utils/log'
import { setRule } from './utils/whistle'

const DEFAULT_PORT = 9000
const DEFAULT_RULE_PATH = './proxy-rule'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const packageJson = JSON.parse(readFileSync(resolve(cwd(), 'package.json'), 'utf-8'))

  const port = options?.port || DEFAULT_PORT
  const uiport = options?.uiport || port

  const ruleKey = `[auto]${packageJson.name || 'unplugin-whistle-proxy'}`
  const rulePath = resolve(cwd(), options?.rulePath || DEFAULT_RULE_PATH)
  const rules = { [ruleKey]: readFileSync(rulePath, 'utf-8') }

  return {
    name: 'unplugin-whistle-proxy',
    buildStart() {
      try {
        // If it is a production environment, do not start whistle proxy server
        if (env.NODE_ENV === 'production') {
          return
        }

        // Start whistle proxy server
        whistle({
          ...options,
          port,
          uiport,
          rules,
        })

        // Select the rule
        setRule({
          uiport,
          ruleKey,
          ruleValue: rules[ruleKey],
        })

        // Print necessary information to the console
        console.log(`${getGreenText('[unplugin-whistle-proxy]')} Whistle proxy server started on port ${port}`)
        console.log(`${getGreenText('[unplugin-whistle-proxy]')} Visit ${getUnderlineText(`http://localhost:${uiport}`)} to manage proxy rules`)
      }
      catch (err) {
        console.error(`${getRedText('[unplugin-whistle-proxy]')} Failed to start whistle proxy:`, err)
      }
    },
    watchChange(id) {
      if (id !== rulePath) {
        return
      }
      const ruleValue = readFileSync(rulePath, 'utf-8')
      rules[ruleKey] = ruleValue
      setRule({
        uiport,
        ruleKey,
        ruleValue,
      })
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
