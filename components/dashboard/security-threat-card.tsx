import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangleIcon, ShieldIcon, ShieldXIcon } from "lucide-react"

export function SecurityThreatCard() {
  const threats = [
    {
      id: 1,
      type: "malicious_ip",
      detail: "185.143.223.12",
      source: "VirusTotal",
      score: "18/67 engines",
      time: "5 min ago",
      severity: "high",
    },
    {
      id: 2,
      type: "suspicious_domain",
      detail: "download-update-service.net",
      source: "VirusTotal",
      score: "12/67 engines",
      time: "20 min ago",
      severity: "medium",
    },
    {
      id: 3,
      type: "malware_hash",
      detail: "e1a9...",
      source: "VirusTotal",
      score: "54/67 engines",
      time: "1 hour ago",
      severity: "critical",
    },
    {
      id: 4,
      type: "suspicious_url",
      detail: "http://invoice-secure-doc.com/...",
      source: "VirusTotal",
      score: "8/67 engines",
      time: "2 hours ago",
      severity: "medium",
    },
  ]

  const getThreatIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <ShieldXIcon className="h-4 w-4 text-red-600" />
      case "high":
        return <ShieldXIcon className="h-4 w-4 text-red-500" />
      case "medium":
        return <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
      default:
        return <ShieldIcon className="h-4 w-4 text-blue-500" />
    }
  }

  const getThreatBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Medium
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Low
          </Badge>
        )
    }
  }

  const getThreatTypeLabel = (type: string) => {
    switch (type) {
      case "malicious_ip":
        return "Malicious IP"
      case "suspicious_domain":
        return "Suspicious Domain"
      case "malware_hash":
        return "Malware Hash"
      case "suspicious_url":
        return "Suspicious URL"
      default:
        return "Unknown Threat"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Threats</CardTitle>
        <CardDescription>Recent threats detected by VirusTotal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threats.map((threat) => (
            <div key={threat.id} className="flex items-start gap-2">
              {getThreatIcon(threat.severity)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{getThreatTypeLabel(threat.type)}</p>
                  {getThreatBadge(threat.severity)}
                </div>
                <p className="text-xs">{threat.detail}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <p>
                    {threat.source}: {threat.score}
                  </p>
                  <p>{threat.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
