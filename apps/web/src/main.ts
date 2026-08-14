/**
 * Web application entry: thin bootstrap over the shell library. Everything —
 * loader holding, module-table seeding, AppRoot gate, plugin assembly — lives
 * in @deepseek-ai/dsh-client-web; this file only finds the mount point.
 */
import { AppWebEntry } from '@deepseek-ai/dsh-client-web'

// HTTP LAN origins are not secure contexts, so older browsers may omit
// crypto.randomUUID even though the Web UI only needs it for local IDs.
if (typeof globalThis.crypto === 'object' && typeof globalThis.crypto.randomUUID !== 'function') {
  try {
    globalThis.crypto.randomUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  } catch {
    // Some browsers expose a read-only crypto object; leave it untouched.
  }
}

const el = document.getElementById('root')
if (el === null) throw new Error('web app: missing #root')
void new AppWebEntry(el).run()
