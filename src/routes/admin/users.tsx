import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Shield, ShieldOff, Ban, UserCheck, Trash2, Search, Users as UsersIcon, Filter } from 'lucide-react'
import { createMeta } from '~/lib/meta'
import { getAdminUsers, updateUserRole, toggleUserBan, deleteUser } from '~/lib/admin-fns'

const usersQueryOptions = {
  queryKey: ['admin', 'users'],
  queryFn: () => getAdminUsers(),
}

export const Route = createFileRoute('/admin/users')({
  head: () => createMeta({ title: 'Users - Admin', path: '/admin/users' }),
  component: AdminUsers,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(usersQueryOptions)
  },
})

function AdminUsers() {
  const { data: users } = useSuspenseQuery(usersQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'MEMBER'>('ALL')
  const [loading, setLoading] = useState<string | null>(null)

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    setLoading(userId)
    try {
      await updateUserRole({ data: { userId, role: currentRole === 'ADMIN' ? 'MEMBER' : 'ADMIN' } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    } finally {
      setLoading(null)
    }
  }

  const handleBanToggle = async (userId: string, currentlyBanned: boolean) => {
    setLoading(userId)
    try {
      await toggleUserBan({ data: {
        userId,
        banned: !currentlyBanned,
        banReason: !currentlyBanned ? 'Banned by admin' : undefined,
      } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return
    setLoading(userId)
    try {
      await deleteUser({ data: { userId } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    } finally {
      setLoading(null)
    }
  }

  const adminCount = users.filter((u) => u.role === 'ADMIN').length
  const bannedCount = users.filter((u) => u.banned).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{users.length} total</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{adminCount} admin{adminCount !== 1 ? 's' : ''}</span>
          {bannedCount > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="text-red-400">{bannedCount} banned</span>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-foreground/[0.02] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-foreground/[0.02] p-0.5">
          {(['ALL', 'ADMIN', 'MEMBER'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                roleFilter === role
                  ? 'bg-foreground/[0.08] text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {role === 'ALL' ? 'All' : role === 'ADMIN' ? 'Admins' : 'Members'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-foreground/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">User</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Role</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Provider</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-foreground/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-border/50"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {user.name[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground/60">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        user.role === 'ADMIN'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-foreground/[0.05] text-muted-foreground'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex items-center gap-1.5">
                      {user.accounts.map((a: any) => (
                        <span
                          key={a.providerId}
                          className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] capitalize text-muted-foreground/70"
                        >
                          {a.providerId}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {user.banned ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        Banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        disabled={loading === user.id}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground disabled:opacity-40"
                        title={user.role === 'ADMIN' ? 'Demote to Member' : 'Promote to Admin'}
                      >
                        {user.role === 'ADMIN' ? (
                          <ShieldOff className="h-3.5 w-3.5" />
                        ) : (
                          <Shield className="h-3.5 w-3.5" />
                        )}
                        <span className="hidden xl:inline">
                          {user.role === 'ADMIN' ? 'Demote' : 'Promote'}
                        </span>
                      </button>

                      <button
                        onClick={() => handleBanToggle(user.id, user.banned)}
                        disabled={loading === user.id}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground disabled:opacity-40"
                        title={user.banned ? 'Unban user' : 'Ban user'}
                      >
                        {user.banned ? (
                          <UserCheck className="h-3.5 w-3.5" />
                        ) : (
                          <Ban className="h-3.5 w-3.5" />
                        )}
                        <span className="hidden xl:inline">
                          {user.banned ? 'Unban' : 'Ban'}
                        </span>
                      </button>

                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={loading === user.id}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xs text-muted-foreground/50 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                        title="Delete user"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <UsersIcon className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}
