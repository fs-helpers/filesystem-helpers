import assert from 'assert'

import * as fsHelpers from '../src'

describe('fs-helpers module', () => {
  it('should work with async', () => {
    let fsHelpersKeys: string[] = []

    for (const key in fsHelpers) {
      fsHelpersKeys = [...fsHelpersKeys, key]
    }

    assert.strictEqual(fsHelpersKeys.length, 7)
  })
})
