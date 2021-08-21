import fs from 'fs'
import assert from 'assert'

import { rm, rmSync, mkdirp } from '../src'
import { syncFolder } from './utils/sync-folder-util'

let folderPath 

;(async () => {
  folderPath = await syncFolder()
  await mkdirp(folderPath)
})()

describe('rm', () => {
  it('async', async () => {
    await rm(folderPath)
    assert(!fs.existsSync(folderPath))
  })

  it('sync', async () => {
    await mkdirp(folderPath)
    rmSync(folderPath)
    assert(!fs.existsSync(folderPath))
  })
})
