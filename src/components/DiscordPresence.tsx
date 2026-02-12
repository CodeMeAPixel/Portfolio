import { useEffect, useState, useRef } from 'react'
import { Music, Gamepad2, Monitor, Clock } from 'lucide-react'

const DISCORD_ID = '510065483693817867'
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`
const POLL_INTERVAL = 30_000

interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name?: string
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: { start?: number; end?: number }
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
    application_id?: string
  }>
  listening_to_spotify: boolean
  spotify?: {
    song: string
    artist: string
    album: string
    album_art_url: string
    timestamps: { start: number; end: number }
    track_id: string
  }
}

const statusColors: Record<string, string> = {
  online: '#22c55e',
  idle: '#eab308',
  dnd: '#ef4444',
  offline: '#6b7280',
}

const statusLabels: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
}

function getActivityIcon(type: number) {
  switch (type) {
    case 0: return Gamepad2 // Playing
    case 2: return Music    // Listening
    case 3: return Monitor  // Watching
    default: return Monitor
  }
}

function getElapsed(startMs: number) {
  const diff = Date.now() - startMs
  const mins = Math.floor(diff / 60_000)
  const hrs = Math.floor(mins / 60)
  if (hrs > 0) return `${hrs}h ${mins % 60}m`
  return `${mins}m`
}

export function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPresence() {
      try {
        const res = await fetch(LANYARD_URL)
        if (!res.ok) return
        const json = await res.json()
        if (!cancelled && json.success) {
          setData(json.data)
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPresence()
    timerRef.current = setInterval(fetchPresence, POLL_INTERVAL)

    return () => {
      cancelled = true
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-5 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-2 w-16 rounded bg-muted" />
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { discord_user: user, discord_status: status, activities, spotify } = data
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'webp'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`

  // Filter out Custom Status (type 4) and Spotify (type 2 when listening_to_spotify)
  const nonSpotifyActivities = activities.filter(
    (a) => a.type !== 4 && !(a.type === 2 && data.listening_to_spotify),
  )

  return (
    <div className="space-y-3">
      {/* Main profile card */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          {/* Avatar with status indicator */}
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt={user.global_name || user.username}
              className="h-11 w-11 rounded-full object-cover"
              loading="lazy"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2"
              style={{
                background: statusColors[status],
                borderColor: 'var(--card)',
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-sm text-foreground">
              {user.global_name || user.username}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: statusColors[status] }}
              />
              {statusLabels[status]}
            </p>
          </div>
        </div>
      </div>

      {/* Spotify card */}
      {spotify && (
        <div className="group glass-card overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3 p-3">
            <img
              src={spotify.album_art_url}
              alt={spotify.album}
              className="h-12 w-12 rounded-lg object-cover shrink-0"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] text-green-400 font-medium uppercase tracking-wide">
                <Music className="h-3 w-3" />
                Listening to Spotify
              </div>
              <p className="truncate text-sm font-medium text-foreground">{spotify.song}</p>
              <p className="truncate text-xs text-muted-foreground">
                {spotify.artist}
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <SpotifyProgress start={spotify.timestamps.start} end={spotify.timestamps.end} />
        </div>
      )}

      {/* Other activities */}
      {nonSpotifyActivities.map((activity, i) => {
        const Icon = getActivityIcon(activity.type)
        return (
          <div
            key={`${activity.name}-${i}`}
            className="glass-card rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                }}
              >
                <Icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  {activity.type === 0 ? 'Playing' : activity.type === 3 ? 'Watching' : 'Activity'}
                </p>
                <p className="truncate text-sm font-medium text-foreground">{activity.name}</p>
                {activity.details && (
                  <p className="truncate text-xs text-muted-foreground">{activity.details}</p>
                )}
                {activity.state && (
                  <p className="truncate text-xs text-muted-foreground">{activity.state}</p>
                )}
                {activity.timestamps?.start && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getElapsed(activity.timestamps.start)} elapsed
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Spotify mini progress bar */
function SpotifyProgress({ start, end }: { start: number; end: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const now = Date.now()
      const total = end - start
      if (total <= 0) return
      setProgress(Math.min(((now - start) / total) * 100, 100))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [start, end])

  return (
    <div className="h-0.5 w-full" style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }}>
      <div
        className="h-full rounded-r-full transition-[width] duration-1000 ease-linear"
        style={{ width: `${progress}%`, background: '#1DB954' }}
      />
    </div>
  )
}
