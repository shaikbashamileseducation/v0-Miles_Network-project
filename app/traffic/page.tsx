import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TrafficAnalysis } from "@/components/traffic/traffic-analysis"
import { TrafficStats } from "@/components/traffic/traffic-stats"

export default function TrafficPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Traffic Analysis" text="Monitor and analyze your network traffic in real-time." />
      <div className="grid gap-4">
        <TrafficStats />
        <TrafficAnalysis />
      </div>
    </DashboardShell>
  )
}
