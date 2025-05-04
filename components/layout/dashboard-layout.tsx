"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Clock,
  HardDrive,
  Home,
  LogOut,
  PlusCircle,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userRole] = useState("admin") // In a real app, this would come from auth context

  const isActive = (path: string) => pathname === path

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Devices", href: "/devices", icon: HardDrive },
    { name: "Traffic", href: "/traffic", icon: Activity },
    { name: "Security", href: "/security", icon: Shield },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  ]

  // Admin-only navigation items
  const adminNavigation = [
    { name: "Add Device", href: "/devices/add", icon: PlusCircle },
    { name: "User Management", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1A1A2E] text-white">
      {/* Header with logo and user menu */}
      <header className="flex items-center justify-between p-4 border-b border-[#00FFFF]/20">
        <div className="flex items-center space-x-2">
          <img src="/miles-logo.png" alt="Miles Education Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            Network Monitor
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-[#00FFFF]" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10 flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Admin User
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1A1A2E] border border-[#00FFFF]/20">
              <DropdownMenuItem
                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                onClick={() => router.push("/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#00FFFF]/20" />
              <DropdownMenuItem className="text-white hover:bg-[#00FFFF]/10 cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Navigation */}
      <div className="flex items-center justify-between p-2 bg-[#1A1A2E]/80 border-b border-[#00FFFF]/10 overflow-x-auto">
        <div className="flex space-x-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className={`flex items-center ${
                isActive(item.href)
                  ? "bg-[#00FFFF]/10 text-[#00FFFF] border-b-2 border-[#00FFFF]"
                  : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
              }`}
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </div>

        {userRole === "admin" && (
          <div className="flex space-x-1">
            {adminNavigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className={`flex items-center ${
                  isActive(item.href)
                    ? "bg-[#FF00FF]/10 text-[#FF00FF] border-b-2 border-[#FF00FF]"
                    : "text-gray-400 hover:text-white hover:bg-[#FF00FF]/5"
                }`}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  )
}
