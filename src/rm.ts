import fs from 'fs/promises'
import type { PathLike } from 'fs'

export async function rm(...paths: PathLike[]) {
  for (const path in paths) {
    await fs.rm(path, { force: true, recursive: true })
  }
}
