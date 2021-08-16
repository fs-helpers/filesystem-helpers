import { ensureDir, ensureDirSync } from '../src/ensure-dir'
import { randomStr } from '../src'

describe('ensure-dir', () => {
  it('async', async () => {
    await ensureDir('empty')
    await ensureDir(randomStr())
  })

  it('sync', () => {
    ensureDirSync('empty')
    ensureDirSync(randomStr())
  })
})
