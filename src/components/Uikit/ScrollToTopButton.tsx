import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

const ScrollToTopButton = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => { window.removeEventListener('scroll', toggleVisibility) }
  }, [])

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='scroll-to-top-button'
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
