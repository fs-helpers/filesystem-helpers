import fs from 'fs'
import assert from 'assert'

import { randomTempPath, tempPath } from '../src'

describe('temp-path module', () => {
  describe('randomTempPath', () => {
    it('should work', function () {
      const filename = randomTempPath()
      fs.writeFileSync(filename, 'hello-world')
      const result = fs.readFileSync(filename, 'utf8')
      assert.strictEqual(result, 'hello-world')
      fs.unlinkSync(filename)
    })

    it('should work with function', function () {
      const filename = randomTempPath(() => '____12345')
      fs.writeFileSync(filename, '')
      const useCustomFn = filename.includes('____12345')
      assert.strictEqual(useCustomFn, true)
      fs.unlinkSync(filename)
    })
  })

  describe('tempPath', () => {
    it('should work', function () {
      const filename = tempPath('xxxx---my-filename')
      fs.writeFileSync(filename, 'hello-world')
      const result = fs.readFileSync(filename, 'utf8')
      assert.strictEqual(result, 'hello-world')
      fs.unlinkSync(filename)
    })
  })
})