"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  username: string
  role: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount
    const storedAuth = localStorage.getItem("isAuthenticated") === "true"
    const storedUser = localStorage.getItem("user")

    if (storedAuth && storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)

      // Set a cookie for server-side auth checks
      document.cookie = `isAuthenticated=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    if (username === "admin" && password === "admin") {
      const userData = {
        username: "admin",
        role: "admin",
        name: "Administrator",
        email: "admin@example.com",
      }

      setUser(userData)
      setIsAuthenticated(true)

      // Store in localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify(userData))

      // Set a cookie for server-side auth checks
      document.cookie = `isAuthenticated=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)

    // Clear localStorage
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")

    // Clear cookie
    document.cookie = "isAuthenticated=; path=/; max-age=0"

    // Redirect to login
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
