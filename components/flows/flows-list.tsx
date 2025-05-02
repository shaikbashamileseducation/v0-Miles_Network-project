"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, ArrowUpDownIcon } from "lucide-react"

export function FlowsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const flows = [
    {
      id: 1,
      source: "192.168.1.100",
      destination: "8.8.8.8",
      sourcePort: 52134,
      destPort: 53,
      protocol: "UDP",
      application: "DNS",
      bytes: "1.2 KB",
      packets: 2,
      duration: "0.2s",
      timestamp: "10:45:12",
    },
    {
      id: 2,
      source: "192.168.1.101",
      destination: "172.217.21.142",
      sourcePort: 58932,
      destPort: 443,
      protocol: "TCP",
      application: "HTTPS",
      bytes: "15.7 KB",
      packets: 12,
      duration: "1.5s",
      timestamp: "10:45:10",
    },
    {
      id: 3,
      source: "192.168.1.102",
      destination: "192.168.1.1",
      sourcePort: 60234,
      destPort: 53,
      protocol: "UDP",
      application: "DNS",
      bytes: "0.8 KB",
      packets: 2,
      duration: "0.1s",
      timestamp: "10:45:08",
    },
    {
      id: 4,
      source: "192.168.1.103",
      destination: "104.244.42.65",
      sourcePort: 49872,
      destPort: 443,
      protocol: "TCP",
      application: "HTTPS",
      bytes: "32.4 KB",
      packets: 24,
      duration: "2.3s",
      timestamp: "10:45:05",
    },
    {
      id: 5,
      source: "192.168.1.100",
      destination: "192.168.1.10",
      sourcePort: 52178,
      destPort: 445,
      protocol: "TCP",
      application: "SMB",
      bytes: "128.5 KB",
      packets: 86,
      duration: "3.7s",
      timestamp: "10:45:01",
    },
  ]

  const filteredFlows = flows.filter(
    (flow) =>
      flow.source.includes(searchQuery) ||
      flow.destination.includes(searchQuery) ||
      flow.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.application.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search flows..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <ArrowUpDownIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Application</TableHead>
              <TableHead>Bytes</TableHead>
              <TableHead>Packets</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlows.map((flow) => (
              <TableRow key={flow.id}>
                <TableCell className="font-medium">
                  {flow.source}:{flow.sourcePort}
                </TableCell>
                <TableCell>
                  {flow.destination}:{flow.destPort}
                </TableCell>
                <TableCell>{flow.protocol}</TableCell>
                <TableCell>{flow.application}</TableCell>
                <TableCell>{flow.bytes}</TableCell>
                <TableCell>{flow.packets}</TableCell>
                <TableCell>{flow.duration}</TableCell>
                <TableCell>{flow.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
