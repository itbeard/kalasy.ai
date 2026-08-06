// Card glyphs built from diamond "stitches" on a grid — the same woven-ornament
// language as Ornament.jsx. Cells are [col, row, opacity?, scale?].
function Glyph({ cells, cols = 7, rows = 7 }) {
  return (
    <svg viewBox={`0 0 ${cols * 6} ${rows * 6}`} aria-hidden="true">
      {cells.map(([c, r, opacity = 1, scale = 1], i) => {
        const cx = c * 6 + 3
        const cy = r * 6 + 3
        const s = 2.4 * scale
        return (
          <rect
            key={i}
            x={cx - s}
            y={cy - s}
            width={2 * s}
            height={2 * s}
            transform={`rotate(45 ${cx} ${cy})`}
            fill="currentColor"
            opacity={opacity}
          />
        )
      })}
    </svg>
  )
}

const range = (from, to) => Array.from({ length: to - from }, (_, i) => from + i)

// Газэта — загаловак, здымак і радкі тэксту.
export const NewsGlyph = () => (
  <Glyph
    cells={[
      ...range(0, 7).map((c) => [c, 0]),
      [0, 2], [1, 2], [0, 3], [1, 3],
      ...range(3, 7).map((c) => [c, 2, 0.55, 0.7]),
      ...range(3, 7).map((c) => [c, 3, 0.55, 0.7]),
      ...range(0, 7).map((c) => [c, 5, 0.55, 0.7]),
      ...range(0, 5).map((c) => [c, 6, 0.55, 0.7]),
    ]}
  />
)

// Контур Беларусі, вытканы ромбікамі; «зорачка» ў цэнтры — Менск.
const BELARUS_ROWS = [[3, 7], [1, 8], [1, 9], [0, 9], [0, 9], [0, 9], [5, 8]]
export const BelarusGlyph = () => (
  <Glyph
    cols={9}
    cells={BELARUS_ROWS.flatMap(([from, to], r) =>
      range(from, to).map((c) => (c === 4 && r === 3 ? [c, r, 1, 0.5] : [c, r])),
    )}
  />
)

// Пяро — a quill with a nib and a written line beneath.
export const QuillGlyph = () => (
  <Glyph
    cells={[
      [6, 0], [5, 1], [4, 2], [3, 3], [2, 4], [1, 5],
      [6, 1, 0.6], [5, 2, 0.6], [4, 3, 0.6],
      [5, 0, 0.6], [4, 1, 0.6], [3, 2, 0.6],
      [0, 6, 1, 0.75],
      [2, 6, 0.5, 0.7], [3, 6, 0.5, 0.7], [4, 6, 0.5, 0.7],
    ]}
  />
)

// Месяц і зорка — a crescent with an ornament star beside it.
export const MoonGlyph = () => (
  <Glyph
    cells={[
      [4, 0, 0.7, 0.8], [3, 0],
      [2, 1],
      [1, 2], [1, 3], [1, 4],
      [2, 5],
      [3, 6], [4, 6, 0.7, 0.8],
      [5, 3, 1, 0.9],
      [5, 2, 0.6, 0.5], [5, 4, 0.6, 0.5], [4, 3, 0.6, 0.5], [6, 3, 0.6, 0.5],
    ]}
  />
)
