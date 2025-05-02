"use client"

import { Card } from "@/components/ui/card"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, ShieldIcon, ShieldXIcon, AlertTriangleIcon } from "lucide-react"

export function SecurityEvents() {
  const [filterValue, setFilterValue] = useState("")

  const events = [
    {
      id: 1,
      timestamp: "2023-07-15 10:45:12",
      type: "malicious_ip",
      source: "VirusTotal",
      target: "203.0.113.5",
      severity: "high",
      details: "IP address flagged by 18/67 security vendors",
      status: "active",
    },
    {
      id: 2,
      timestamp: "2023-07-15 10:30:45",
      type: "suspicious_domain",
      source: "AlienVault OTX",
      target: "download-update-service.net",
      severity: "medium",
      details: "Domain associated with malware distribution",
      status: "active",
    },
    {
      id: 3,
      timestamp: "2023-07-15 09:58:22",
      type: "malware_hash",
      source: "VirusTotal",
      target: "e1a9f2c8d3b5a7f6e0d4c2b8a9f7e5d3",
      severity: "critical",
      details: "File hash detected as ransomware by 54/67 security vendors",
      status: "active",
    },
    {
      id: 4,
      timestamp: "2023-07-15 09:45:18",
      type: "suspicious_url",
      source: "MISP",
      target: "http://invoice-secure-doc.com/download.php",
      severity: "medium",
      details: "URL linked to phishing campaign",
      status: "active",
    },
    {
      id: 5,
      timestamp: "2023-07-15 08:32:05",
      type: "brute_force",
      source: "Log Analysis",
      target: "192.168.1.30 (Auth Server)",
      severity: "high",
      details: "Multiple failed login attempts from 203.0.113.5",
      status: "resolved",
    },
    {
      id: 6,
      timestamp: "2023-07-15 07:15:42",
      type: "data_exfiltration",
      source: "Traffic Analysis",
      target: "192.168.1.100 -> 198.51.100.75",
      severity: "critical",
      details: "Unusual data transfer pattern detected (2.3 GB)",
      status: "investigating",
    },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.type.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.source.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.target.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.details.toLowerCase().includes(filterValue.toLowerCase()),
  )

  const getEventIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <ShieldXIcon className="h-4 w-4 text-red-600" />
      case "high":
        return <ShieldXIcon className="h-4 w-4 text-red-500" />
      case "medium":
        return <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
      default:
        return <ShieldIcon className="h-4 w-4 text-blue-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Medium
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Low
          </Badge>
        )
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "investigating":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Investigating
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-medium">Security Events</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter events..."
              className="w-[200px] pl-8"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[30%]">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.severity)}
                    <span>{event.type.replace("_", " ")}</span>
                  </div>
                </TableCell>
                <TableCell>{event.source}</TableCell>
                <TableCell className="max-w-[150px] truncate font-mono text-xs">{event.target}</TableCell>
                <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                <TableCell>{getStatusBadge(event.status)}</TableCell>
                <TableCell className="max-w-md truncate">{event.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredEvents.length} of {events.length} events
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
