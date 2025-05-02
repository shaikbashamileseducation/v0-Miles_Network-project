import { Card, CardContent } from "@/components/ui/card"
import { ShieldIcon, ShieldAlertIcon, ShieldCheckIcon, AlertTriangleIcon } from "lucide-react"

export function SecurityOverview() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Security Score</p>
              <p className="text-2xl font-bold">86%</p>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldAlertIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Active Threats</p>
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs text-muted-foreground">2 critical, 5 medium</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangleIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Suspicious IPs</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">3 blocked automatically</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Scans Completed</p>
              <p className="text-2xl font-bold">1,248</p>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
