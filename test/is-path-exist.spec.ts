import assert from 'assert'

import { isPathExist, isPathExistSync } from '../src/is-path-exist'

describe('is-path-exist', () => {
  it('async', async () => {
    assert(await isPathExist('is-path-exist.spec.ts'))
    assert(!(await isPathExist('failed')))
  })

  it('async', async () => {
    assert(isPathExistSync('is-path-exist.spec.ts'))
    assert(!isPathExistSync('failed'))
  })
})
