import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import React from 'react'
import { themeScript } from '../lib/theme'
import { NotFoundPage } from '../components/NotFoundPage'
import { ErrorPage } from '../components/ErrorPage'
import { ConfirmProvider } from '../components/ConfirmDialog'
import { ToastProvider } from '../components/Toast'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#4263eb' },
      { name: 'author', content: 'Tyler H.' },
      { name: 'keywords', content: 'CodeMeAPixel, Fullstack Developer, Web Developer, React, TypeScript, Node.js, Portfolio, TanStack, Next.js' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Preload font CSS so it starts fetching early without blocking render
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap', as: 'style' },
    ],
  }),

  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
  shellComponent: RootDocument,
})

// Devtools are dynamically imported so they are never included in the production bundle.
const DevToolsPanel = import.meta.env.DEV
  ? React.lazy(() =>
      Promise.all([
        import('@tanstack/react-devtools'),
        import('@tanstack/react-router-devtools'),
        import('../integrations/tanstack-query/devtools'),
      ]).then(([{ TanStackDevtools }, { TanStackRouterDevtoolsPanel }, { default: TanStackQueryDevtools }]) => ({
        default: () => (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              { name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> },
              TanStackQueryDevtools,
            ]}
          />
        ),
      })),
    )
  : null

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Prevent theme flash — runs before any render */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Async font load: appended after page becomes interactive so it never blocks render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap';document.head.appendChild(l);}())`,
          }}
        />
        <HeadContent />
      </head>
      <body className="scrollbar-thin min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        {children}
        {import.meta.env.DEV && DevToolsPanel && (
          <React.Suspense fallback={null}>
            <DevToolsPanel />
          </React.Suspense>
        )}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <ConfirmProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </ConfirmProvider>
  )
}
