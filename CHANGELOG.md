# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.0] - 2026-01-10

### Added

#### Customization System
- **Comprehensive User Preferences** with localStorage persistence
  - Font selection: system, monospace, serif, rounded
  - Layout density control: compact (0.85x), normal (1x), spacious (1.15x)
  - Animations toggle: enable/disable all site animations globally
  - Sound effects toggle: synthetic audio feedback on interactions

#### New Components
- **useSounds.ts** (`src/hooks/useSounds.ts`) - Web Audio API hook for synthetic sound generation
  - Generates 4 sound types without external audio files:
    - `click` - 800Hz, 0.08s (UI interactions)
    - `hover` - 600Hz, 0.05s (hover feedback)
    - `success` - 1000Hz, 0.15s (success actions)
    - `error` - 300Hz, 0.2s (error states)
  - Respects soundsEnabled setting from context
  - Exponential gain envelope for natural sound decay

#### Features
- Sound effects integrated into CustomizationPanel
- Sound feedback on theme selection (ThemeSelector and MobileThemeMenu)
- All customization settings persist via localStorage
- Settings accessible via Settings tab in theme menu (desktop & mobile)

### Changed

#### Customization UI
- **CustomizationPanel** refactored:
  - Replaced dark mode toggle with sound effects toggle
  - Added sound feedback (playSound("click")) to all customization buttons
  - Updated settings summary to display: Animations, Sounds, Font, Density
  - Improved button styling and grouping

#### Theme Selection
- **ThemeSelector.tsx** - Added sound effect on theme color selection
- **MobileThemeMenu.tsx** - Added sound effect on theme color selection

#### State Management
- **ThemeContext.tsx** - Replaced `darkMode`/`setDarkMode` with `soundsEnabled`/`setSoundsEnabled`
- Updated localStorage keys: "soundsEnabled" replaces "darkMode"
- Simplified context effects after dark mode removal

#### Component Updates
- **ApplyCustomizations.tsx** - Removed dark mode logic, simplified to active features only
- **layout.tsx** - Cleaned up initialization script, removed dark mode references
- **globals.css** - Removed dark mode CSS rules (no longer needed)

### Fixed

- **Font changes not applying** - Added universal CSS selector with !important to override Tailwind font-family defaults
- **Density spacing not working** - Enhanced gap selectors with [class*="gap-"] rule and !important specificity
- **Tailwind syntax error** - Fixed extra closing braces in tailwind.config.ts
- **CSS specificity issues** - Improved customization CSS rules to reliably override framework defaults

### Technical

- Web Audio API implementation for lightweight sound synthesis (no dependencies)
- Enhanced CSS specificity for customization features
- Type-safe state management with proper localStorage persistence
- Clean separation of concerns between sound generation, state, and UI

---

## [3.1.0] - 2026-01-08

### Added

#### New Pages
- **CV / Resume Page** (`/cv`) - Downloadable and shareable CV with premium styling
  - Print-optimized PDF generation via `react-to-print`
  - Native share API integration with clipboard fallback
  - Professional CV document with experience, skills, projects, and certifications

#### New Projects (5 total)
- **Lexicon** - AI-powered writing assistant for content creators
- **ByteProxy** - Extensible web proxy for Discord/GitHub APIs with rate limiting
- **Socket0** - WebSocket server with message broker capabilities (Go)
- **Void** - Reverse proxy and maintenance server with glassmorphic UI (Go)
- **Flicker** - Cross-platform screenshot/upload tool for Emberly (Tauri + React + Rust)

#### New Components
- **CVDocument** (`src/components/cv/CVDocument.tsx`) - Printable CV component with professional styling
- **CVContent** (`src/components/layouts/cv/CVContent.tsx`) - CV page layout with download/share actions

#### New Data Files
- **cvData.ts** (`src/data/cvData.ts`) - Centralized CV data (personal info, experience, skills, projects)

### Changed

#### Hero Section
- Added animated rotating titles that cycle through professional, funny, and personal titles
  - Includes: "Fullstack Developer", "Graphics Designer", "Full Time Father", "Ice Cold Canadian", "Bug Whisperer", "Coffee to Code Converter", and more
  - Smooth fade/slide animation with 3-second intervals

#### Skills Page
- Premium design restoration with glassmorphism styling
- Custom dropdown component for mobile category filter (replacing broken native select)
- Enhanced search functionality and category tabs

#### About Page
- Added "Download CV" button to CTA section
- Redesigned floating badges to match homepage style:
  - Added glow effects behind badges
  - Consistent `glass-frost` styling
  - Repositioned location badge with hover glow
  - Added decorative floating elements

#### Home About Section
- Added "Download CV" button alongside "Learn more about me"

#### Project System
- Made `images` field optional in Project type (`images?: string[]`)
- **ProjectDetail** - Conditional grid layout for projects with/without images
- **ImageCarousel** - Placeholder UI for projects with empty image arrays

#### TechIcon Component
- Fixed missing icons: replaced non-existent `SiCsharp` and `SiC` with `DiVisualstudio` and `FaCode`

### Fixed

