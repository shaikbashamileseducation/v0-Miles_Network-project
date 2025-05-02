import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { NetworkOverview } from "@/components/dashboard/network-overview"
import { DeviceStatusCard } from "@/components/dashboard/device-status-card"
import { TopTalkersCard } from "@/components/dashboard/top-talkers-card"
import { AlertsCard } from "@/components/dashboard/alerts-card"
import { TrafficAnalysisCard } from "@/components/dashboard/traffic-analysis-card"
import { NetworkMap } from "@/components/dashboard/network-map"
import { LogActivityCard } from "@/components/dashboard/log-activity-card"
import { SecurityThreatCard } from "@/components/dashboard/security-threat-card"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Network Dashboard"
          text="Monitor your network devices, traffic, and security in real-time."
        />
        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NetworkOverview className="col-span-full" />
        <DeviceStatusCard />
        <TopTalkersCard />
        <AlertsCard />
        <LogActivityCard />
        <SecurityThreatCard />
        <TrafficAnalysisCard className="col-span-full" />
        <NetworkMap className="col-span-full" />
      </div>
    </DashboardShell>
  )
}
