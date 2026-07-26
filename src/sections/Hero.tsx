import heroPhoto from '@/assets/images/vanderlei-hero.webp'
import GithubIcon from '@/components/icons/GithubIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'
import LogoLoop, { type LogoItem } from '@/components/ui/LogoLoop'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { SiFramer, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'

const socialLinks = [
  { href: 'https://github.com/', label: 'GitHub', icon: GithubIcon },
  {
    href: 'www.linkedin.com/in/vanderleifernandesds',
    label: 'LinkedIn',
    icon: LinkedinIcon,
  },
  { href: 'mailto:vanderleifds.9000@gmail.com', label: 'E-mail', icon: Mail },
]

const techLogos: LogoItem[] = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiFramer />, title: 'Framer Motion', href: 'https://www.framer.com/motion' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
}

function handleScrollTo(id: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-teal-700/15 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-112 w-md rounded-full bg-teal-700/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] bg-size-[64px_64px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 rounded-xl px-6 md:grid-cols-2 md:gap-24">
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
          >
            Disponível para novos projetos
          </motion.span>

          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-6xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Olá, eu sou Vanderlei Fernandes
          </motion.h1>

          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-5 text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Desenvolvedor Front-End especializado em criar interfaces modernas,
            responsivas e performáticas com React, TypeScript e animações que dão vida à
            experiência do usuário.
          </motion.p>

          <motion.div
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start"
          >
            <a
              href="#projects"
              onClick={handleScrollTo('projects')}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold tracking-wide text-white text-white/70 uppercase transition-colors hover:bg-blue-700 hover:bg-white/10 hover:text-white"
            >
              Ver projetos
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={handleScrollTo('contact')}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-80 bg-white px-6 py-3 text-sm font-bold tracking-wide text-blue-800 uppercase transition-colors hover:bg-blue-50"
            >
              Entrar em contato
              <Mail size={16} />
            </a>
          </motion.div>

          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 flex items-center justify-center gap-3 md:justify-start"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-900 shadow-sm transition-transform hover:scale-105"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </motion.div>

          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 max-w-md overflow-hidden text-neutral-500"
          >
            <LogoLoop
              logos={techLogos}
              speed={60}
              gap={40}
              logoHeight={28}
              fadeOut
              fadeOutColor="#0a0a0a"
              hoverSpeed={0}
              ariaLabel="Tecnologias utilizadas"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-teal-700 opacity-25 blur-3xl" />
            <img
              src={heroPhoto}
              alt="Vanderlei Fernandes"
              className="h-72 w-72 rounded-2xl border-white/50 object-cover shadow-2xl shadow-black/40 sm:h-96 sm:w-96 md:h-104 md:w-104"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
