import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const  useConditionalRedirect = ({ condition, redirectTo }:  { condition: boolean, redirectTo: string }) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(redirectTo);
    }
  }, [condition, redirectTo, router]);
};
