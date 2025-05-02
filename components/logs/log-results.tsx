"use client"

import { Card } from "@/components/ui/card"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, DownloadIcon } from "lucide-react"

export function LogResults() {
  const [filterValue, setFilterValue] = useState("")

  const logs = [
    {
      id: 1,
      timestamp: "2023-07-15 10:45:12",
      source: "Firewall",
      sourceIp: "192.168.1.1",
      severity: "warning",
      message: "Connection blocked from 203.0.113.5 to internal server 192.168.1.10:22",
    },
    {
      id: 2,
      timestamp: "2023-07-15 10:44:58",
      source: "Router",
      sourceIp: "192.168.1.254",
      severity: "error",
      message: "Interface GigabitEthernet0/1 down, reason: administratively down",
    },
    {
      id: 3,
      timestamp: "2023-07-15 10:44:32",
      source: "Web Server",
      sourceIp: "192.168.1.20",
      severity: "error",
      message: "HTTP 500 error on /api/users: Database connection failed",
    },
    {
      id: 4,
      timestamp: "2023-07-15 10:44:15",
      source: "Switch",
      sourceIp: "192.168.1.2",
      severity: "warning",
      message: "Port 24 experiencing high error rate: 15% packet loss",
    },
    {
      id: 5,
      timestamp: "2023-07-15 10:43:58",
      source: "Auth Server",
      sourceIp: "192.168.1.30",
      severity: "critical",
      message: "Multiple failed login attempts for user admin from IP 203.0.113.5",
    },
    {
      id: 6,
      timestamp: "2023-07-15 10:43:45",
      source: "Firewall",
      sourceIp: "192.168.1.1",
      severity: "info",
      message: "VPN connection established for user jsmith from 198.51.100.75",
    },
    {
      id: 7,
      timestamp: "2023-07-15 10:43:30",
      source: "Database",
      sourceIp: "192.168.1.15",
      severity: "warning",
      message: "High CPU usage: 92% for 5 minutes",
    },
  ]

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(filterValue.toLowerCase()) ||
      log.source.toLowerCase().includes(filterValue.toLowerCase()) ||
      log.sourceIp.includes(filterValue) ||
      log.severity.toLowerCase().includes(filterValue.toLowerCase()),
  )

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Info
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-medium">Log Results</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter results..."
              className="w-[200px] pl-8"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Source IP</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="w-[40%]">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell className="font-mono text-xs">{log.sourceIp}</TableCell>
                <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                <TableCell className="max-w-md truncate">{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
