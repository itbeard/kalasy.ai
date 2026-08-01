import { YouTubeIcon } from 'kalasy-ai'

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
    <YouTubeIcon style={{ width: 16, height: 16 }} />
    <YouTubeIcon style={{ width: 24, height: 24 }} />
    <YouTubeIcon style={{ width: 32, height: 32 }} />
    <YouTubeIcon style={{ width: 48, height: 48, color: '#FF0000' }} />
  </div>
)
