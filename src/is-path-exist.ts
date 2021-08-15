import fs from 'fs'
import type { PathLike } from 'fs'

export async function isPathExist(path: PathLike): Promise<boolean> {
	try {
		await fs.promises.access(path)
		return true
	} catch {
		return false
	}
}

export function isPathExistSync(path: PathLike): boolean {
	try {
		fs.accessSync(path)
		return true
	} catch {
		return false
	}
}
