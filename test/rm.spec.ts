import fs from 'fs'
import assert from 'assert'

import { rm, rmSync } from '../src/rm'
import { syncFolder } from './utils/sync-folder-util'
import { mkdirp } from '../src/mkdir';

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
