import type { ReactNode } from 'react'

import scrollToSection from '@/lib/utils/scrollToSection'

const Section = ({ id, title, children }: { id: string, title: string, children?: ReactNode }): JSX.Element => {
  return (
    <section className="section" id={id}>
      <h2 onClick={(event) => { scrollToSection(id, event) }} className="section-title">
        <span className="section-hash">#</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
