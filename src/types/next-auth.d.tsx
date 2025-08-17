import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      login?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    login?: string
  }
}
