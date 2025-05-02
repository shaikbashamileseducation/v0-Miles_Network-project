import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, NetworkIcon, WifiIcon } from "lucide-react"

export function TrafficStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="realtime">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="realtime">Real-time</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="realtime">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <NetworkIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Traffic</p>
                  <p className="text-2xl font-bold">30.0 Mbps</p>
                  <p className="text-xs text-muted-foreground">2.5 TB today</p>
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
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <WifiIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Active Flows</p>
                  <p className="text-2xl font-bold">1,248</p>
                  <p className="text-xs text-muted-foreground">+32 in the last minute</p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-[300px] rounded-lg border">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Real-time traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hourly">
            <div className="h-[400px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Hourly traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="daily">
            <div className="h-[400px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Daily traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="weekly">
            <div className="h-[400px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Weekly traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="monthly">
            <div className="h-[400px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Monthly traffic graph will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
