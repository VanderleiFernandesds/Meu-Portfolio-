import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useActiveSection(navLinks.map((link) => link.id))

  function handleNavClick(id: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between rounded-full border border-white/10 bg-neutral-900/70 px-4 shadow-lg shadow-black/20 backdrop-blur-xl md:px-6">
        <a
          href="#home"
          onClick={handleNavClick('home')}
          className="shrink-0 text-sm font-semibold tracking-tight text-white"
        >
          Vanderlei Fernandes
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick(link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`text-sm transition-colors ${
                    activeId === link.id
                      ? 'font-medium text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {navLinks.length > 0 && (
          <a
            href={`#${navLinks[navLinks.length - 1].id}`}
            onClick={handleNavClick(navLinks[navLinks.length - 1].id)}
            className="hidden shrink-0 rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-90 md:block"
          >
            {navLinks[navLinks.length - 1].label}
          </a>
        )}

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-white md:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 shadow-lg shadow-black/20 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleNavClick(link.id)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`block py-2 text-sm transition-colors ${
                      activeId === link.id
                        ? 'font-medium text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
