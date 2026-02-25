declare module 'pg' {
  export interface PoolConfig {
    host?: string
    port?: number
    database?: string
    user?: string
    password?: string
  }

  export class Pool {
    constructor(config?: PoolConfig)
    query(text: string, values?: any[]): Promise<any>
    on(event: string, callback: (err: Error) => void): void
    end(): Promise<void>
  }
}
