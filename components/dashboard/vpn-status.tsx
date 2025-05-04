"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Shield, Users } from "lucide-react"

export default function VpnStatus() {
  const [data, setData] = useState<any[]>([])
  const [activeTunnels, setActiveTunnels] = useState(0)
  const [throughput, setThroughput] = useState(0)

  useEffect(() => {
    // Generate mock VPN data
    const generateData = () => {
      const newData = []
      const now = new Date()

      for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() - (23 - i) * 15 * 60000)
        const tunnels = Math.floor(Math.random() * 5) + 3
        const throughput = Math.floor(Math.random() * 50) + 10

        newData.push({
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          tunnels,
          throughput,
        })
      }

      setData(newData)
      setActiveTunnels(newData[newData.length - 1].tunnels)
      setThroughput(newData[newData.length - 1].throughput)
    }

    generateData()

    // Update data periodically
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastTime = new Date(new Date().getTime())

        const tunnels = Math.floor(Math.random() * 5) + 3
        const throughput = Math.floor(Math.random() * 50) + 10

        newData.push({
          time: lastTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          tunnels,
          throughput,
        })

        setActiveTunnels(tunnels)
        setThroughput(throughput)

        return newData
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A2E]/80 border border-[#00FFFF]/20 rounded-lg p-4 flex items-center">
          <div className="bg-[#00FFFF]/10 p-3 rounded-full mr-4">
            <Users className="h-6 w-6 text-[#00FFFF]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Tunnels</p>
            <p className="text-2xl font-bold text-white">{activeTunnels}</p>
          </div>
        </div>

        <div className="bg-[#1A1A2E]/80 border border-[#00FFFF]/20 rounded-lg p-4 flex items-center">
          <div className="bg-[#00FFFF]/10 p-3 rounded-full mr-4">
            <Shield className="h-6 w-6 text-[#00FFFF]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Throughput</p>
            <p className="text-2xl font-bold text-white">{throughput} Mbps</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis dataKey="time" stroke="#888888" tick={{ fill: "#888888" }} />
          <YAxis
            yAxisId="left"
            stroke="#00FFFF"
            tick={{ fill: "#888888" }}
            label={{
              value: "Mbps",
              angle: -90,
              position: "insideLeft",
              fill: "#00FFFF",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#FF00FF"
            tick={{ fill: "#888888" }}
            label={{
              value: "Tunnels",
              angle: 90,
              position: "insideRight",
              fill: "#FF00FF",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A2E",
              borderColor: "#00FFFF",
              color: "white",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="throughput"
            name="Throughput (Mbps)"
            stroke="#00FFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tunnels"
            name="Active Tunnels"
            stroke="#FF00FF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
