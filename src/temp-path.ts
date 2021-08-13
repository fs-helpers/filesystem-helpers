import { join } from 'path'
import { tmpdir } from 'os'

export function tempPath(path) {
  return join(tmpdir(), path)
}

export function randomTempPath(randomize?: () => string) {
  const random = randomize || randomStr
  return join(tmpdir(), random())
}

export function randomStr() {
  return Math.random().toString(36).slice(2)
}
