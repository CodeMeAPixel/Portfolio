# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- **v3.0.0** - Major UI/UX overhaul with premium glassmorphism, 26 themes, dynamic OG images
- **v2.x.x** - Previous stable releases (pre-glassmorphism)
- **v1.x.x** - Initial portfolio release

[Unreleased]: https://github.com/CodeMeAPixel/Portfolio/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/CodeMeAPixel/Portfolio/releases/tag/v3.0.0
