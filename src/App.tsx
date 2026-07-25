import { Header, Main, Footer } from '@/components/layout'

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
