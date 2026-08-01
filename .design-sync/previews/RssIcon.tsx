import { RssIcon } from 'kalasy-ai'

// Icons are unsized SVGs that inherit currentColor — size them via style
// (props spread onto the <svg>).
export const Sizes = () => (
  <div
    style={{
      background: 'var(--night)',
      color: 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 20,
    }}
  >
    <RssIcon style={{ width: 16, height: 16 }} />
    <RssIcon style={{ width: 24, height: 24 }} />
    <RssIcon style={{ width: 32, height: 32 }} />
    <RssIcon style={{ width: 48, height: 48, color: '#f28c1e' }} />
  </div>
)
