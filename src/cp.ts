import fs, { ReadStream } from 'fs'
import path from 'path'
import destroy from 'destroy'
import { mkdirp } from './mkdir'
import { randomStr } from './temp-path'

export async function cp(src: string|ReadStream, dest: string) {
  let write
  let read
  let tmp

  try {
    read = (src instanceof ReadStream) ? src : fs.createReadStream(src)
  
    dest = path.resolve(dest)
    // where the file will be temporarily copied to
    // it'll be saved to the same folder, then renamed.
    // (to avoid race conditions ...)
    tmp = `${dest}.${randomStr()}.tmp`
    
    await mkdirp(path.dirname(dest))
    await new Promise(function (resolve, reject) {
      read.on('error', onfinish)
      write = fs.createWriteStream(tmp)
      write.on('error', onfinish)
      write.on('close', onfinish)
      read.pipe(write)
  
      function onfinish(err) {
        read.removeListener('error', onfinish)
        write.removeListener('error', onfinish)
        write.removeListener('close', onfinish)
        if (err instanceof Error) reject(err)
        else resolve(dest)
      }
    })
  
    await fs.promises.rename(tmp, dest)
    
    return dest;
  } catch (error) {
    // always destroy the streams
    read && destroy(read)
    write && destroy(write)
    // always clean up temp files
    await fs.promises.unlink(tmp).catch(() => {})
    throw error
  }
}
