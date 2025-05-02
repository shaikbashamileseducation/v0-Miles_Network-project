import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircleIcon, AlertTriangleIcon, InfoIcon } from "lucide-react"

export function AlertsCard() {
  const alerts = [
    {
      id: 1,
      severity: "critical",
      message: "Backup Server is down",
      time: "10 min ago",
      device: "Backup Server",
    },
    {
      id: 2,
      severity: "warning",
      message: "High CPU usage on Web Server",
      time: "25 min ago",
      device: "Web Server",
    },
    {
      id: 3,
      severity: "info",
      message: "New device connected",
      time: "1 hour ago",
      device: "Unknown Device",
    },
    {
      id: 4,
      severity: "warning",
      message: "Unusual traffic pattern detected",
      time: "2 hours ago",
      device: "Network",
    },
    {
      id: 5,
      severity: "info",
      message: "Scheduled maintenance completed",
      time: "3 hours ago",
      device: "System",
    },
  ]

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircleIcon className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
      case "info":
        return <InfoIcon className="h-4 w-4 text-blue-500" />
      default:
        return <InfoIcon className="h-4 w-4" />
    }
  }

  const getAlertBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Info
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Latest alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2">
              {getAlertIcon(alert.severity)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.message}</p>
                  {getAlertBadge(alert.severity)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <p>{alert.device}</p>
                  <p>{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
