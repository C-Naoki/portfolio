import type { MouseEvent } from 'react'

const scrollToSection = (id: string, event: MouseEvent<HTMLHeadingElement>): void => {
  event.preventDefault()
  const sectionElement = document.getElementById(id)
  if (sectionElement != null) {
    sectionElement.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', `#${id}`)
  }
}

export default scrollToSection
