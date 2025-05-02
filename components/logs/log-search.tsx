"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, ClockIcon, SaveIcon } from "lucide-react"

export function LogSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("15m")

  const savedSearches = [
    "error source=firewall",
    "failed login source=auth-server",
    "interface down source=router",
    "http 500 source=web-server",
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search logs... (e.g., error source=firewall)"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">Last 15 minutes</SelectItem>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button>Search</Button>
              <Button variant="outline" size="icon">
                <SaveIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Saved Searches:</span>
            {savedSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs"
                onClick={() => setSearchQuery(search)}
              >
                <ClockIcon className="h-3 w-3" />
                {search}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
