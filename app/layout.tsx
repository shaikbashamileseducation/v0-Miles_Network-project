import type React from "react"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Sidebar } from "@/components/sidebar"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Miles Network Monitor",
  description: "A comprehensive network monitoring tool combining PRTG and ntopng features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
