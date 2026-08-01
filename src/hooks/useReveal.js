import { useEffect } from 'react'

// One IntersectionObserver for the whole page: every [data-reveal] element
// gets the .revealed class the first time it scrolls into view.
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
