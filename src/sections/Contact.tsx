import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome.')
    .max(80, 'Use no maximo 80 caracteres.'),
  email: z.string().trim().email('Informe um e-mail valido.'),
  message: z
    .string()
    .trim()
    .min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.')
    .max(600, 'Use no maximo 600 caracteres.'),
})

type ContactFormData = z.infer<typeof contactSchema>

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
}

function Contact() {
  const [isSent, setIsSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(data: ContactFormData) {
    const subject = encodeURIComponent(`Contato pelo portfolio - ${data.name}`)
    const body = encodeURIComponent(
      `Nome: ${data.name}\nE-mail: ${data.email}\n\nMensagem:\n${data.message}`,
    )

    window.location.href = `mailto:vanderleifds.9000@gmail.com?subject=${subject}&body=${body}`
    setIsSent(true)
    reset()
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-teal-700/10 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-teal-700/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <span className="inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            Contato
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Vamos construir algo juntos?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            Envie uma mensagem com sua ideia, projeto ou oportunidade. Respondo assim
            que possivel.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700/15 text-teal-500">
                <Mail size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">E-mail</p>
                <a
                  href="mailto:vanderleifds.9000@gmail.com"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  vanderleifds.9000@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-sm md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <User size={16} />
                Nome
              </span>
              <input
                type="text"
                {...register('name')}
                aria-invalid={!!errors.name}
                className="h-12 w-full rounded-xl border border-white/10 bg-neutral-950/60 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-teal-600"
                placeholder="Seu nome"
              />
              {errors.name && (
                <span className="mt-2 block text-xs text-red-300">
                  {errors.name.message}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <Mail size={16} />
                E-mail
              </span>
              <input
                type="email"
                {...register('email')}
                aria-invalid={!!errors.email}
                className="h-12 w-full rounded-xl border border-white/10 bg-neutral-950/60 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-teal-600"
                placeholder="voce@email.com"
              />
              {errors.email && (
                <span className="mt-2 block text-xs text-red-300">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
              <MessageSquare size={16} />
              Mensagem
            </span>
            <textarea
              {...register('message')}
              aria-invalid={!!errors.message}
              className="min-h-40 w-full resize-none rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-white/30 focus:border-teal-600"
              placeholder="Conte um pouco sobre o projeto..."
            />
            {errors.message && (
              <span className="mt-2 block text-xs text-red-300">
                {errors.message.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Enviar mensagem
            <Send size={16} />
          </button>

          {isSent && (
            <p className="mt-4 text-sm text-teal-300">
              Mensagem validada. Seu aplicativo de e-mail foi aberto para o envio.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
