import * as fs from 'fs'
import { bindNodeCallback } from 'rxjs'

const fsObservables = {}

for (const key in fs) {
  const element = fs[key]
  if (typeof element === 'function') {
    fsObservables[key] = bindNodeCallback(element)
  }
}

export default fsObservables
