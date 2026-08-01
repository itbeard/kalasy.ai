import { SpotifyIcon } from 'kalasy-ai'

// Icons are unsized SVGs that inherit currentColor — size them via style
// (props spread onto the <svg>). Inside .btn they get 20px automatically.
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
    <SpotifyIcon style={{ width: 16, height: 16 }} />
    <SpotifyIcon style={{ width: 24, height: 24 }} />
    <SpotifyIcon style={{ width: 32, height: 32 }} />
    <SpotifyIcon style={{ width: 48, height: 48, color: '#1DB954' }} />
  </div>
)

export const InButton = () => (
  <div style={{ background: 'var(--night)', padding: 20 }}>
    <a className="btn btn-gold" href="#">
      <SpotifyIcon />
      Spotify
    </a>
  </div>
)
