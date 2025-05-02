"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3Icon,
  GlobeIcon,
  HardDriveIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  NetworkIcon,
  ServerIcon,
  SettingsIcon,
  ShieldAlertIcon,
  WifiIcon,
  FileTextIcon,
  SearchIcon,
  AlertTriangleIcon,
  DatabaseIcon,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: ServerIcon,
  },
  {
    title: "Traffic",
    href: "/traffic",
    icon: NetworkIcon,
  },
  {
    title: "Flows",
    href: "/flows",
    icon: WifiIcon,
  },
  {
    title: "Logs",
    href: "/logs",
    icon: FileTextIcon,
  },
  {
    title: "Security",
    href: "/security",
    icon: ShieldAlertIcon,
  },
  {
    title: "Protocols",
    href: "/protocols",
    icon: GlobeIcon,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: AlertTriangleIcon,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3Icon,
  },
  {
    title: "Maps",
    href: "/maps",
    icon: LineChartIcon,
  },
  {
    title: "Storage",
    href: "/storage",
    icon: HardDriveIcon,
  },
  {
    title: "Search",
    href: "/search",
    icon: SearchIcon,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: DatabaseIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="py-2">
          <h2 className="px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="mt-3 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
