import fs from 'fs'
import type { PathLike } from 'fs'
import { isPathExist, isPathExistSync } from './is-path-exist'

export async function ensureFile(path: PathLike): Promise<void> {
  try {
    if (!await isPathExist(path)) await fs.promises.writeFile(path, '')
  } catch {} // eslint-disable-line no-empty
}

export function ensureFileSync(path: PathLike) {
  if (!isPathExistSync(path)) fs.writeFileSync(path, '')
}