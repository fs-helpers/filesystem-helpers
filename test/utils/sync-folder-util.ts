import path from 'path'

import { rm } from '../../src'

export async function syncFolder () {
  const folderPath = path.resolve('any-folder')
  
  try {
    await rm(folderPath)
  } catch (err) {} // eslint-disable-line no-empty

  return folderPath
}
