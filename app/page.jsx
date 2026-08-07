import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

// content/session.html is regenerated locally and pushed; each push triggers a
// fresh Vercel build, so reading it at build time is enough.
export default function Page() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'session.html'), 'utf8')
  const style = (raw.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || ''
  const body = (raw.match(/<body>([\s\S]*?)<\/body>/) || [])[1] || raw
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  )
}
