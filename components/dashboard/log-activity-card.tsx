import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircleIcon, FileTextIcon, ShieldIcon, WifiIcon } from "lucide-react"

export function LogActivityCard() {
  const logEvents = [
    {
      id: 1,
      source: "Firewall",
      message: "Connection blocked from 203.0.113.5",
      time: "2 min ago",
      type: "security",
    },
    {
      id: 2,
      source: "Router",
      message: "Interface GigabitEthernet0/1 down",
      time: "15 min ago",
      type: "network",
    },
    {
      id: 3,
      source: "Web Server",
      message: "HTTP 500 error on /api/users",
      time: "28 min ago",
      type: "application",
    },
    {
      id: 4,
      source: "Switch",
      message: "Port 24 high error rate",
      time: "45 min ago",
      type: "network",
    },
    {
      id: 5,
      source: "Auth Server",
      message: "Multiple failed login attempts for admin",
      time: "1 hour ago",
      type: "security",
    },
  ]

  const getLogIcon = (type: string) => {
    switch (type) {
      case "security":
        return <ShieldIcon className="h-4 w-4 text-red-500" />
      case "network":
        return <WifiIcon className="h-4 w-4 text-blue-500" />
      case "application":
        return <FileTextIcon className="h-4 w-4 text-amber-500" />
      default:
        return <AlertCircleIcon className="h-4 w-4" />
    }
  }

  const getLogBadge = (type: string) => {
    switch (type) {
      case "security":
        return <Badge variant="destructive">Security</Badge>
      case "network":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Network
          </Badge>
        )
      case "application":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Application
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Activity</CardTitle>
        <CardDescription>Recent log events from network devices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-2">
              {getLogIcon(event.type)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{event.message}</p>
                  {getLogBadge(event.type)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <p>{event.source}</p>
                  <p>{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
