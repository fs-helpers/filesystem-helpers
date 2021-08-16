import fs from 'fs'
import type { PathLike } from 'fs'

export async function rm(...paths: PathLike[]) {
  for (const path in paths) {
    await fs.promises.rm(path, { recursive: true }).catch(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  }
}

export function rmSync(...paths: PathLike[]) {
  for (const path in paths) {
    fs.rmSync(path, { recursive: true })
  }
}
