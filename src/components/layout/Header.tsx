import { useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Download, Mail, Menu, Moon, Sun, User, X, Zap } from 'lucide-react'
import { navLinks } from '@/lib/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

const iconByLinkId: Record<string, ComponentType<{ size?: number }>> = {
  about: User,
  skills: Zap,
  projects: Briefcase,
  contact: Mail,
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const activeId = useActiveSection(navLinks.map((link) => link.id))
  const menuLinks = navLinks.filter((link) => link.id !== 'home')

  function handleNavClick(id: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-xl border border-white/10 bg-neutral-900/70 px-4 shadow-lg shadow-black/20 backdrop-blur-xl md:px-6">
        <a
          href="#home"
          onClick={handleNavClick('home')}
          className="shrink-0 text-lg font-bold tracking-tight text-white"
        >
          VF.
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {menuLinks.map((link) => {
              const Icon = iconByLinkId[link.id]
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleNavClick(link.id)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      activeId === link.id
                        ? 'font-medium text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {Icon && <Icon size={15} />}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a
            href="/curriculo-vanderlei-fernandes.pdf"
            download
            className="inline-flex items-center gap-2 rounded-e-2xl bg-white px-5 py-2 text-xs font-semibold tracking-wide text-neutral-900 uppercase transition-opacity hover:opacity-90"
          >
            Currículo
            <Download size={14} />
          </a>
        </div>

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
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 shadow-lg shadow-black/20 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {menuLinks.map((link) => {
                const Icon = iconByLinkId[link.id]
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={handleNavClick(link.id)}
                      aria-current={activeId === link.id ? 'true' : undefined}
                      className={`flex items-center gap-2 py-2 text-sm transition-colors ${
                        activeId === link.id
                          ? 'font-medium text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon size={16} />}
                      {link.label}
                    </a>
                  </li>
                )
              })}
              <li className="mt-2 flex items-center gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
                >
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </button>
                <a
                  href="/curriculo-vanderlei-fernandes.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold tracking-wide text-neutral-900 uppercase transition-opacity hover:opacity-90"
                >
                  Currículo
                  <Download size={14} />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
