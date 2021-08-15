import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import ms from 'ms'

import { mkdirpSync, mkdirp } from './mkdir'
import { randomStr } from './temp-path'
import { cp } from './cp'

const execute = promisify(exec)

type Config = {
  name?: string
  maxAge?: string|number
  interval?: string|number
}

export class Cache {
  tmpdir: string
  maxAge: string
  interval: string
  intervalRef: unknown
  static tmpCacheDir = path.join(tmpdir(), 'fs-helpers-lru-cache')

  constructor(options: Config) {
    const folder = this.tmpdir = path.join(Cache.tmpCacheDir, options.name || randomStr())
    mkdirpSync(folder)

    this.maxAge = ms(parseInt(options.maxAge as string || '30m', 10))
    this.interval = ms(parseInt(options.interval  as string || '30m', 10))

    this.intervalRef = setInterval(() => { this.reap() }, +this.interval)
    this.reap()
  }

  /**
   * CleanUp all caches.
   */
  static async cleanUp() {
    await fs.rmdir(Cache.tmpCacheDir, { recursive: true })
    mkdirpSync(Cache.tmpCacheDir)
  }

  /**
   * Delete all old data.
   */
  async reap() {
    try {
      const age = Math.round((+this.maxAge) / 1000 / 1000)
      await execute(`find "${this.tmpdir}" -mmin +${age} -type f -delete;`)
    } catch (error) {
      if (!error) return
      if (~error.message.indexOf('No such file or directory')) return
      console.error(error.stack)
    }
  }

  /**
   * Get the filename of an id.
   */
  filename(id: string) {
    return path.join(this.tmpdir, id)
  }

  /**
   * Set a raw value.
   */
  async set(id: string, value: any) {
    const filename = this.filename(id)
    await fs.writeFile(filename, value)
    return filename
  }

  /**
   * Get a raw value.
   */
  async get(id: string) {
    try {
      const filename = this.filename(id)
      const value = await fs.readFile(filename)
      await this.#update(filename)
      return value
    } catch (error) {} // eslint-disable-line no-empty
  }

  /**
   * @private
   */
  async #update(filename: string) {
    const date = new Date()
    await fs.utimes(filename, date, date).catch(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  }

  /**
   * Check whether the object exists.
   * If it does, update its atime.
   */
  async access(id: string) {
    try {
      const filename = this.filename(id)
      await fs.stat(filename)
      await this.#update(filename)
      return filename
    } catch (error) {} // eslint-disable-line no-empty
  }

  /**
   * Move a file to this id.
   */
  async move(id: string, source: string) {
    const filename = this.filename(id)
    await fs.rename(path.resolve(source), filename)
    return filename
  }

  /**
   * Copy a file or a stream to this id.
   */
  copy(id: string, source: string) {
    const filename = this.filename(id)
    return cp(source, filename)
  }

  /**
   * Clear the entire cache or just a value.
   */
  async clear(id?: string) {
    if (!id) {      
      await fs.rmdir(this.tmpdir, { recursive: true })
      await mkdirp(this.tmpdir)
      return
    }

    const filename = this.filename(id)    
    await fs.unlink(filename).catch(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  }
}
