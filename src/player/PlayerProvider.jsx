import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// One <audio> for the whole site; every play button talks to this context.
const PlayerCtx = createContext(null)

export function usePlayer() {
  return useContext(PlayerCtx)
}

const RATES = [1, 1.25, 1.5, 1.75, 2]
const STORAGE_KEY = 'kalasy-player'

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
  } catch {
    return null
  }
}

function save(mp3, time) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mp3, time }))
  } catch {
    /* private mode etc. */
  }
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(null) // episode object
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const [rate, setRate] = useState(1)
  const lastSavedRef = useRef(0)

  useEffect(() => {
    const a = new Audio()
    audioRef.current = a
    a.preload = 'metadata'
    const onTime = () => {
      setTime(a.currentTime)
      // remember the position so a returning visitor can pick up where they left
      if (a.src && Math.abs(a.currentTime - lastSavedRef.current) > 5) {
        lastSavedRef.current = a.currentTime
        save(a.src, a.currentTime)
      }
    }
    const onDur = () => setDur(a.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setTime(0)
      save(a.src, 0)
    }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('durationchange', onDur)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    return () => {
      a.pause()
      a.removeAttribute('src')
    }
  }, [])

  const play = useCallback(
    (ep) => {
      const a = audioRef.current
      if (!a || !ep?.mp3) return
      if (current?.mp3 === ep.mp3) {
        a.paused ? a.play().catch(() => {}) : a.pause()
        return
      }
      a.src = ep.mp3
      a.playbackRate = rate
      const saved = readSaved()
      if (saved?.mp3 === ep.mp3 && saved.time > 0) {
        a.addEventListener('loadedmetadata', () => {
          a.currentTime = saved.time
        }, { once: true })
      }
      setCurrent(ep)
      setTime(0)
      setDur(0)
      a.play().catch(() => {})
    },
    [current, rate],
  )

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a || !current) return
    a.paused ? a.play().catch(() => {}) : a.pause()
  }, [current])

  const seek = useCallback((sec) => {
    const a = audioRef.current
    if (!a) return
    const target = Math.min(Math.max(sec, 0), a.duration || sec)
    a.currentTime = target
    // не чакаем timeupdate: слайдэр і лічбы адгукаюцца адразу
    setTime(target)
  }, [])

  const skip = useCallback((delta) => {
    const a = audioRef.current
    if (!a) return
    const target = Math.min(Math.max(a.currentTime + delta, 0), a.duration || 0)
    a.currentTime = target
    setTime(target)
  }, [])

  const cycleRate = useCallback(() => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length]
    setRate(next)
    if (audioRef.current) audioRef.current.playbackRate = next
  }, [rate])

  const close = useCallback(() => {
    const a = audioRef.current
    if (a) {
      a.pause()
      a.removeAttribute('src')
    }
    setCurrent(null)
    setPlaying(false)
    setTime(0)
    setDur(0)
  }, [])

  return (
    <PlayerCtx.Provider
      value={{ current, playing, time, dur, rate, play, toggle, seek, skip, cycleRate, close }}
    >
      {children}
    </PlayerCtx.Provider>
  )
}
