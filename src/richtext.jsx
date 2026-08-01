const MD_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g
const URL_RE = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[\w\-./?#=&%]*)?)/gi

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

// Turns bare URLs like "t.me/kalasyai" in plain text into links,
// leaving trailing sentence punctuation outside the link.
function linkifyUrls(text, keyPrefix) {
  const nodes = []
  let last = 0
  for (const m of text.matchAll(URL_RE)) {
    let url = m[1]
    const trailing = url.match(/[.,;:!?)]+$/)?.[0] ?? ''
    url = url.slice(0, url.length - trailing.length)
    nodes.push(text.slice(last, m.index))
    nodes.push(
      <ExternalLink key={`${keyPrefix}-${m.index}`} href={url.startsWith('http') ? url : `https://${url}`}>
        {url}
      </ExternalLink>,
    )
    if (trailing) nodes.push(trailing)
    last = m.index + m[1].length
  }
  nodes.push(text.slice(last))
  return nodes
}

// Renders text from content/*.md: markdown links [text](url) plus bare URLs.
export function renderRich(text) {
  const nodes = []
  let last = 0
  for (const m of text.matchAll(MD_LINK_RE)) {
    nodes.push(...linkifyUrls(text.slice(last, m.index), `t${m.index}`))
    nodes.push(
      <ExternalLink key={`md-${m.index}`} href={m[2]}>
        {m[1]}
      </ExternalLink>,
    )
    last = m.index + m[0].length
  }
  nodes.push(...linkifyUrls(text.slice(last), 'tail'))
  return nodes
}
