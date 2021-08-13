import fs from 'fs'
import type { PathLike, MakeDirectoryOptions } from 'fs'

export async function mkdirp(path: PathLike, options?: MakeDirectoryOptions) {
  const direcotyPath = await fs.promises.mkdir(path, { recursive: true, ...options })
  return direcotyPath
}

export function mkdirpSync(path: PathLike, options?: MakeDirectoryOptions) {
  const direcotyPath = fs.mkdirSync(path, { recursive: true, ...options })
  return direcotyPath
}
