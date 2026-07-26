import { motion } from 'framer-motion'
import { Database, Server, Wrench, Code } from 'lucide-react'
import {
  SiCss,
  SiDocker,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

interface Skill {
  name: string
  icon: React.ComponentType<{ size?: number }>
}

interface SkillCategory {
  title: string
  icon: React.ComponentType<{ size?: number }>
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Front-end',
    icon: Code,
    skills: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer },
    ],
  },
  {
    title: 'Back-end',
    icon: Server,
    skills: [{ name: 'Node.js', icon: SiNodedotjs }],
  },
  {
    title: 'Banco de Dados',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    title: 'Ferramentas',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vite', icon: SiVite },
      { name: 'Figma', icon: SiFigma },
      { name: 'Docker', icon: SiDocker },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-neutral-950 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-teal-700/10 blur-3xl" />
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
            Habilidades
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Tecnologias com as quais trabalho
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            Um panorama das ferramentas e linguagens que utilizo no dia a dia para
            construir produtos completos, do front-end ao banco de dados.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon
            return (
              <motion.div
                key={category.title}
                custom={0.1 + index * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700/15 text-teal-500">
                    <CategoryIcon size={20} />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center transition-colors hover:border-teal-700/40 hover:bg-white/10"
                      >
                        <Icon size={24} />
                        <span className="text-xs font-medium text-white/70">
                          {skill.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
