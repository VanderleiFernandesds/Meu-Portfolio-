import { useState, useEffect, useCallback, type ComponentType, type ReactNode } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Server,
  Sparkles,
  Package,
  BookOpen,
  Upload,
  FileCode2,
  FileJson2,
  Image as ImageIcon,
  X,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------
const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3)
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  const num = parseInt(color.slice(0, 6), 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const hexToRgba = (hex: string, alpha: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3)
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  const num = parseInt(color.slice(0, 6), 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// all folders share the same orange identity
const ORANGE = '#f97316'
const ORANGE_ACCENT = '#fb923c'

// ---------------------------------------------------------------------------
// Folder
// ---------------------------------------------------------------------------
interface FolderProps {
  color?: string
  accent?: string
  size?: number
  items?: ReactNode[]
  interactive?: boolean
  open?: boolean
  onToggle?: (open: boolean) => void
}

const Folder = ({
  color = ORANGE,
  accent = ORANGE_ACCENT,
  size = 1,
  items = [],
  interactive = true,
  open: openProp,
  onToggle,
}: FolderProps) => {
  const maxItems = 3
  const papers: (ReactNode | null)[] = items.slice(0, maxItems)
  while (papers.length < maxItems) papers.push(null)

  const [openState, setOpenState] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  )

  const controlled = openProp !== undefined
  const open = controlled ? openProp : openState
  const setOpen = (val: boolean) => (controlled ? onToggle && onToggle(val) : setOpenState(val))

  const folderBack = darkenColor(color, 0.5)
  const paperSurfaces = [
    'rgba(255, 237, 213, 0.14)',
    'rgba(255, 237, 213, 0.08)',
    'rgba(20, 14, 8, 0.55)',
  ]

  const handleClick = () => {
    if (!interactive) return
    setOpen(!open)
    if (open) setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
  }

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!open || !interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const ox = (e.clientX - cx) * 0.15
    const oy = (e.clientY - cy) * 0.15
    setPaperOffsets((prev) => {
      const next = [...prev]
      next[index] = { x: ox, y: oy }
      return next
    })
  }

  const resetPaper = (index: number) => {
    setPaperOffsets((prev) => {
      const next = [...prev]
      next[index] = { x: 0, y: 0 }
      return next
    })
  }

  const getOpenTransform = (index: number) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)'
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)'
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)'
    return ''
  }

  const paperDims = [
    { w: '70%', h: '80%' },
    { w: '80%', h: open ? '80%' : '70%' },
    { w: '90%', h: open ? '80%' : '60%' },
  ]

  const isHovered = interactive && hovered
  const lift = open ? -12 : isHovered ? -8 : 0

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        position: 'relative',
        cursor: interactive ? 'pointer' : 'default',
        outline: 'none',
        transform: `translateY(${lift}px)`,
        transition: 'transform 260ms ease, filter 260ms ease',
        filter:
          open || isHovered
            ? `drop-shadow(0 22px 36px ${hexToRgba(color, 0.4)}) drop-shadow(0 8px 18px ${hexToRgba(
                accent,
                0.3,
              )})`
            : 'drop-shadow(0 3px 8px rgba(0,0,0,0.35))',
      }}
    >
      <div style={{ position: 'relative', width: 108 * size, height: 84 * size }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '3px 12px 12px 12px',
            background: folderBack,
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '98%',
            left: 0,
            width: 32 * size,
            height: 11 * size,
            borderRadius: '6px 6px 0 0',
            background: folderBack,
          }}
        />

        {papers.map((item, i) => (
          <div
            key={i}
            onMouseMove={(e) => handlePaperMouseMove(e, i)}
            onMouseLeave={() => resetPaper(i)}
            style={{
              position: 'absolute',
              zIndex: 20,
              bottom: '10%',
              left: '50%',
              width: paperDims[i].w,
              height: paperDims[i].h,
              borderRadius: 10,
              background: paperSurfaces[i],
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,241,224,0.92)',
              transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              transform: !open
                ? `translate(-50%, ${isHovered ? '0%' : '10%'})`
                : `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`,
              cursor: open && interactive ? 'grab' : 'default',
            }}
          >
            {item}
          </div>
        ))}

        {[15, -15].map((deg, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '3px 12px 12px 12px',
              background: `linear-gradient(135deg, ${color}, ${accent})`,
              transformOrigin: 'bottom',
              transform:
                open || isHovered ? `skew(${deg}deg) scaleY(0.6)` : 'skew(0deg) scaleY(1)',
              transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 30,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------
interface Project {
  name: string
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>
  summary: string
  description: string
  stack: string[]
  items: ReactNode[]
}

const PROJECTS: Project[] = [
  {
    name: 'AdminFlow',
    icon: Server,
    summary:
      'CRM full-stack para gestão de clientes e processos internos, com autenticação, permissões por papel e upload de arquivos.',
    description:
      'AdminFlow é uma aplicação CRM construída do zero para centralizar cadastro de clientes, papéis de usuário e fluxos administrativos. Serve também como projeto-âncora de um manual de referência técnica, cobrindo desde autenticação JWT e OAuth até upload de avatar com Multer, seguindo o padrão Controller → Service → Repository.',
    stack: ['Node.js', 'Express 5', 'MySQL', 'JWT', 'bcrypt', 'Multer'],
    items: [
      <FileCode2 size={20} strokeWidth={1.75} key="1" />,
      <FileJson2 size={20} strokeWidth={1.75} key="2" />,
      <ImageIcon size={20} strokeWidth={1.75} key="3" />,
    ],
  },
  {
    name: 'Portfolio',
    icon: Sparkles,
    summary:
      'Portfólio pessoal com identidade visual dark glassmorphism, blobs animados e um hero card estilo terminal.',
    description:
      'Site pessoal construído em React com Vite, combinando Tailwind CSS para o design system e Framer Motion para as transições. O destaque é o hero em formato de terminal interativo, sobre um fundo com blobs animados em tons de indigo e violeta.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    items: [
      <FileCode2 size={20} strokeWidth={1.75} key="1" />,
      <ImageIcon size={20} strokeWidth={1.75} key="2" />,
      <FileJson2 size={20} strokeWidth={1.75} key="3" />,
    ],
  },
  {
    name: 'EnvelopPack',
    icon: Package,
    summary:
      'Loja virtual para produtos de embalagem, com carrinho, filtros e notificações — tudo em um único arquivo HTML.',
    description:
      'Site de e-commerce autocontido para uma empresa de embalagens, incluindo carrinho de compras, filtros de produto, modais de detalhe e notificações toast, sem nenhuma dependência de backend.',
    stack: ['HTML5', 'CSS3', 'JavaScript ES6+'],
    items: [
      <ImageIcon size={20} strokeWidth={1.75} key="1" />,
      <FileCode2 size={20} strokeWidth={1.75} key="2" />,
      <FileJson2 size={20} strokeWidth={1.75} key="3" />,
    ],
  },
  {
    name: 'Backend Dev Guide',
    icon: BookOpen,
    summary:
      'Guia interativo multi-seção sobre desenvolvimento backend, do CRUD à integração com o frontend.',
    description:
      'Material de referência interativo cobrindo CRUD, segurança, separação de rotas e controllers, e integração frontend-backend via Fetch API e CORS — pensado tanto para consulta rápida quanto para estudo aprofundado.',
    stack: ['Node.js', 'Express', 'MySQL', 'Fetch API'],
    items: [
      <FileCode2 size={20} strokeWidth={1.75} key="1" />,
      <FileJson2 size={20} strokeWidth={1.75} key="2" />,
      <FileCode2 size={20} strokeWidth={1.75} key="3" />,
    ],
  },
  {
    name: 'Cap. 20 – Upload',
    icon: Upload,
    summary:
      'Capítulo interativo do manual AdminFlow sobre upload de avatar com Multer e multipart/form-data.',
    description:
      'Transformação do Capítulo 20 da apostila AdminFlow em um widget interativo, explicando upload de arquivos com Multer, o formato multipart/form-data e o fluxo completo Controller → Service → Repository → Database.',
    stack: ['Multer', 'Express', 'multipart/form-data'],
    items: [
      <ImageIcon size={20} strokeWidth={1.75} key="1" />,
      <FileCode2 size={20} strokeWidth={1.75} key="2" />,
      <FileJson2 size={20} strokeWidth={1.75} key="3" />,
    ],
  },
]

// ---------------------------------------------------------------------------
// Modal — photos left, info right
// ---------------------------------------------------------------------------
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null
  const Icon = project.icon
  const photoSlots = Array.from({ length: 4 })

  return (
    <div
      onClick={onClose}
      className="bg-black/50 dark:bg-[rgba(6,5,10,0.78)]"
      style={{
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 1000,
        animation: 'fadeIn 220ms ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[linear-gradient(165deg,rgba(28,18,10,0.96),rgba(10,10,18,0.98))]"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 880,
          maxHeight: '86vh',
          overflowY: 'auto',
          border: `1px solid ${hexToRgba(ORANGE, 0.25)}`,
          borderRadius: 28,
          padding: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          boxShadow: `0 30px 80px ${hexToRgba(ORANGE, 0.18)}`,
          animation: 'scaleIn 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="border-neutral-200 bg-neutral-900/5 text-neutral-900 dark:border-white/14 dark:bg-white/6 dark:text-[#f5f1ff]"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 34,
            height: 34,
            borderRadius: '50%',
            borderWidth: 1,
            borderStyle: 'solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <X size={16} color="currentColor" />
        </button>

        {/* photos — left */}
        <div
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            className="border-neutral-200 text-neutral-400 dark:border-white/16 dark:text-[rgba(255,241,224,0.4)]"
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: 18,
              background: `linear-gradient(150deg, ${hexToRgba(ORANGE, 0.12)}, rgba(0,0,0,0.03))`,
              borderWidth: 1,
              borderStyle: 'dashed',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <ImageIcon size={34} strokeWidth={1.5} color="currentColor" />
            <span
              className="text-neutral-400 dark:text-[rgba(255,241,224,0.35)]"
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.04em',
              }}
            >
              screenshot em breve
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {photoSlots.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="border-neutral-200 text-neutral-300 dark:border-white/12 dark:text-[rgba(255,241,224,0.28)]"
                style={{
                  flex: 1,
                  aspectRatio: '1 / 1',
                  borderRadius: 12,
                  background: `linear-gradient(150deg, ${hexToRgba(ORANGE, 0.08)}, rgba(0,0,0,0.03))`,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImageIcon size={16} strokeWidth={1.5} color="currentColor" />
              </div>
            ))}
          </div>
        </div>

        {/* info — right */}
        <div style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_ACCENT})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={18} strokeWidth={1.75} color="#1a1006" />
            </div>
            <h3
              className="text-neutral-900 dark:text-[#f5f1ff]"
              style={{ fontSize: 20, fontWeight: 700, margin: 0 }}
            >
              {project.name}
            </h3>
          </div>

          <p
            className="text-neutral-600 dark:text-[rgba(245,241,255,0.75)]"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              margin: '0 0 22px',
            }}
          >
            {project.description}
          </p>

          <span
            className="text-neutral-400 dark:text-[rgba(255,241,224,0.4)]"
            style={{
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 10,
            }}
          >
            Tecnologias
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-neutral-900/5 text-neutral-700 dark:bg-white/6 dark:text-[rgba(255,241,224,0.85)]"
                style={{
                  fontSize: 12,
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: `1px solid ${hexToRgba(ORANGE, 0.3)}`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Carousel + projects section
// ---------------------------------------------------------------------------
export default function Projects() {
  const [active, setActive] = useState(2)
  const [openFolder, setOpenFolder] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const goTo = useCallback((i: number) => {
    const n = PROJECTS.length
    const wrapped = ((i % n) + n) % n
    setActive(wrapped)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional close-then-reopen reveal animation on folder change
    setOpenFolder(false)
    const t = setTimeout(() => setOpenFolder(true), 260)
    return () => clearTimeout(t)
  }, [active])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        setModalOpen(false)
        return
      }
      if (modalOpen) return
      if (e.key === 'ArrowRight') goTo(active + 1)
      if (e.key === 'ArrowLeft') goTo(active - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, goTo, modalOpen])

  const current = PROJECTS[active]

  return (
    <section
      id="projects"
      className="bg-white py-24 dark:bg-neutral-950"
      style={{
        position: 'relative',
        minHeight: 760,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes infoIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '5%',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '5%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,146,60,0.18), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative mb-12 text-center">
        <span className="inline-block rounded-xl border border-neutral-200 bg-neutral-900/5 px-4 py-1.5 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          Projetos
        </span>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
          Alguns trabalhos recentes
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-white/60">
          Uma seleção de projetos que desenvolvi aplicando boas práticas de código, design e
          usabilidade.
        </p>
      </div>

      {/* stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1080,
          height: 440,
          perspective: 1400,
        }}
      >
        {PROJECTS.map((proj, i) => {
          const n = PROJECTS.length
          let diff = i - active
          if (diff > n / 2) diff -= n
          if (diff < -n / 2) diff += n
          const abs = Math.abs(diff)
          const isActive = diff === 0

          const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.52
          const translateX = diff * 290
          const translateZ = -abs * 90
          const rotateY = diff * -32
          const opacity = isActive ? 1 : abs === 1 ? 0.75 : 0
          const zIndex = 20 - abs
          const pointerEvents = abs > 1 ? 'none' : 'auto'

          const Icon = proj.icon

          return (
            <div
              key={proj.name}
              onClick={() => !isActive && goTo(i)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                opacity,
                zIndex,
                pointerEvents,
                cursor: isActive ? 'default' : 'pointer',
                transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 480ms ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Folder
                color={ORANGE}
                accent={ORANGE_ACCENT}
                size={2.9}
                items={proj.items}
                interactive={isActive}
                open={isActive ? openFolder : false}
                onToggle={isActive ? setOpenFolder : undefined}
              />

              <div
                className="text-orange-600 dark:text-[rgba(253,186,116,0.85)]"
                style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Icon size={14} strokeWidth={1.75} color="currentColor" />
                <span
                  className="text-neutral-900 dark:text-[#f5f1ff]"
                  style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  {proj.name}
                </span>
              </div>
            </div>
          )
        })}

        {/* arrows */}
        <button
          onClick={() => goTo(active - 1)}
          className="border-neutral-200 bg-neutral-900/5 text-neutral-700 dark:border-white/12 dark:bg-white/5 dark:text-[#f1efff]"
          style={{
            position: 'absolute',
            left: 0,
            top: '44%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            borderWidth: 1,
            borderStyle: 'solid',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
          }}
          aria-label="Projeto anterior"
        >
          <ChevronLeft size={20} color="currentColor" />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          className="border-neutral-200 bg-neutral-900/5 text-neutral-700 dark:border-white/12 dark:bg-white/5 dark:text-[#f1efff]"
          style={{
            position: 'absolute',
            right: 0,
            top: '44%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            borderWidth: 1,
            borderStyle: 'solid',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
          }}
          aria-label="Próximo projeto"
        >
          <ChevronRight size={20} color="currentColor" />
        </button>
      </div>

      {/* dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 36 }}>
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.name}
            onClick={() => goTo(i)}
            aria-label={`Ir para ${proj.name}`}
            className={i === active ? '' : 'bg-neutral-900/15 dark:bg-white/18'}
            style={{
              width: i === active ? 22 : 7,
              height: 7,
              borderRadius: 999,
              border: 'none',
              background:
                i === active ? `linear-gradient(135deg, ${ORANGE}, ${ORANGE_ACCENT})` : undefined,
              cursor: 'pointer',
              transition: 'all 300ms ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* summary + stack + cta, below the featured folder */}
      <div
        key={active}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          textAlign: 'center',
          animation: 'infoIn 380ms ease',
        }}
      >
        <p
          className="text-neutral-600 dark:text-[rgba(245,241,255,0.7)]"
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            margin: '0 0 16px',
          }}
        >
          {current.summary}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
          }}
        >
          {current.stack.map((tech) => (
            <span
              key={tech}
              className="bg-neutral-900/5 text-neutral-700 dark:bg-white/5 dark:text-[rgba(255,241,224,0.8)]"
              style={{
                fontSize: 11,
                padding: '5px 11px',
                borderRadius: 999,
                border: `1px solid ${hexToRgba(ORANGE, 0.28)}`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: '11px 26px',
            borderRadius: 999,
            border: 'none',
            background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_ACCENT})`,
            color: '#1a1006',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: `0 10px 24px ${hexToRgba(ORANGE, 0.3)}`,
          }}
        >
          Ver detalhes
        </button>
      </div>

      {modalOpen && <ProjectModal project={current} onClose={() => setModalOpen(false)} />}
    </section>
  )
}
