import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { SecurityOverview } from "@/components/security/security-overview"
import { VirusTotalScanner } from "@/components/security/virustotal-scanner"
import { ThreatIntelligence } from "@/components/security/threat-intelligence"
import { SecurityEvents } from "@/components/security/security-events"

export default function SecurityPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Security Center" text="Monitor and analyze security threats across your network." />
      <div className="grid gap-4">
        <SecurityOverview />
        <div className="grid gap-4 md:grid-cols-2">
          <VirusTotalScanner />
          <ThreatIntelligence />
        </div>
        <SecurityEvents />
      </div>
    </DashboardShell>
  )
}
