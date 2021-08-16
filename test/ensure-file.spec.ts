import { rm } from '../src/rm'
import { ensureFile, ensureFileSync } from '../src/ensure-file'

describe('ensure-file', () => {

  beforeEach(async () => {
    await rm('Thumbs.db')
  })

  it('async', async () => {
    await ensureFile('LICENSE')
    await ensureFile('Thumbs.db')
  })

  it('sync', () => {
    ensureFileSync('LICENSE')
    ensureFileSync('.DS_Store')
  })
})