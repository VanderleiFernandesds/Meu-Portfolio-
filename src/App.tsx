import { Header, Main, Footer } from '@/components/layout'
import About from '@/sections/About'
import Hero from '@/sections/Hero'
import Skills from '@/sections/Skills'

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header />
      <Main>
        <Hero />
        <About />
        <Skills />
      </Main>
      <Footer />
    </div>
  )
}

export default App
