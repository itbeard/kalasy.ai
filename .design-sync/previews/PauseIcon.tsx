import { PauseIcon } from 'kalasy-ai'

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
    <PauseIcon style={{ width: 16, height: 16 }} />
    <PauseIcon style={{ width: 24, height: 24 }} />
    <PauseIcon style={{ width: 32, height: 32 }} />
    <PauseIcon style={{ width: 48, height: 48, color: 'var(--gold)' }} />
  </div>
)

// The playing-state control from the episode list.
export const InEpisodePlayButton = () => (
  <div style={{ background: 'var(--night)', padding: 20 }}>
    <button className="ep-play playing" aria-label="Pause">
      <PauseIcon />
    </button>
  </div>
)
