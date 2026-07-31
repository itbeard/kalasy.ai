import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import beRaw from '../content/be.md?raw'
import enRaw from '../content/en.md?raw'

// content/*.md format: "## key" line starts a section, everything until
// the next "## " line is that key's text. Text before the first "## " is ignored.
function parseContent(raw) {
  const dict = {}
  let key = null
  let buf = []
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^##\s+(.+)$/)
    if (m) {
      if (key) dict[key] = buf.join('\n').trim()
      key = m[1].trim()
      buf = []
    } else if (key) {
      buf.push(line)
    }
  }
  if (key) dict[key] = buf.join('\n').trim()
  return dict
}

const DICTS = { be: parseContent(beRaw), en: parseContent(enRaw) }
const STORAGE_KEY = 'kalasy-lang'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'be'
    } catch {
      return 'be'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* private mode etc. */
    }
  }, [lang])

  const t = useCallback(
    (key) => DICTS[lang][key] ?? DICTS.be[key] ?? key,
    [lang],
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
