import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, NetworkIcon, WifiIcon } from "lucide-react"

export function FlowsStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <NetworkIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Flow Rate</p>
              <p className="text-2xl font-bold">124/s</p>
              <p className="text-xs text-muted-foreground">Average over 5 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ArrowDownIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Inbound</p>
              <p className="text-2xl font-bold">845</p>
              <p className="text-xs text-muted-foreground">68% of total flows</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ArrowUpIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Outbound</p>
              <p className="text-2xl font-bold">403</p>
              <p className="text-xs text-muted-foreground">32% of total flows</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
