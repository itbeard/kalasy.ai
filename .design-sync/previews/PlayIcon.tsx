import { PlayIcon } from 'kalasy-ai'

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
    <PlayIcon style={{ width: 16, height: 16 }} />
    <PlayIcon style={{ width: 24, height: 24 }} />
    <PlayIcon style={{ width: 32, height: 32 }} />
    <PlayIcon style={{ width: 48, height: 48, color: 'var(--gold)' }} />
  </div>
)

// The episode-list play control this icon was made for.
export const InEpisodePlayButton = () => (
  <div style={{ background: 'var(--night)', padding: 20 }}>
    <button className="ep-play" aria-label="Play">
      <PlayIcon />
    </button>
  </div>
)
