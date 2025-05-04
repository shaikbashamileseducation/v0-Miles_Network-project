"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface TrafficChartProps {
  detailed?: boolean
}

export default function TrafficChart({ detailed = false }: TrafficChartProps) {
  const [data, setData] = useState<any[]>([])
  const [protocolData, setProtocolData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      const newData = []
      const now = new Date()

      for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() - (23 - i) * 15 * 60000)
        const validTraffic = Math.floor(Math.random() * 500) + 200
        const invalidTraffic = Math.floor(Math.random() * 100)

        newData.push({
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          valid: validTraffic,
          invalid: invalidTraffic,
          total: validTraffic + invalidTraffic,
        })
      }

      setData(newData)

      // Protocol distribution
      setProtocolData([
        { name: "HTTP/HTTPS", value: 65, color: "#00FFFF" },
        { name: "DNS", value: 15, color: "#4CAF50" },
        { name: "SMTP", value: 8, color: "#FFC107" },
        { name: "AirDrop", value: 5, color: "#FF0000" },
        { name: "SMB", value: 4, color: "#FF00FF" },
        { name: "Other", value: 3, color: "#9C27B0" },
      ])
    }

    generateData()

    // Update data periodically
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastTime = new Date(new Date().getTime())

        const validTraffic = Math.floor(Math.random() * 500) + 200
        const invalidTraffic = Math.floor(Math.random() * 100)

        newData.push({
          time: lastTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          valid: validTraffic,
          invalid: invalidTraffic,
          total: validTraffic + invalidTraffic,
        })

        return newData
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  if (detailed) {
    return (
      <div className="space-y-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="validGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="invalidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF00FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#888888" tick={{ fill: "#888888" }} />
              <YAxis
                stroke="#888888"
                tick={{ fill: "#888888" }}
                label={{
                  value: "Mbps",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#888888",
                }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A2E",
                  borderColor: "#00FFFF",
                  color: "white",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="valid"
                name="Valid Traffic"
                stroke="#00FFFF"
                fillOpacity={1}
                fill="url(#validGradient)"
              />
              <Area
                type="monotone"
                dataKey="invalid"
                name="Invalid Traffic"
                stroke="#FF00FF"
                fillOpacity={1}
                fill="url(#invalidGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A2E]/80 border border-[#00FFFF]/20 rounded-lg p-4">
            <h3 className="text-[#00FFFF] text-lg font-medium mb-4">Protocol Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={protocolData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {protocolData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A2E",
                      borderColor: "#00FFFF",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1A1A2E]/80 border border-[#00FFFF]/20 rounded-lg p-4">
            <h3 className="text-[#00FFFF] text-lg font-medium mb-4">Top Traffic Sources</h3>
            <div className="space-y-3">
              {[
                { name: "pfSense Firewall", ip: "115.240.189.114", usage: "320 Mbps", percent: 78 },
                { name: "Switch-05", ip: "192.168.1.15", usage: "145 Mbps", percent: 42 },
                { name: "UniFi AP-03", ip: "192.168.1.103", usage: "87 Mbps", percent: 28 },
                { name: "Check Point VPN", ip: "115.240.189.120", usage: "65 Mbps", percent: 18 },
                { name: "Switch-12", ip: "192.168.1.22", usage: "42 Mbps", percent: 12 },
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{device.name}</p>
                    <p className="text-sm text-gray-400">
                      {device.ip} • {device.usage}
                    </p>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#0088FF]"
                      style={{ width: `${device.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
        <XAxis dataKey="time" stroke="#888888" tick={{ fill: "#888888" }} />
        <YAxis stroke="#888888" tick={{ fill: "#888888" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1A1A2E",
            borderColor: "#00FFFF",
            color: "white",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          name="Total Traffic"
          stroke="#00FFFF"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="invalid" name="Invalid Traffic" stroke="#FF00FF" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
