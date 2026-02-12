import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useEffect, useState, useMemo } from 'react'
import { Home, LogIn, Terminal, ShieldAlert } from 'lucide-react'
import { createMeta } from '~/lib/meta'

const errorMessages: Record<string, string> = {
  OAuthSignin: 'Could not start the sign-in process. Try again.',
  OAuthCallback: 'The authentication provider returned an error.',
  OAuthAccountNotLinked: 'This email is already associated with another account.',
  Callback: 'Something went wrong during the callback.',
  AccessDenied: 'You do not have permission to sign in.',
  Configuration: 'There is a server configuration issue.',
  Verification: 'The verification link has expired or is invalid.',
  Default: 'An unexpected authentication error occurred.',
  unable_to_create_user: 'Could not create your account. Please try again.',
  invalid_account_id: 'The account could not be verified.',
  social_account_already_linked: 'This social account is already linked to another user.',
  provider_not_found: 'The requested sign-in provider was not found.',
  failed_to_get_user_info: 'Could not retrieve your info from the provider.',
}

const authErrorCodes = [
  'ERR_AUTH_FAILED',
  'ERR_TOKEN_EXPIRED',
  'ERR_ACCESS_DENIED',
  'ERR_OAUTH_REJECTED',
  'ERR_SESSION_INVALID',
  'ERR_HANDSHAKE_FAILED',
  'ERR_IDENTITY_CRISIS',
  'ERR_CREDENTIALS_LOST',
]

function useTypingEffect(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(id)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return displayed
}

export const Route = createFileRoute('/_site/auth-error')({
  head: () =>
    createMeta({
      title: 'Authentication Error',
      description: 'An error occurred during authentication.',
      path: '/auth-error',
    }),
  validateSearch: (search: Record<string, unknown>) => ({
    error: (search.error as string) || 'Default',
  }),
  component: AuthErrorPage,
})

function AuthErrorPage() {
  const { error } = useSearch({ from: '/auth-error' })

  const errorCode = useMemo(
    () => authErrorCodes[Math.floor(Math.random() * authErrorCodes.length)],
    [],
  )

  const message = errorMessages[error] || errorMessages.Default

  const terminalLines = [
    '$ auth login --provider oauth',
    `Authenticating...`,
    `Error: ${message}`,
    `    at verifyCallback (auth/handler:1:1)`,
    `    at processOAuth (auth/social:42:13)`,
    `$ echo $?`,
    `401`,
    `$ cat /var/log/auth.log`,
    `[${new Date().toISOString()}] ${errorCode}`,
    `$ suggest --fix`,
    `> Try signing in again or use a different provider.`,
  ]

  const fullText = terminalLines.join('\n')
  const typedText = useTypingEffect(fullText, 20)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      {/* Giant 401 */}
      <div className="relative mb-8 select-none">
        <span
          className="text-[7rem] font-black leading-none sm:text-[10rem] md:text-[14rem]"
          style={{ color: 'color-mix(in srgb, #f59e0b 4%, transparent)' }}
        >
          401
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2">
            <div
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'color-mix(in srgb, #f59e0b 12%, transparent)' }}
            >
              <ShieldAlert className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-sm font-mono text-muted-foreground">
              <span className="text-amber-500">&lt;</span>
              {' '}auth_error{' '}
              <span className="text-amber-500">/&gt;</span>
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Authentication{' '}
              <span className="text-amber-500">failed</span>
            </h1>
            <p className="max-w-md text-sm text-muted-foreground sm:text-base">
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* Error code badge */}
      <div className="mb-6">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono"
          style={{
            borderColor: 'color-mix(in srgb, #f59e0b 25%, transparent)',
            color: '#f59e0b',
            background: 'color-mix(in srgb, #f59e0b 5%, transparent)',
          }}
        >
          <ShieldAlert className="h-3 w-3" />
          {errorCode}
        </span>
      </div>

      {/* Terminal card with amber tint */}
      <div className="mb-8 w-full max-w-lg">
        <div
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: 'color-mix(in srgb, #f59e0b 15%, transparent)',
            background: 'color-mix(in srgb, var(--card) 80%, #f59e0b06)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5"
            style={{ borderColor: 'color-mix(in srgb, #f59e0b 10%, transparent)' }}
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400/80">
              <Terminal className="h-3 w-3" />
              auth — terminal
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-4 text-left">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
              {typedText}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-amber-500" />
            </pre>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/login"
          className="group inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white transition-all hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          <LogIn className="h-4 w-4" />
          Try Again
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
