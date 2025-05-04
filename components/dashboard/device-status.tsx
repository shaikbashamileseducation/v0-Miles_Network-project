"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle, HardDrive, Wifi, Shield } from "lucide-react"

export default function DeviceStatus() {
  const [devices, setDevices] = useState<any[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Generate mock device data
    const generateDevices = () => {
      const deviceTypes = [
        { type: "firewall", icon: Shield, name: "pfSense Firewall", ip: "115.240.189.114" },
        { type: "firewall", icon: Shield, name: "Check Point 1600", ip: "115.240.189.120" },
      ]

      // Generate switches
      for (let i = 1; i <= 10; i++) {
        deviceTypes.push({
          type: "switch",
          icon: HardDrive,
          name: `Switch-${i.toString().padStart(2, "0")}`,
          ip: `192.168.1.${10 + i}`,
        })
      }

      // Generate APs
      for (let i = 1; i <= 11; i++) {
        deviceTypes.push({
          type: "ap",
          icon: Wifi,
          name: `UniFi AP-${i.toString().padStart(2, "0")}`,
          ip: `192.168.1.${100 + i}`,
        })
      }

      // Generate random status for each device
      const newDevices = deviceTypes.map((device) => {
        const statusRandom = Math.random()
        let status

        if (statusRandom > 0.9) {
          status = "offline"
        } else if (statusRandom > 0.8) {
          status = "warning"
        } else {
          status = "online"
        }

        return {
          ...device,
          status,
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          uptime: Math.floor(Math.random() * 1000000),
        }
      })

      setDevices(newDevices)
    }

    generateDevices()
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${days}d ${hours}h ${minutes}m`
  }

  const filteredDevices =
    filter === "all" ? devices : devices.filter((device) => device.type === filter || device.status === filter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "all"
              ? "bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          All Devices
        </button>
        <button
          onClick={() => setFilter("firewall")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "firewall"
              ? "bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Firewalls
        </button>
        <button
          onClick={() => setFilter("switch")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "switch"
              ? "bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Switches
        </button>
        <button
          onClick={() => setFilter("ap")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "ap"
              ? "bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Access Points
        </button>
        <button
          onClick={() => setFilter("online")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "online"
              ? "bg-green-500/20 text-green-500 border border-green-500/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Online
        </button>
        <button
          onClick={() => setFilter("warning")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "warning"
              ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Warning
        </button>
        <button
          onClick={() => setFilter("offline")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "offline"
              ? "bg-red-500/20 text-red-500 border border-red-500/50"
              : "bg-gray-800 text-gray-400 border border-gray-700"
          }`}
        >
          Offline
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2 text-left text-gray-400">Status</th>
              <th className="px-4 py-2 text-left text-gray-400">Device</th>
              <th className="px-4 py-2 text-left text-gray-400">IP Address</th>
              <th className="px-4 py-2 text-left text-gray-400">CPU</th>
              <th className="px-4 py-2 text-left text-gray-400">Memory</th>
              <th className="px-4 py-2 text-left text-gray-400">Uptime</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device, index) => (
              <tr
                key={index}
                className={`border-b border-gray-800 hover:bg-[#1A1A2E] transition-colors ${
                  device.status === "offline" ? "bg-red-500/5" : device.status === "warning" ? "bg-yellow-500/5" : ""
                }`}
              >
                <td className="px-4 py-3">
                  {device.status === "online" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {device.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {device.status === "offline" && <XCircle className="h-5 w-5 text-red-500" />}
                </td>
                <td className="px-4 py-3 flex items-center">
                  <device.icon className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium text-white">{device.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-300">{device.ip}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-700 rounded-full h-1.5 mr-2">
                      <div
                        className={`h-1.5 rounded-full ${
                          device.cpu > 90 ? "bg-red-500" : device.cpu > 70 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${device.cpu}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300">{device.cpu}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-700 rounded-full h-1.5 mr-2">
                      <div
                        className={`h-1.5 rounded-full ${
                          device.memory > 90 ? "bg-red-500" : device.memory > 70 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${device.memory}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300">{device.memory}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">{formatUptime(device.uptime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
