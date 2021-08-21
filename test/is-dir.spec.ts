import assert from 'assert'

import { isDir, isDirSync } from '../src'

describe('is-dir', () => {
  it('async', async () => {
    assert(await isDir('test'))
    assert(!(await isDir('failed')))
  })

  it('sync', () => {
    assert(isDirSync('test'))
    assert(!isDirSync('failed'))
  })
})
