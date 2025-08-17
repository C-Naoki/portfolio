import GitHubProvider from 'next-auth/providers/github'

import type { NextAuthOptions } from 'next-auth'

const allowed = (process.env.GITHUB_ALLOWED_LOGINS ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn ({ profile }) {
      const login = (profile as any)?.login as string | undefined
      if (login === undefined || login === null || login.trim() === '') return false
      return allowed.includes(login)
    },
    async jwt ({ token, profile }) {
      if (profile !== null && profile !== undefined && typeof (profile as any).login === 'string' && (profile as any).login.trim() !== '') {
        ;(token as any).login = (profile as any).login
      }
      return token
    },
    async session ({ session, token }) {
      ;(session.user as any).login = (token as any).login
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
