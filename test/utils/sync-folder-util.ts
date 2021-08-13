import path from 'path'

import { rm } from '../../src/rm'

export async function syncFolder () {
  const folderPath = path.resolve('any-folder')
  console.log('////////', folderPath);
  
  try {
    await rm(folderPath)
  } catch (err) {} // eslint-disable-line no-empty

  return folderPath
}
