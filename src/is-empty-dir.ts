import fs from 'fs'

export async function isEmptyDir(dir) {
  const files = await fs.promises.readdir(dir).catch(() => { })
  return files!.length === 0
}

export function isEmptyDirSync(dir) {
  const files = fs.readdirSync(dir)
  return files.length === 0
}
