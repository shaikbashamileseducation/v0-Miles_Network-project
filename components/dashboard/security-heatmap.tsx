"use client"

import { useState, useEffect } from "react"

export default function SecurityHeatmap() {
  const [heatmapData, setHeatmapData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock heatmap data
    const protocols = [
      { id: "http", name: "HTTP/HTTPS", valid: true },
      { id: "dns", name: "DNS", valid: true },
      { id: "smtp", name: "SMTP", valid: true },
      { id: "ssh", name: "SSH", valid: true },
      { id: "vpn", name: "VPN", valid: true },
      { id: "airdrop", name: "AirDrop", valid: false },
      { id: "smb", name: "SMB", valid: false },
      { id: "bittorrent", name: "BitTorrent", valid: false },
      { id: "youtube", name: "YouTube", valid: false },
      { id: "netflix", name: "Netflix", valid: false },
    ]

    const devices = [
      { id: "pfsense", name: "pfSense Firewall", ip: "115.240.189.114" },
      { id: "checkpoint", name: "Check Point 1600", ip: "115.240.189.120" },
      { id: "switch01", name: "Switch-01", ip: "192.168.1.11" },
      { id: "switch05", name: "Switch-05", ip: "192.168.1.15" },
      { id: "switch10", name: "Switch-10", ip: "192.168.1.20" },
      { id: "ap01", name: "UniFi AP-01", ip: "192.168.1.101" },
      { id: "ap05", name: "UniFi AP-05", ip: "192.168.1.105" },
      { id: "ap11", name: "UniFi AP-11", ip: "192.168.1.111" },
      { id: "client1", name: "Client PC", ip: "192.168.1.50" },
      { id: "client2", name: "Client Mobile", ip: "192.168.1.51" },
    ]

    // Generate data for each protocol and device combination
    const data = []

    for (const protocol of protocols) {
      const row = {
        protocol: protocol.id,
        protocolName: protocol.name,
        valid: protocol.valid,
      }

      for (const device of devices) {
        // Generate random value based on validity
        let value = 0

        if (protocol.valid) {
          // Valid protocols have higher values on network devices
          if (device.id.includes("pfsense") || device.id.includes("switch") || device.id.includes("checkpoint")) {
            value = Math.floor(Math.random() * 80) + 20
          } else {
            value = Math.floor(Math.random() * 40)
          }
        } else {
          // Invalid protocols mostly on client devices and APs
          if (device.id.includes("client") || device.id.includes("ap")) {
            value = Math.floor(Math.random() * 30)
          } else {
            value = Math.floor(Math.random() * 5)
          }
        }

        // Special cases
        if (protocol.id === "airdrop" && device.id.includes("client")) {
          value = Math.floor(Math.random() * 70) + 30
        }

        if (protocol.id === "youtube" && device.id.includes("client")) {
          value = Math.floor(Math.random() * 60) + 40
        }

        row[device.id] = value
        row[`${device.id}_name`] = device.name
        row[`${device.id}_ip`] = device.ip
      }

      data.push(row)
    }

    setHeatmapData(data)
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-400">Protocol</th>
            <th className="px-4 py-2 text-left text-gray-400">pfSense</th>
            <th className="px-4 py-2 text-left text-gray-400">Check Point</th>
            <th className="px-4 py-2 text-left text-gray-400">Switch-01</th>
            <th className="px-4 py-2 text-left text-gray-400">Switch-05</th>
            <th className="px-4 py-2 text-left text-gray-400">Switch-10</th>
            <th className="px-4 py-2 text-left text-gray-400">AP-01</th>
            <th className="px-4 py-2 text-left text-gray-400">AP-05</th>
            <th className="px-4 py-2 text-left text-gray-400">AP-11</th>
            <th className="px-4 py-2 text-left text-gray-400">Client PC</th>
            <th className="px-4 py-2 text-left text-gray-400">Client Mobile</th>
          </tr>
        </thead>
        <tbody>
          {heatmapData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800">
              <td className={`px-4 py-3 font-medium ${row.valid ? "text-green-400" : "text-red-400"}`}>
                {row.protocolName}
              </td>
              {[
                "pfsense",
                "checkpoint",
                "switch01",
                "switch05",
                "switch10",
                "ap01",
                "ap05",
                "ap11",
                "client1",
                "client2",
              ].map((deviceId, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3 relative group"
                  style={{
                    backgroundColor: row.valid
                      ? `rgba(0, 255, 255, ${row[deviceId] / 100})`
                      : `rgba(255, 0, 255, ${row[deviceId] / 100})`,
                  }}
                >
                  <span className="text-white">{row[deviceId]}</span>

                  {/* Tooltip */}
                  <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded p-2 w-48 -mt-24 ml-2">
                    <p className="font-bold">
                      {row[`${deviceId}_name`]} ({row[`${deviceId}_ip`]})
                    </p>
                    <p>Protocol: {row.protocolName}</p>
                    <p>Traffic: {row[deviceId]} Mbps</p>
                    <p className={row.valid ? "text-green-400" : "text-red-400"}>
                      {row.valid ? "Valid Traffic" : "Invalid Traffic"}
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