- **Skills Mobile Filter** - Replaced broken native `<select>` with custom dropdown component
- **Projects Without Images** - Added conditional rendering and placeholder UI
- **Metadata TypeError** - Added optional chaining for `project.images?.[0]` in generateMetadata
- **Badge Inconsistency** - Synchronized About page badges with homepage design

### Dependencies

- Added `react-to-print@3.2.0` for PDF generation

---

## [3.0.0] - 2025-12-27

### Added

#### New Pages
- **Just Ask Page** (`/just-ask`) - Developer-focused communication guide inspired by nohello.club with premium glassmorphism styling
- Dynamic Open Graph images using Next.js `ImageResponse` API
  - `opengraph-image.tsx` - Auto-generated OG images for social sharing
  - `twitter-image.tsx` - Optimized Twitter card images

#### New Themes (10 additional themes, 26 total)
- **Gaming Category**
  - Warzone - Military tactical green theme
  - Valorant - Red and cyan competitive theme
  - Minecraft - Grass green blocky theme
  - Fortnite - Purple storm theme
- **Pop Culture Category**
  - GTA Vice City - Retro pink/cyan Miami theme
  - Mr. Robot (Hacker) - Terminal green on black
  - Blade Runner (Blood) - Dystopian red noir
  - Deep Ocean - Calming teal depths
  - Northern Lights (Aurora) - Green/purple polar theme
  - Neon City - Vibrant magenta cyberpunk

#### New Components
- **ProjectCard** (`src/components/projects/ProjectCard.tsx`) - Shared reusable project card component with:
  - Grid layout variant with animated glow effects
  - Compact/table layout variant for list views
  - Search query highlighting support
  - Featured project badges
  - Spotlight hover effects

#### Enhanced UI Features
- Premium glassmorphism styling across all components (`glass-ultra`, `glass-frost`, `shine-sweep`)
- Animated floating orbs background effects
- Aurora gradient backgrounds with dot pattern overlays
- Gradient accent lines for section separation

### Changed

#### Theme System Overhaul
- Reorganized theme selector with category tabs (Gaming, Pop Culture, Developer, Classic)
- Added emoji icons for each theme
- Improved theme picker grid layout with better visual hierarchy
- Fixed theme flash on page refresh by synchronizing inline script with ThemeContext

#### Error & Not Found Pages
- Complete redesign of `not-found.tsx` with premium glassmorphism styling
- Complete redesign of `error.tsx` with red-tinted accents for error states
- Added animated floating orbs and aurora backgrounds
- Premium terminal-style error displays with typing animations
- Glass-morphic buttons with hover effects

#### Component Improvements
- **TechIcon** - Added glassmorphism fallback for missing icons
- **ImageCarousel** - Premium glass-frost navigation buttons with glow effects
- **TableOfContents** - Active section indicators with gradient lines
- **MDXComponents** - Enhanced code blocks, tables, and blockquotes with premium styling
- **ThemeSelector** - Category-based organization with improved UX

#### Project Data Updates
- Updated Emberly project with accurate data from embrly.ca
- Updated NodeByte Hosting project with accurate data from nodebyte.host
- Extended `Project` type interface with `documentation`, `support`, and `partners` fields

#### Metadata & SEO
- Enhanced OpenGraph metadata with dynamic image generation
- Improved Twitter card configuration (`summary_large_image`)
- Added comprehensive keywords, authors, creator, and publisher metadata
- Fixed duplicate `images` property in Twitter metadata

#### Background Consistency
- Standardized all pages to use inline multi-layer background pattern
- Removed `BackgroundEffects` component in favor of consistent inline styling
- All pages now use `bg-aurora`, `bg-dot-pattern`, and animated floating orbs

### Fixed

- **Hydration Error** - Fixed localStorage access during SSR in Loader component by adding `mounted` state
- **Theme Flash** - Synchronized layout.tsx inline script with ThemeContext's 26 valid themes
- **ProjectsContent Corruption** - Recreated file after partial string replacement corruption
- **Metadata Errors** - Removed duplicate `images` property in Twitter metadata config

### Removed

- `BackgroundEffects.tsx` component - Replaced with consistent inline background patterns
- Static OG image references in metadata (replaced with dynamic generation)
- Old pixel grid background patterns from error pages

### Technical

- Added Edge runtime support for OG image generation
- Improved type safety with extended Project interface
- Better code organization with shared ProjectCard component
- Reduced bundle size by removing unused BackgroundEffects component

---

## Version History

- **v3.1.0** - CV system, 5 new projects, animated hero titles, skills page improvements
- **v3.0.0** - Major UI/UX overhaul with premium glassmorphism, 26 themes, dynamic OG images
- **v2.x.x** - Previous stable releases (pre-glassmorphism)
- **v1.x.x** - Initial portfolio release

[Unreleased]: https://github.com/CodeMeAPixel/Portfolio/compare/v3.2.0...HEAD
[3.2.0]: https://github.com/CodeMeAPixel/Portfolio/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/CodeMeAPixel/Portfolio/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/CodeMeAPixel/Portfolio/releases/tag/v3.0.0
