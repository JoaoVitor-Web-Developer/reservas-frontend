"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type User = { id: string; email: string; role?: string }

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const v = localStorage.getItem('user')
    return v ? JSON.parse(v) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = (t: string, u: User) => { setToken(t); setUser(u) }
  const logout = () => { setToken(null); setUser(null) }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
