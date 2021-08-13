import fs from 'fs'
import assert from 'assert'

import { mkdirp, mkdirpSync } from '../src/mkdir'
import { syncFolder } from './utils/sync-folder-util'

let folderPath 

;(async () => {
  folderPath = await syncFolder()
})()

describe('mkdir module', () => {
  afterEach(() => {
    fs.rmdirSync(folderPath, { recursive: true })
  })

  it('should work with async', async () => {    
    await mkdirp(folderPath)
    fs.statSync(folderPath)
    return
  })

  it('should work with sync', () => {
    mkdirpSync(folderPath)
    fs.statSync(folderPath)
  })

  it('should use options.mode with async', async () => {
    await mkdirp(folderPath, { mode: 0o600 })
    const stats = fs.statSync(folderPath)
    console.log(stats.mode);
    
    assert.strictEqual(stats.mode & 0o600, 0o600)
  })

  it('should use options.mode with sync', async () => {
    mkdirpSync(folderPath, { mode: 0o600 })
    const stats = fs.statSync(folderPath)
    assert.strictEqual(stats.mode & 0o600, 0o600)
  })
})
