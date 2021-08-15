import * as fs from 'fs'
import { bindNodeCallback, from } from 'rxjs'

function toObservables(fileSystem, converter) {
  const fsObservables = {}

  for (const key in fileSystem) {
    const element = fileSystem[key]
    if (typeof element === 'function') {
      fsObservables[key] = converter(element)
    }
  }

  return fsObservables
}

export function fromFsCallbacks() {
  return toObservables(fs, bindNodeCallback)
}

export function fromFsPromise() {
  return toObservables(fs.promises, from)
}

export default fromFsCallbacks()
