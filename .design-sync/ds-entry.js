// design-sync bundle entry (cfg.entry): the site has no library build, and a
// synthesized `export * from` entry would drop the sections' default exports.
// This barrel is the design-system surface of the site: every section
// component, the icon set, and the i18n/content utilities they depend on.
export { default as Header } from '../src/components/Header.jsx'
export { default as Hero } from '../src/components/Hero.jsx'
export { default as Ornament } from '../src/components/Ornament.jsx'
export { default as About } from '../src/components/About.jsx'
export { default as Featured } from '../src/components/Featured.jsx'
export { default as Platforms } from '../src/components/Platforms.jsx'
export { default as Episodes } from '../src/components/Episodes.jsx'
export { default as Hosts } from '../src/components/Hosts.jsx'
export { default as Faq } from '../src/components/Faq.jsx'
export { default as Footer } from '../src/components/Footer.jsx'
export * from '../src/components/Icons.jsx'
export { LangProvider, useLang } from '../src/i18n.jsx'
export { LINKS } from '../src/links.js'
export { useEpisodes, FALLBACK_EPISODES } from '../src/hooks/useEpisodes.js'
export { renderRich } from '../src/richtext.jsx'
