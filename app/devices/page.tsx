import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DeviceList } from "@/components/devices/device-list"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function DevicesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Devices" text="Manage and monitor all your network devices.">
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </DashboardHeader>
      <DeviceList />
    </DashboardShell>
  )
}
