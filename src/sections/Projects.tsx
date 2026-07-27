import { fadeUp } from '@/lib/motion'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
}

const projects: Project[] = [
  {
    title: 'Portfólio Pessoal',
    description:
      'Site pessoal desenvolvido para apresentar minhas habilidades, projetos e experiência, com foco em performance e animações suaves.',
    image:
      'linear-gradient(135deg, oklch(0.55 0.12 200), oklch(0.25 0.05 240))',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/',
    demoUrl: '#',
  },
  {
    title: 'Plataforma de Tarefas',
    description:
      'Aplicação de gerenciamento de tarefas com autenticação, quadros arrastáveis e persistência de dados em tempo real.',
    image:
      'linear-gradient(135deg, oklch(0.5 0.14 250), oklch(0.22 0.06 270))',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/',
    demoUrl: '#',
  },
  {
    title: 'E-commerce Storefront',
    description:
      'Loja virtual completa com carrinho de compras, checkout e painel administrativo para gestão de produtos e pedidos.',
    image:
      'linear-gradient(135deg, oklch(0.5 0.13 160), oklch(0.22 0.06 190))',
    technologies: ['React', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/',
    demoUrl: '#',
  },
]

function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-neutral-950 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-teal-700/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-700/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-center"
        >
          <span className="inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            Projetos
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Alguns trabalhos recentes
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            Uma seleção de projetos que desenvolvi aplicando boas práticas de código,
            design e usabilidade.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              custom={0.1 + index * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm transition-colors hover:border-teal-700/40"
            >
              <div
                className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ background: project.image }}
                role="img"
                aria-label={`Prévia do projeto ${project.title}`}
              />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    <SiGithub size={16} aria-hidden="true" />
                    GitHub
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Ver demonstração do projeto ${project.title}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
