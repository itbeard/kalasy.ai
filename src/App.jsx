import { LangProvider } from './i18n.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ornament from './components/Ornament.jsx'
import About from './components/About.jsx'
import Platforms from './components/Platforms.jsx'
import Episodes from './components/Episodes.jsx'
import Hosts from './components/Hosts.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main id="top">
        <Hero />
        <Ornament />
        <About />
        <Ornament green />
        <Platforms />
        <Ornament />
        <Episodes />
        <Ornament green />
        <Hosts />
      </main>
      <Footer />
    </LangProvider>
  )
}
