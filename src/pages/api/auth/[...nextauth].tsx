import NextAuth from 'next-auth'

import { authOptions } from '@/lib/utils/authOptions'

export default NextAuth(authOptions)
