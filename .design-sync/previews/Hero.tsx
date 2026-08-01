import { Hero } from 'kalasy-ai'

// Sections are designed for the site's dark body (background: var(--night));
// the wrapper stands in for that page background.
export const Default = () => (
  <div style={{ background: 'var(--night)' }}>
    <Hero />
  </div>
)
