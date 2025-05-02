import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { BellIcon, SettingsIcon } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Miles Network Monitor</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
