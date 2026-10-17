import Link from 'next/link'
import type { ReactNode } from 'react'

/** Renders **bold** and [text](/href) inline markup used in data files. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>)
    else if (m[3].startsWith('/'))
      out.push(
        <Link key={m.index} href={m[3]}>
          {m[2]}
        </Link>,
      )
    else
      out.push(
        <a key={m.index} href={m[3]} rel="noopener">
          {m[2]}
        </a>,
      )
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
