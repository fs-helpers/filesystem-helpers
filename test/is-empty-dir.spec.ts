import assert from 'assert'

import { mkdirpSync } from '../src/mkdir'
import { rm } from '../src/rm'
import { isEmptyDir, isEmptyDirSync } from '../src/is-empty-dir'

describe('is-empty-dir', () => {
  it('async', async () => {
    assert(!await isEmptyDir('test'))
    mkdirpSync('empty')
    assert(await isEmptyDir('empty'))
    await rm('empty')
  })

  it('sync', async () => {
    assert(!isEmptyDirSync('test'))
    mkdirpSync('empty')
    assert(isEmptyDirSync('empty'))
    await rm('empty')
  })
})
