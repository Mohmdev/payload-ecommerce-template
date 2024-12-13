import type { Config } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const typescriptConfig: Config['typescript'] = {
  outputFile: path.resolve(dirname, '../../payload-types.ts') // src/payload-types.ts
}