import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { LogSearch } from "@/components/logs/log-search"
import { LogStats } from "@/components/logs/log-stats"
import { LogResults } from "@/components/logs/log-results"
import { LogVisualizations } from "@/components/logs/log-visualizations"
import { Tabs } from "@/components/ui/tabs"

export default function LogsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Log Analysis" text="Search, analyze, and visualize logs from all network devices." />
      <div className="grid gap-4">
        <LogSearch />
        <LogStats />
        <Tabs defaultValue="visualizations">
          <LogVisualizations />
        </Tabs>
        <LogResults />
      </div>
    </DashboardShell>
  )
}
