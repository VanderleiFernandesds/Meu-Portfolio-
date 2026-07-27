import heroPhoto from '@/assets/images/vanderlei-hero.webp'
import { fadeUp } from '@/lib/motion'
import { motion } from 'framer-motion'
import { Code2, Palette, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Código limpo',
    description: 'Componentes reutilizáveis, tipados e fáceis de manter.',
  },
  {
    icon: Palette,
    title: 'Design com propósito',
    description: 'Interfaces cuidadosas, acessíveis e consistentes.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Aplicações rápidas, otimizadas do carregamento à interação.',
  },
]

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-24 dark:bg-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 -right-40 h-96 w-96 rounded-full bg-teal-700/10 blur-3xl" />
        <div className="absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-teal-700/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex justify-center md:order-1"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-teal-700 opacity-25 blur-3xl" />
            <img
              src={heroPhoto}
              alt="Vanderlei Fernandes"
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
              className="h-72 w-72 rounded-3xl border-neutral-200 object-cover shadow-2xl shadow-black/10 sm:h-80 sm:w-80 dark:border-white/50 dark:shadow-black/40"
            />
          </div>
        </motion.div>

        <div className="text-center md:order-2 md:text-left">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="inline-block rounded-xl border border-neutral-200 bg-neutral-900/5 px-4 py-1.5 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            Sobre mim
          </motion.span>

          <motion.h2
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-white"
          >
            Transformo ideias em experiências digitais
          </motion.h2>

          <motion.p
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-white/60"
          >
            Sou desenvolvedor Front-End com foco em criar produtos que unem boa engenharia
            e boa experiência de uso. Gosto de transformar interfaces complexas em soluções
            simples, acessíveis e agradáveis de usar, sempre atento a detalhes de
            performance e manutenção do código.
          </motion.p>

          <motion.div
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200 bg-neutral-900/5 p-4 text-center sm:text-left dark:border-white/10 dark:bg-white/5"
                >
                  <Icon size={20} className="mx-auto text-teal-500 sm:mx-0" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-neutral-900 dark:text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-white/50">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
