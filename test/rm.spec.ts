import fs from 'fs'
import assert from 'assert'

import { rm } from '../src/rm'
import { syncFolder } from './utils/sync-folder-util'
import { mkdirp } from '../src/mkdir';

let folderPath 

;(async () => {
  folderPath = await syncFolder()
  await mkdirp(folderPath)
})()

describe('rm', () => {
  it('should work with async', async () => {
    await rm(folderPath)
    assert(!fs.existsSync(folderPath))
  })
})
