"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle, Clock, Download, HardDrive, Network, Shield } from "lucide-react"
import NetworkTopology from "./network-topology"
import TrafficChart from "./traffic-chart"
import DeviceStatus from "./device-status"
import SecurityHeatmap from "./security-heatmap"
import VpnStatus from "./vpn-status"

export default function NetworkDashboard() {
  const [timeRange, setTimeRange] = useState("1h")
  const [isLoading, setIsLoading] = useState(true)
  const [alertCount, setAlertCount] = useState(3)
  const [deviceStatus, setDeviceStatus] = useState({
    online: 48,
    offline: 2,
    warning: 3,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1A1A2E] text-white">
      {/* Header with logo and time controls */}
      <header className="flex items-center justify-between p-4 border-b border-[#00FFFF]/20">
        <div className="flex items-center space-x-2">
          <img src="/miles-logo.png" alt="Miles Education Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            Network Monitor
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-[#00FFFF]" />
            <span>Time Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#1A1A2E] border border-[#00FFFF]/30 rounded px-2 py-1"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <Button variant="outline" size="sm" className="border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF]/10">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </header>

      {/* Status overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Devices Online</p>
              <p className="text-2xl font-bold text-[#00FFFF]">{deviceStatus.online}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Devices Offline</p>
              <p className="text-2xl font-bold text-red-500">{deviceStatus.offline}</p>
            </div>
            <HardDrive className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold text-[#FF00FF]">{alertCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-[#FF00FF]" />
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Network Load</p>
              <p className="text-2xl font-bold text-[#00FFFF]">68%</p>
            </div>
            <Activity className="h-8 w-8 text-[#00FFFF]" />
          </CardContent>
        </Card>
      </div>

      {/* Main dashboard content */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#1A1A2E] border border-[#00FFFF]/20 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="devices"
              className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
            >
              Devices
            </TabsTrigger>
            <TabsTrigger
              value="traffic"
              className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
            >
              Traffic
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 3D Network Topology */}
              <Card className="lg:col-span-2 bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#00FFFF] flex items-center">
                    <Network className="h-5 w-5 mr-2" />
                    Network Topology
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[400px] w-full relative bg-[#1A1A2E]/80 rounded-md overflow-hidden">
                    <NetworkTopology />
                  </div>
                </CardContent>
              </Card>

              {/* Critical Alerts */}
              <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#FF00FF] flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Critical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-red-400">pfSense CPU Usage {">"} 90%</p>
                          <p className="text-sm text-gray-400">115.240.189.114 - 2m ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-400">High Bandwidth Usage</p>
                          <p className="text-sm text-gray-400">Switch-12 - 15m ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FF00FF]/10 border border-[#FF00FF]/30 rounded-md">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-[#FF00FF] mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-[#FF00FF]">AirDrop Traffic Detected</p>
                          <p className="text-sm text-gray-400">192.168.1.45 - 8m ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {/* Traffic Analysis */}
              <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#00FFFF] flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Traffic Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <TrafficChart />
                  </div>
                </CardContent>
              </Card>

              {/* VPN Status */}
              <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#00FFFF] flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    VPN Status (Check Point 1600)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <VpnStatus />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="mt-4">
            <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00FFFF] flex items-center">
                  <HardDrive className="h-5 w-5 mr-2" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <DeviceStatus />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="mt-4">
            <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00FFFF] flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Traffic Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[500px]">
                  <TrafficChart detailed={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00FFFF] flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[500px]">
                  <SecurityHeatmap />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
