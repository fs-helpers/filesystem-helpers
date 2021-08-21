import assert from 'assert'

import { isPathExist, isPathExistSync } from '../src'

describe('is-path-exist', () => {
  it('async', async () => {
    assert(await isPathExist('LICENSE'))
    assert(!(await isPathExist('failed')))
  })

  it('sync', () => {
    assert(isPathExistSync('LICENSE'))
    assert(!isPathExistSync('failed'))
  })
})
