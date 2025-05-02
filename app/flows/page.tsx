import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { FlowsList } from "@/components/flows/flows-list"
import { FlowsStats } from "@/components/flows/flows-stats"

export default function FlowsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Network Flows" text="Monitor and analyze NetFlow and sFlow data." />
      <div className="grid gap-4">
        <FlowsStats />
        <FlowsList />
      </div>
    </DashboardShell>
  )
}
