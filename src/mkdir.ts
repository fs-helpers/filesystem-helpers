import fs from 'fs'
import type { PathLike, MakeDirectoryOptions } from 'fs'

export async function mkdirp(path: PathLike|PathLike[], options?: MakeDirectoryOptions) {
  if (!Array.isArray(path)) path = [path]
  const pathsPromises = path.map(p => fs.promises.mkdir(p, { recursive: true, ...options }))
  const direcotyPaths = await Promise.all(pathsPromises)
  return direcotyPaths
}

export function mkdirpSync(path: PathLike|PathLike[], options?: MakeDirectoryOptions) {
  if (!Array.isArray(path)) path = [path]
  const direcotyPaths = path.map(p => fs.mkdirSync(p, { recursive: true, ...options }))
  return direcotyPaths
}
