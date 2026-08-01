import { LangProvider } from './i18n.jsx'
import { PlayerProvider } from './player/PlayerProvider.jsx'
import { useReveal } from './hooks/useReveal.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Ornament from './components/Ornament.jsx'
import About from './components/About.jsx'
import Featured from './components/Featured.jsx'
import Quote from './components/Quote.jsx'
import Telegram from './components/Telegram.jsx'
import Platforms from './components/Platforms.jsx'
import Episodes from './components/Episodes.jsx'
import Hosts from './components/Hosts.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import Player from './components/Player.jsx'

export default function App() {
  useReveal()
  return (
    <LangProvider>
      <PlayerProvider>
        <Header />
        <main id="top">
          <Hero />
          <Stats />
          <Featured />
          <Ornament />
          <Episodes />
          <Telegram />
          <About />
          <Quote />
          <Ornament />
          <Hosts />
          <Platforms />
          <Faq />
        </main>
        <Footer />
        <Player />
      </PlayerProvider>
    </LangProvider>
  )
}
