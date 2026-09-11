'use client';

import { useEffect, useState } from 'react';
import { cheeckSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';


export default function AuthProvider({ children }: { children: React.ReactNode }){
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthentiated = await cheeckSession();
        if (isAuthentiated) {
          const user = await getMe();
          setUser(user)
        } else {
          clearIsAuthenticated()
        }
      } catch {
        clearIsAuthenticated()
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser();
  }, [setUser, clearIsAuthenticated])

  return isLoading ? <p>Loading...</p> : <>{ children }</>
}