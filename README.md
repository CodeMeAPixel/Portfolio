# CodeMeAPixel Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-blue?logo=next.js&style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?logo=tailwindcss&style=flat-square)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/github/license/CodeMeAPixel/portfolio?style=flat-square)](LICENSE)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open%20in%20GitHub-222?logo=github&style=flat-square)](https://github.com/codemeapixel/portfolio/codespaces)

> **A modern, full-stack developer portfolio built with Next.js, TypeScript, Tailwind CSS, and a focus on performance, accessibility, and developer experience.**

---

## 🚀 Features

- **Next.js 14+**: App Router, SSR, SSG, ISR, and API routes.
- **TypeScript**: End-to-end type safety.
- **Tailwind CSS**: Utility-first, responsive, and themeable design.
- **MDX Blog**: Write posts in Markdown + JSX with syntax highlighting, line numbers, and custom components.
- **Dynamic Projects & Referrals**: Easily add projects, referrals, and categories via TypeScript data files.
- **Animated UI**: Framer Motion, custom CSS animations, and pixel/glitch effects.
- **Theme Support**: Multiple color themes with instant switching and persistence.
- **Responsive & Accessible**: Mobile-first, keyboard navigable, and WCAG-friendly.
- **Playlist & Music Player**: Curated playlists with a custom React music player and pagination.
- **Social & Contact Links**: Easily configurable, with icons and tooltips.
- **SEO & Open Graph**: Optimized for sharing and discoverability.
- **Vercel Ready**: Instant deployment with edge support.

---

## 🛠️ Tech Stack

| Tool            | Description                                                                                 |
|-----------------|--------------------------------------------------------------------------------------------|
| [Next.js]       | React framework for SSR, SSG, ISR, and API routes                                          |
| [TypeScript]    | Static typing for safer, scalable code                                                     |
| [Tailwind CSS]  | Utility-first CSS framework for rapid UI development                                       |
| [Framer Motion] | Animation library for React                                                                |
| [MDX]           | Markdown + JSX for blog posts and documentation                                            |
| [PrismJS]       | Syntax highlighting for code blocks                                                        |
| [React Icons]   | Icon library for consistent iconography                                                    |
| [Vercel]        | Hosting and edge deployment                                                                |

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

- Supports multiple color themes (blue, purple, teal, rose, etc.).
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
[TypeScript]: https://www.typescriptlang.org/
[Tailwind CSS]: https://tailwindcss.com/
[Framer Motion]: https://www.framer.com/motion/
[MDX]: https://mdxjs.com/
[PrismJS]: https://prismjs.com/
[React Icons]: https://react-icons.github.io/react-icons/
[Vercel]: https://vercel.com/
