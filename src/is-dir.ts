import fs from 'fs'
import { promisify } from 'utils'

const statAsync = promisify(fs.stat)

export async function isDir(filepath: string) {
  try {
    const stats = await statAsync(filepath)
    return stats.isDirectory()
  } catch {
    return false
  }
}

export function isDirSync(filepath: string) {
  try {
    const stats = fs.statSync(filepath)
    return stats.isDirectory()
  } catch {
    return false
  }
}
