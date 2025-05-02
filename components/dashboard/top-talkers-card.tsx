import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopTalkersCard() {
  const topTalkers = [
    { host: "192.168.1.100", name: "Desktop-PC1", traffic: 85, bytes: "1.2 GB" },
    { host: "192.168.1.101", name: "Laptop-User2", traffic: 65, bytes: "850 MB" },
    { host: "192.168.1.102", name: "Mobile-User3", traffic: 45, bytes: "620 MB" },
    { host: "192.168.1.103", name: "Desktop-PC4", traffic: 30, bytes: "420 MB" },
    { host: "192.168.1.104", name: "Server-Web", traffic: 25, bytes: "350 MB" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Talkers</CardTitle>
        <CardDescription>Hosts with highest traffic volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topTalkers.map((talker) => (
            <div key={talker.host} className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{talker.name}</p>
                  <p className="text-xs text-muted-foreground">{talker.host}</p>
                </div>
                <p className="text-sm font-medium">{talker.bytes}</p>
              </div>
              <Progress value={talker.traffic} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
