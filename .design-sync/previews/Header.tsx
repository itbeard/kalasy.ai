import { Header } from 'kalasy-ai'

// The header is position:fixed; the transform makes the wrapper its
// containing block so it lays out inside the card instead of escaping.
export const Default = () => (
  <div style={{ background: 'var(--night)', transform: 'translateZ(0)', minHeight: 90 }}>
    <Header />
  </div>
)
