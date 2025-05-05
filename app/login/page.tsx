"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Lock, User } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(formData.username, formData.password)

      if (success) {
        router.push("/dashboard")
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A2E] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="pointer-events-none h-[500px] w-[900px] rounded-full bg-[#00FFFF] opacity-[0.02] blur-[100px]"></div>
        </div>
        <div className="absolute right-1/4 top-1/4">
          <div className="pointer-events-none h-[300px] w-[300px] rounded-full bg-[#FF00FF] opacity-[0.03] blur-[100px]"></div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            Miles Network Monitor
          </h1>
          <p className="mt-2 text-gray-400">Secure network monitoring solution</p>
        </div>

        <Card className="border border-[#00FFFF]/20 bg-[#1A1A2E]/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-[#00FFFF] data-[state=checked]:border-[#00FFFF]"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-[#00FFFF] p-0 h-auto" type="button">
                  Forgot password?
                </Button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-[#00FFFF]/10 pt-4">
            <p className="text-sm text-gray-400">Default credentials: admin / admin</p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-sm text-gray-400">
          Miles Network Monitor v1.0.0 • © {new Date().getFullYear()} Miles Education
        </p>
      </div>
    </div>
  )
}
