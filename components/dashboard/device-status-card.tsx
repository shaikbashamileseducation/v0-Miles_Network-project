import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

export function DeviceStatusCard() {
  const devices = [
    { name: "Core Router", status: "up", ip: "192.168.1.1", type: "Router" },
    { name: "Main Switch", status: "up", ip: "192.168.1.2", type: "Switch" },
    { name: "File Server", status: "up", ip: "192.168.1.10", type: "Server" },
    { name: "Backup Server", status: "down", ip: "192.168.1.11", type: "Server" },
    { name: "Web Server", status: "up", ip: "192.168.1.20", type: "Server" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Status</CardTitle>
        <CardDescription>Status of critical network devices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.ip} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {device.status === "up" ? (
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.ip}</p>
                </div>
              </div>
              <Badge variant={device.status === "up" ? "outline" : "destructive"}>{device.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
