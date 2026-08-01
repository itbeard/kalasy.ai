// One-time (re-runnable) fetcher for the site's Google Fonts families.
// The site loads them via <link> in index.html; the design-system bundle must
// ship them itself (@font-face + local woff2), wired through cfg.extraFonts.
// Downloads latin + cyrillic subsets for: Unbounded 300/500/700/900,
// Golos Text 400/500/600, Bad Script 400, Marck Script 400 (all OFL-licensed).
// Output: .design-sync/fonts/fonts.css + .design-sync/fonts/*.woff2 (committed).
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, 'fonts')
mkdirSync(outDir, { recursive: true })

const CSS2_URL =
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@300;500;700;900&family=Golos+Text:wght@400;500;600&family=Bad+Script&family=Marck+Script&display=swap'
// A modern-Chrome UA makes the API return woff2 with per-subset unicode-range.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const res = await fetch(CSS2_URL, { headers: { 'User-Agent': UA } })
if (!res.ok) throw new Error(`fonts css2 fetch failed: HTTP ${res.status}`)
let css = await res.text()

// Keep only latin + cyrillic subset blocks to bound the download.
const KEEP = new Set(['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'])
const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face\s*\{[^}]*\})/g)]
  .filter((m) => KEEP.has(m[1]))

let n = 0
const outCss = []
for (const [, subset, block] of blocks) {
  const urlMatch = block.match(/url\((https:[^)]+\.woff2)\)/)
  if (!urlMatch) continue
  const family = block.match(/font-family:\s*'([^']+)'/)?.[1] ?? 'font'
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1] ?? '400'
  const slug = `${family.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${weight}-${subset}`
  const file = `${slug}.woff2`
  const fres = await fetch(urlMatch[1], { headers: { 'User-Agent': UA } })
  if (!fres.ok) throw new Error(`woff2 fetch failed for ${slug}: HTTP ${fres.status}`)
  writeFileSync(join(outDir, file), Buffer.from(await fres.arrayBuffer()))
  outCss.push(`/* ${subset} */\n` + block.replace(urlMatch[1], `./${file}`))
  n++
}
if (!n) throw new Error('no woff2 @font-face blocks parsed — Google Fonts markup changed?')
writeFileSync(join(outDir, 'fonts.css'), outCss.join('\n') + '\n')
console.log(`fetched ${n} woff2 subsets -> .design-sync/fonts/`)
