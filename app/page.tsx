"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import NetworkDashboard from "@/components/dashboard/network-dashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <NetworkDashboard />
    </DashboardLayout>
  )
}
