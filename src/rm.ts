import fs from 'fs/promises'
import type { PathLike } from 'fs'

export async function rm(...paths: PathLike[]) {
  for (const path in paths) {
    await fs.rm(path, { recursive: true }).catch(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  }
}
