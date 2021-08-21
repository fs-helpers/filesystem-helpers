import fs from 'fs'
import path from 'path'
import assert from 'assert'

import { mkdirp, cp, cpSync, rm } from '../src'

const folderPath = path.resolve('any-folder')

;(async () => {
  await rm(folderPath)
  await mkdirp(folderPath)
})()

describe('cp module', function () {
  describe('async', () => {
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

  describe('sync', () => {
    it('should copy a string', function () {
      const out = path.join(folderPath, 'test.js')
      const _out = cpSync(__filename, out)
      assert.strictEqual(out, _out);
      fs.statSync(out)
    })
  
    it('should copy a stream', () => {
      const out = path.join(folderPath, 'test2.js')
      const _out = cpSync(fs.createReadStream(__filename), out)
      assert.strictEqual(out, _out);
      fs.statSync(out)
    })
  
    it('should handle errors', () => {
      try {
        cpSync(__filename, folderPath)
        throw new Error('boom')
      } catch (error) {        
        assert(
          error.code === 'EISDIR' ||
          error.code === 'EPERM' ||
          error.code === 'ENOENT'
        )
      }
    })
  })
})
