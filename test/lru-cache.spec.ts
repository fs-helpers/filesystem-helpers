import fs from 'fs'
import assert from 'assert'
 
import { Cache } from '../src'

describe('lru-cache', () => {
  const cache = new Cache({ interval: 10 })

  it('.set() a value', () => {
    return cache.set('id_name', 'imed')
  })

  it('.get() the same value', async () => {
    const buffer = await cache.get('id_name')
    assert.equal('imed', buffer?.toString())
  })

  it('.access() should be true if it exists', async () => {
    const buffer = await cache.access('id_name')
    assert(buffer)
  })

  it('.access() should be false if it does not exist', async () => {
    const buffer = await cache.access('imed')
    assert(!buffer)
  })

  it('.copy() should copy a file', async () => {
    await cache.copy('abc', __filename)
    const buffer = await cache.get('abc')
    assert(~(buffer!).toString().indexOf('lkajsdlfkjasdf'))
  })

  it('.move() should move a file', async () => {
    fs.writeFileSync('ex.js', 'imed')
    await cache.move('arb', 'ex.js')
    const buffer = await cache.get('arb')
    assert.equal('imed', buffer?.toString())
  })

  it('.clear(id) should clear the key', async () => {
    await cache.clear('123')
    const buffer = await cache.get('123')
    assert(buffer == null)
  })

  it('.clear() should clear everything', async () => {
    await cache.clear()
    const buffer = await cache.get('abc')
    assert(buffer == null)
  })

  it('.cleanUp() should clear all the caches', async () => {
    await Cache.cleanUp()
    assert(fs.readdirSync(Cache.tmpCacheDir).length === 0)
  })
})
