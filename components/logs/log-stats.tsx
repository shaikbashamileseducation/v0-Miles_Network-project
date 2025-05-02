import { Card, CardContent } from "@/components/ui/card"
import { FileTextIcon, ShieldIcon, ServerIcon, WifiIcon } from "lucide-react"

export function LogStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileTextIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Total Logs</p>
              <p className="text-2xl font-bold">1.2M</p>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Security Events</p>
              <p className="text-2xl font-bold">1,248</p>
              <p className="text-xs text-muted-foreground">124 critical</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ServerIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">System Logs</p>
              <p className="text-2xl font-bold">458K</p>
              <p className="text-xs text-muted-foreground">32 errors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <WifiIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Network Logs</p>
              <p className="text-2xl font-bold">742K</p>
              <p className="text-xs text-muted-foreground">18 warnings</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
