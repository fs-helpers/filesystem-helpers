import fs from 'fs'
import path from 'path'
import assert from 'assert'

import { mkdirp } from '../src/mkdir'
import { cp } from '../src/cp'
import { rm } from '../src/rm'

const folderPath = path.resolve('any-folder')

;(async () => {
  await rm(folderPath)
  await mkdirp(folderPath)
})()

describe('cp module', function () {
  it('should copy a string', async function () {
    const out = path.join(folderPath, 'test.js')
    const _out = await cp(__filename, out)
    assert.strictEqual(out, _out);
    fs.statSync(out)
  })

  it('should copy a stream', async () => {
    const out = path.join(folderPath, 'test2.js')
    const _out = await cp(fs.createReadStream(__filename), out)
    assert.strictEqual(out, _out);
    fs.statSync(out)
  })

  it('should handle errors', async () => {
    try {
      await cp(__filename, folderPath)
      throw new Error('boom')
    } catch (error) {
      assert(error.code === 'EISDIR' || error.code === 'EPERM')
    }
  })
})