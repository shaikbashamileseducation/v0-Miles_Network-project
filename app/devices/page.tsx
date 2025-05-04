"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertTriangle,
  CheckCircle,
  Edit,
  HardDrive,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  Wifi,
  XCircle,
} from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"

// Mock device data
const mockDevices = [
  {
    id: "1",
    name: "pfSense Firewall",
    ip: "115.240.189.114",
    type: "Firewall",
    protocol: "SNMP",
    status: "online",
    cpu: 65,
    memory: 48,
    uptime: 1209600, // 14 days in seconds
  },
  {
    id: "2",
    name: "Check Point 1600",
    ip: "115.240.189.120",
    type: "Firewall",
    protocol: "SNMP",
    status: "online",
    cpu: 42,
    memory: 35,
    uptime: 864000, // 10 days in seconds
  },
  {
    id: "3",
    name: "Switch-01",
    ip: "192.168.1.11",
    type: "Switch",
    protocol: "SNMP",
    status: "warning",
    cpu: 88,
    memory: 72,
    uptime: 432000, // 5 days in seconds
  },
  {
    id: "4",
    name: "Switch-02",
    ip: "192.168.1.12",
    type: "Switch",
    protocol: "SNMP",
    status: "online",
    cpu: 25,
    memory: 40,
    uptime: 345600, // 4 days in seconds
  },
  {
    id: "5",
    name: "UniFi AP-01",
    ip: "192.168.1.101",
    type: "AccessPoint",
    protocol: "UniFiAPI",
    status: "online",
    cpu: 30,
    memory: 45,
    uptime: 259200, // 3 days in seconds
  },
  {
    id: "6",
    name: "UniFi AP-02",
    ip: "192.168.1.102",
    type: "AccessPoint",
    protocol: "UniFiAPI",
    status: "offline",
    cpu: 0,
    memory: 0,
    uptime: 0,
  },
]

export default function DevicesPage() {
  const router = useRouter()
  const [devices, setDevices] = useState(mockDevices)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const formatUptime = (seconds: number) => {
    if (seconds === 0) return "N/A"
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "offline":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Firewall":
        return <Shield className="h-5 w-5 text-[#00FFFF]" />
      case "Switch":
        return <HardDrive className="h-5 w-5 text-[#00FFFF]" />
      case "AccessPoint":
        return <Wifi className="h-5 w-5 text-[#00FFFF]" />
      default:
        return <HardDrive className="h-5 w-5 text-[#00FFFF]" />
    }
  }

  const handleDeleteDevice = (id: string) => {
    if (confirm("Are you sure you want to delete this device?")) {
      setDevices(devices.filter((device) => device.id !== id))
    }
  }

  const handleRefresh = () => {
    // In a real app, this would fetch the latest device data
    alert("Refreshing device data...")
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) || device.ip.includes(searchQuery)

    if (filter === "all") return matchesSearch
    return matchesSearch && device.status === filter
  })

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Device Management</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
            onClick={() => router.push("/devices/add")}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search devices by name or IP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`${
                  filter === "all" ? "bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]" : "text-gray-400 border-gray-700"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  filter === "online"
                    ? "bg-green-500/10 text-green-500 border-green-500"
                    : "text-gray-400 border-gray-700"
                }`}
                onClick={() => setFilter("online")}
              >
                Online
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  filter === "warning"
                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                    : "text-gray-400 border-gray-700"
                }`}
                onClick={() => setFilter("warning")}
              >
                Warning
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  filter === "offline" ? "bg-red-500/10 text-red-500 border-red-500" : "text-gray-400 border-gray-700"
                }`}
                onClick={() => setFilter("offline")}
              >
                Offline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <Card
            key={device.id}
            className={`bg-[#1A1A2E]/50 border ${
              device.status === "online"
                ? "border-green-500/30"
                : device.status === "warning"
                  ? "border-yellow-500/30"
                  : "border-red-500/30"
            } hover:shadow-md transition-shadow`}
          >
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div className="flex items-center">
                {getStatusIcon(device.status)}
                <CardTitle className="text-white ml-2">{device.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-[#1A1A2E] border border-[#00FFFF]/20">
                  <DropdownMenuItem
                    className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                    onClick={() => router.push(`/devices/edit/${device.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    onClick={() => handleDeleteDevice(device.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    {getTypeIcon(device.type)}
                    <span className="ml-1 text-gray-400">{device.type}</span>
                  </div>
                  <span className="text-gray-400">{device.ip}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Protocol:</span>
                  <span className="text-white">{device.protocol}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white">{formatUptime(device.uptime)}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">CPU:</span>
                    <span className={`${device.cpu > 80 ? "text-red-400" : "text-white"}`}>{device.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        device.cpu > 80 ? "bg-red-500" : device.cpu > 60 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${device.cpu}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Memory:</span>
                    <span className={`${device.memory > 80 ? "text-red-400" : "text-white"}`}>{device.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        device.memory > 80 ? "bg-red-500" : device.memory > 60 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${device.memory}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <HardDrive className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white">No devices found</h3>
          <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </DashboardLayout>
  )
}
