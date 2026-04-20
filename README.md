# CodeMeAPixel Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&style=flat-square&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&style=flat-square&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8?logo=tailwindcss&style=flat-square&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15.0-0055FF?logo=framer&style=flat-square&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/github/license/CodeMeAPixel/portfolio?style=flat-square)](LICENSE)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open%20in%20GitHub-181717?logo=github&style=flat-square)](https://github.com/codemeapixel/portfolio/codespaces)

> **A modern, full-stack developer portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Optimized for performance, accessibility, and exceptional developer experience.**

---

## 🚀 Features

- **Next.js 15+**: App Router, SSR, SSG, ISR, API routes, and Turbopack acceleration.
- **React 19**: Utilizing the latest React version with improved performance.
- **TypeScript**: End-to-end type safety with full TypeScript integration.
- **Tailwind CSS**: Utility-first, responsive design with multiple theme support.
- **MDX Blog**: Write posts with Markdown + JSX featuring syntax highlighting (via Shiki/Rehype Pretty Code), line numbers, and custom components.
- **Dynamic Projects & Referrals**: Modular TypeScript data files for easy content management.
- **Animated UI**: Powered by Framer Motion v11, custom CSS animations, and engaging pixel/glitch effects.
- **Theme System**: Multiple color themes (blue, purple, teal, rose, amber) with instant switching and local storage persistence.
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices.
- **Accessibility**: WCAG-compliant with keyboard navigation, semantic HTML, and proper contrast ratios.
- **Playlist & Music Player**: Custom React audio implementation with playlists and pagination.
- **Social Integration**: Configurable link hub with tooltips powered by Radix UI.
- **Advanced SEO**: Comprehensive metadata, Open Graph tags, and Twitter cards for maximum discoverability.
- **Vercel Optimized**: Ready for edge deployment with Vercel's platform features.
- **Developer Experience**: ESLint configuration, TypeScript strict mode, and organized project structure.

---

## 🛠️ Tech Stack

| Tool                  | Version    | Description                                                  |
|-----------------------|------------|--------------------------------------------------------------|
| [Next.js]             | 15.3.0     | React framework with App Router, SSR, and edge capabilities  |
| [React]               | 19.0.0     | UI library with the latest improvements and concurrent features |
| [TypeScript]          | 5.x        | Static typing for safer, more maintainable code              |
| [Tailwind CSS]        | 3.4.17     | Utility-first CSS framework with theming support             |
| [Framer Motion]       | 11.15.0    | Production-ready motion library for React                    |
| [MDX]                 | 5.0.0      | Markdown + JSX for rich content authoring                    |
| [Radix UI]            | 1.x-2.x    | Unstyled, accessible UI primitives for custom components     |
| [React Icons]         | 5.5.0      | Comprehensive icon library with consistent design            |
| [Rehype Pretty Code]  | 0.14.0     | Syntax highlighting with themes and line highlighting        |
| [Shiki]               | 3.2.1      | TextMate grammar-based syntax highlighter                    |
| [Tailwind Merge]      | 2.6.0      | Utility for merging Tailwind CSS classes                     |
| [date-fns]            | 4.1.0      | Modern JavaScript date utility library                       |
| [clsx]                | 2.1.1      | Tiny utility for constructing className strings conditionally |
| [Turbopack]           | Built-in   | Incremental bundler for faster builds and refreshes          |

---

## 📦 Project Structure

<details>
<summary><strong>Click to expand</strong></summary>

```
src/
  app/                # Next.js app directory (routes, pages, layouts)
  components/         # Reusable UI components (layouts, static, ui, etc.)
  lib/                # Data, API clients, and utility functions
    links/            # Link hub, playlists, categories, etc.
    projects/         # Project data and logic
  posts/              # Blog posts in MDX format
  styles/             # Tailwind and global CSS
  types/              # TypeScript types and interfaces
public/               # Static assets (images, covers, previews)
```
</details>

---

## 📝 Usage

### 1. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. **Build for production**

```bash
npm run build
npm start
```

---

## ✍️ Adding Content

### Blog Posts

- Add `.mdx` files to `src/posts/`.
- Use frontmatter for metadata:
  ```md
  ---
  title: 'My Post'
  date: '2025-03-01'
  description: 'A short summary.'
  tags: ['Next.js', 'React']
  ---
  ```

### Projects

- Add or edit files in `src/lib/projects/data/`.
- Use the `Project` type for structure and documentation.

### Referrals

- Add or edit files in `src/lib/referrals/data/`.
- Use the `Referral` and `ReferralCategory` types.

---

## 🎨 Theming

- Supports multiple color themes (blue, purple, teal, rose, amber, etc.).
- Theme is persisted and can be changed via the UI.

---

## 🎵 Playlist & Music Player

- Curated playlists in `src/lib/links/data/playlist/`.
- Custom React music player with pagination and genre filtering.

---

## 🧩 Customization

- **Navigation:** Edit `src/components/static/Navbar.tsx` for links and icons.
- **Social Links:** Configure in `src/lib/links/data/`.
- **Animations:** Customize in `src/styles/globals.css` and Framer Motion props.

---

## 🛡️ Accessibility & SEO

- Keyboard navigable, focus-visible, and color contrast checked.
- SEO meta tags and Open Graph support for rich sharing.

---

## 📄 License

This project is [MIT licensed](LICENSE).

---

## 🙋‍♂️ Author

**CodeMeAPixel**  
[Portfolio](https://codemeapixel.dev) • [GitHub](https://github.com/CodeMeAPixel) • [Twitter](https://twitter.com/CodeMeAPixel)

---

## ⭐️ Show your support

If you like this project, please consider starring the repo and sharing it!

[![Star on GitHub](https://img.shields.io/github/stars/CodeMeAPixel/portfolio?style=social)](https://github.com/CodeMeAPixel/portfolio)

---

[Next.js]: https://nextjs.org/
[React]: https://react.dev/
[TypeScript]: https://www.typescriptlang.org/
[Tailwind CSS]: https://tailwindcss.com/
[Framer Motion]: https://www.framer.com/motion/
[MDX]: https://mdxjs.com/
[Radix UI]: https://www.radix-ui.com/
[PrismJS]: https://prismjs.com/
[React Icons]: https://react-icons.github.io/react-icons/
[Vercel]: https://vercel.com/
