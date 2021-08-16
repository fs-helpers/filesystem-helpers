import { cp, cpSync } from './cp'
import { rm, rmSync } from './rm'

export async function mv(src: string, dest: string) {
  try {
    await cp(src, dest)
    await rm(src)
  } catch {} // eslint-disable-line no-empty
}

export function mvSync(src: string, dest: string) {
  cpSync(src, dest)
  rmSync(src)
}
