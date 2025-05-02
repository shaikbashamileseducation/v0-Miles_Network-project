import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface TrafficAnalysisCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TrafficAnalysisCard({ className, ...props }: TrafficAnalysisCardProps) {
  const protocols = [
    { name: "HTTP/HTTPS", percentage: 45, bytes: "620 MB" },
    { name: "DNS", percentage: 15, bytes: "210 MB" },
    { name: "SMTP/IMAP", percentage: 12, bytes: "165 MB" },
    { name: "SSH/SCP", percentage: 10, bytes: "140 MB" },
    { name: "SMB/CIFS", percentage: 8, bytes: "110 MB" },
    { name: "Other", percentage: 10, bytes: "140 MB" },
  ]

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Traffic Analysis</CardTitle>
        <CardDescription>Breakdown of network traffic by protocol and application</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="protocols">
          <TabsList>
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="hosts">Hosts</TabsTrigger>
          </TabsList>
          <TabsContent value="protocols">
            <div className="h-[300px] rounded-lg border p-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {protocols.map((protocol) => (
                    <div key={protocol.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{protocol.name}</p>
                        <p className="text-sm">{protocol.percentage}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${protocol.percentage}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{protocol.bytes}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-full w-full rounded-lg border">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Protocol distribution chart will be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="applications">
            <div className="h-[300px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Application traffic will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hosts">
            <div className="h-[300px] rounded-lg border mt-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Host traffic will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
