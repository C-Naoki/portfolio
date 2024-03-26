import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const useConditionalRedirect = ({ condition, redirectTo }: { condition: boolean, redirectTo: string }): void => {
  const router = useRouter()

  useEffect(() => {
    const Redirect = async (): Promise<void> => {
      if (condition) {
        await router.push(redirectTo)
      }
    }
    void Redirect()
  }, [condition, redirectTo, router])
}
