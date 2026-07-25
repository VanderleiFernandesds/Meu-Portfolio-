import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import heroPhoto from '@/assets/images/vanderlei-hero.webp'

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

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-24">
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-transform hover:scale-105"
            >
              Ver projetos
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={handleScrollTo('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Fale comigo
              <Mail size={16} />
            </a>
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
              className="h-72 w-72 rounded-full border border-white/10 object-cover shadow-2xl shadow-black/40 sm:h-96 sm:w-96 md:h-104 md:w-104"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
