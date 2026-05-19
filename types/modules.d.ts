declare module 'react-scroll'

declare module 'node-statsd' {
  interface StatsDOptions {
    host?: string
    port?: number
    prefix?: string
  }

  class StatsD {
    constructor(options?: StatsDOptions)
    increment(stat: string, value?: number): void
    timing(stat: string, time: number): void
  }

  export { StatsD }
}
