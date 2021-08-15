import fs from 'fs'

export async function isDir(filepath: string) {
  try {
    const stats = await fs.promises.stat(filepath)
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
