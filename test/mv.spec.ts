import fs from 'fs'
import path from 'path'
import assert from 'assert'

import { mkdirp } from '../src/mkdir'
import { isEmptyDirSync } from '../src/is-empty-dir'
import { mv, mvSync } from '../src/mv'
import { rm } from '../src/rm'



// mv work but here we have a bug with cpSync which affected the mvSync

describe('mv module', function () {
  it('async', async function () {
    const folderPath = path.resolve('any-folder2')

    await rm(folderPath)
    await mkdirp(folderPath)

    assert(isEmptyDirSync('any-folder2'))
    fs.writeFileSync('test.txt', '')
    await mv('test.txt', path.join(folderPath, 'test.txt'))
    assert(!isEmptyDirSync('any-folder2'))
    fs.unlinkSync('test.txt')
  })
  
  it('sync', async function () {
    const folderPath = path.resolve('any-folder3')

    await rm(folderPath)
    await mkdirp(folderPath)

    assert(isEmptyDirSync('any-folder3'))
    fs.writeFileSync('test.txt', '')
    mvSync('test.txt', path.join(folderPath, 'test.txt'))
    assert(!isEmptyDirSync('any-folder3'))
    await rm('test.txt')
  })
})
