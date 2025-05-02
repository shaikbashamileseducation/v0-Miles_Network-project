import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ThreatIntelligence() {
  const threatFeeds = [
    {
      name: "VirusTotal",
      status: "active",
      lastUpdate: "2 min ago",
      indicators: 1248,
    },
    {
      name: "AlienVault OTX",
      status: "active",
      lastUpdate: "15 min ago",
      indicators: 3567,
    },
    {
      name: "MISP",
      status: "active",
      lastUpdate: "1 hour ago",
      indicators: 2134,
    },
    {
      name: "Abuse.ch",
      status: "active",
      lastUpdate: "30 min ago",
      indicators: 987,
    },
    {
      name: "Custom Feed",
      status: "inactive",
      lastUpdate: "1 day ago",
      indicators: 156,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Intelligence</CardTitle>
        <CardDescription>Active threat feeds and indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threatFeeds.map((feed) => (
            <div key={feed.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{feed.name}</p>
                <p className="text-xs text-muted-foreground">
                  Updated {feed.lastUpdate} • {feed.indicators} indicators
                </p>
              </div>
              <Badge variant={feed.status === "active" ? "outline" : "secondary"}>
                {feed.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
