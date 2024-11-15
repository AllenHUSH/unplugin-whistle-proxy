import type { WhistleOptions } from 'whistle'

export interface Options extends WhistleOptions {
  /**
   * Rule file path
   * @default './proxy-rule'
   */
  rulePath?: string
}
