export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'contact', label: 'Contato' },
]
