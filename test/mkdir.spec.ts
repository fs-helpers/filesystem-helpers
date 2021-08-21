import fs from 'fs'
import assert from 'assert'

import { mkdirp, mkdirpSync } from '../src'
import { syncFolder } from './utils/sync-folder-util'

let folderPath: string 

;(async () => {
  folderPath = await syncFolder()
})()

describe('mkdir module', () => {
  afterEach(() => {
    fs.rmdirSync(folderPath, { recursive: true })
  })

  it('async', async () => {    
    await mkdirp(folderPath)
    fs.statSync(folderPath)
    return
  })

  it('sync', () => {
    mkdirpSync(folderPath)
    fs.statSync(folderPath)
  })

  it('async with multipaths', async () => {    
    await mkdirp([folderPath, folderPath + '2'])
    fs.statSync(folderPath + '2')
    return
  })

  it('sync with multipaths', () => {
    mkdirpSync([folderPath, folderPath + '2'])
    fs.statSync(folderPath + '2')
  })

  it('should use options.mode with async', async () => {
    await mkdirp(folderPath, { mode: 0o600 })
    const stats = fs.statSync(folderPath)
    
    assert.strictEqual(stats.mode & 0o600, 0o600)
  })

  it('should use options.mode with sync', async () => {
    mkdirpSync(folderPath, { mode: 0o600 })
    const stats = fs.statSync(folderPath)
    assert.strictEqual(stats.mode & 0o600, 0o600)
  })
})
