export function handleScrollTo(id: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}
