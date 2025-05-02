"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon, ServerIcon, WifiIcon } from "lucide-react"

interface NetworkOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NetworkOverview({ className, ...props }: NetworkOverviewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Network Overview</CardTitle>
        <CardDescription>Real-time status of your network devices and traffic</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ServerIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Devices</p>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">45 Up</span> / <span className="text-red-500">3 Down</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <WifiIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Active Hosts</p>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-xs text-muted-foreground">+12 in the last hour</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ArrowDownIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Download</p>
                  <p className="text-2xl font-bold">24.8 Mbps</p>
                  <p className="text-xs text-muted-foreground">2.1 TB today</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ArrowUpIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Upload</p>
                  <p className="text-2xl font-bold">5.2 Mbps</p>
                  <p className="text-xs text-muted-foreground">428 GB today</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="traffic">
            <div className="h-[200px] rounded-lg border">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="devices">
            <div className="h-[200px] rounded-lg border">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Device status will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
