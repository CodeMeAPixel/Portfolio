export interface Theme {
  id: string
  label: string
  color: string
  category: ThemeCategory
}

export type ThemeCategory = 'classic' | 'developer' | 'gaming' | 'popculture'

export const categoryConfig: Record<ThemeCategory, { label: string; icon: string }> = {
  classic:    { label: 'Classic',     icon: '🎨' },
  developer:  { label: 'Developer',   icon: '💻' },
  gaming:     { label: 'Gaming',      icon: '🎮' },
  popculture: { label: 'Pop Culture', icon: '🎬' },
}

export const themes: Theme[] = [
  // ── Classic ──
  { id: 'indigo',   label: 'Indigo',   color: '#4263eb', category: 'classic' },
  { id: 'purple',   label: 'Purple',   color: '#a855f7', category: 'classic' },
  { id: 'teal',     label: 'Teal',     color: '#14b8a6', category: 'classic' },
  { id: 'rose',     label: 'Rose',     color: '#e11d48', category: 'classic' },
  { id: 'emerald',  label: 'Emerald',  color: '#10b981', category: 'classic' },
  { id: 'amber',    label: 'Amber',    color: '#f59e0b', category: 'classic' },
  { id: 'sunset',   label: 'Sunset',   color: '#f97316', category: 'classic' },
  { id: 'crimson',  label: 'Crimson',  color: '#dc2626', category: 'classic' },
  { id: 'mint',     label: 'Mint',     color: '#2dd4a8', category: 'classic' },
  { id: 'violet',   label: 'Violet',   color: '#8b5cf6', category: 'classic' },
  { id: 'coral',    label: 'Coral',    color: '#f97066', category: 'classic' },
  { id: 'sage',     label: 'Sage',     color: '#7c9a72', category: 'classic' },
  { id: 'slate',    label: 'Slate',    color: '#64748b', category: 'classic' },
  { id: 'peach',    label: 'Peach',    color: '#f5a078', category: 'classic' },
  { id: 'lavender', label: 'Lavender', color: '#b48eda', category: 'classic' },
  { id: 'rust',     label: 'Rust',     color: '#c45e2c', category: 'classic' },
  { id: 'lime',     label: 'Lime',     color: '#84cc16', category: 'classic' },
  { id: 'ocean',    label: 'Ocean',    color: '#0ea5e9', category: 'classic' },
  { id: 'aurora',   label: 'Aurora',   color: '#22d3ee', category: 'classic' },
  { id: 'neon',     label: 'Neon',     color: '#39ff14', category: 'classic' },
  // ── Developer ──
  { id: 'nord',        label: 'Nord',        color: '#88c0d0', category: 'developer' },
  { id: 'dracula',     label: 'Dracula',     color: '#bd93f9', category: 'developer' },
  { id: 'tokyo-night', label: 'Tokyo Night', color: '#7aa2f7', category: 'developer' },
  { id: 'monokai',     label: 'Monokai',     color: '#a6e22e', category: 'developer' },
  { id: 'gruvbox',     label: 'Gruvbox',     color: '#fe8019', category: 'developer' },
  { id: 'solarized',   label: 'Solarized',   color: '#268bd2', category: 'developer' },
  { id: 'one-dark',    label: 'One Dark',    color: '#61afef', category: 'developer' },
  { id: 'rose-pine',   label: 'Rosé Pine',   color: '#ebbcba', category: 'developer' },
  { id: 'catppuccin',  label: 'Catppuccin',  color: '#cba6f7', category: 'developer' },
  { id: 'github-dark', label: 'GitHub Dark', color: '#58a6ff', category: 'developer' },
  { id: 'everforest',  label: 'Everforest',  color: '#a7c080', category: 'developer' },
  { id: 'kanagawa',    label: 'Kanagawa',    color: '#7e9cd8', category: 'developer' },
  { id: 'flexoki',     label: 'Flexoki',     color: '#d0a215', category: 'developer' },
  { id: 'nightfox',    label: 'Nightfox',    color: '#719cd6', category: 'developer' },
  { id: 'palenight',   label: 'Palenight',   color: '#82aaff', category: 'developer' },
  { id: 'vscode',      label: 'VS Code',     color: '#007acc', category: 'developer' },
  { id: 'atom',        label: 'Atom',        color: '#528bff', category: 'developer' },
  // ── Gaming ──
  { id: 'cyberpunk',    label: 'Cyberpunk',    color: '#ecec00', category: 'gaming' },
  { id: 'warzone',      label: 'Warzone',      color: '#6b8c3f', category: 'gaming' },
  { id: 'valorant',     label: 'Valorant',     color: '#ff4655', category: 'gaming' },
  { id: 'minecraft',    label: 'Minecraft',    color: '#5b8731', category: 'gaming' },
  { id: 'fortnite',     label: 'Fortnite',     color: '#00bfff', category: 'gaming' },
  { id: 'gta',          label: 'GTA',          color: '#ff8c00', category: 'gaming' },
  { id: 'hacker',       label: 'Hacker',       color: '#00e676', category: 'gaming' },
  { id: 'blood',        label: 'Blood',        color: '#8b0000', category: 'gaming' },
  { id: 'elden-ring',   label: 'Elden Ring',   color: '#c79c3a', category: 'gaming' },
  { id: 'dark-souls',   label: 'Dark Souls',   color: '#a05020', category: 'gaming' },
  { id: 'apex-legends', label: 'Apex Legends', color: '#e2442f', category: 'gaming' },
  { id: 'csgo',         label: 'CS:GO',        color: '#de9b35', category: 'gaming' },
  // ── Pop Culture ──
  { id: 'synthwave',     label: 'Synthwave',      color: '#ff32b2', category: 'popculture' },
  { id: 'stranger',      label: 'Stranger',       color: '#ff1744', category: 'popculture' },
  { id: 'matrix',        label: 'Matrix',         color: '#00ff41', category: 'popculture' },
  { id: 'tron',          label: 'Tron',           color: '#18dcff', category: 'popculture' },
  { id: 'vaporwave',     label: 'Vaporwave',      color: '#ff71ce', category: 'popculture' },
  { id: 'evangelion',    label: 'Evangelion',      color: '#9b30ff', category: 'popculture' },
  { id: 'winter-coming', label: 'Winter Coming',  color: '#6fc1ff', category: 'popculture' },
]

export const DEFAULT_THEME = 'indigo'

export function getStoredTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME
  return localStorage.getItem('portfolio-theme') || DEFAULT_THEME
}

export function applyTheme(themeId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('portfolio-theme', themeId)
  document.documentElement.setAttribute('data-theme', themeId)
}

/** Inline script to run in <head> before render to prevent theme flash */
export const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme')||'indigo';document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('dark')}catch(e){}})();`
