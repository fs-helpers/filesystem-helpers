import type { PathLike } from 'fs'
import { isPathExist, isPathExistSync } from './is-path-exist'
import { mkdirp, mkdirpSync } from './mkdir'

export async function ensureDir(path: PathLike): Promise<void> {
  try {
    if (!await isPathExist(path)) await mkdirp(path)
  } catch {} // eslint-disable-line no-empty
}

export async function ensureDirSync(path: PathLike) {
  if (!isPathExistSync(path)) mkdirpSync(path)
}
