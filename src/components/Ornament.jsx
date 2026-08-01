import { useId } from 'react'
import './Ornament.css'

export default function Ornament({ green = false }) {
  const id = `orn-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg className={`ornament${green ? ' green' : ''}`} aria-hidden="true" data-reveal="x">
      <defs>
        <pattern id={id} width="34" height="34" patternUnits="userSpaceOnUse">
          <rect x="12" y="12" width="10" height="10" transform="rotate(45 17 17)" fill="currentColor" />
          <rect x="15" y="-2" width="4" height="4" transform="rotate(45 17 0)" fill="currentColor" opacity=".6" />
          <rect x="15" y="32" width="4" height="4" transform="rotate(45 17 34)" fill="currentColor" opacity=".6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
