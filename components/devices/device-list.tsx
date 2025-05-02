"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckCircle2Icon,
  MoreHorizontalIcon,
  SearchIcon,
  ServerIcon,
  WifiIcon,
  NetworkIcon,
  PrinterIcon,
  LaptopIcon,
  XCircleIcon,
} from "lucide-react"

export function DeviceList() {
  const [searchQuery, setSearchQuery] = useState("")

  const devices = [
    {
      id: 1,
      name: "Core Router",
      ip: "192.168.1.1",
      type: "Router",
      status: "up",
      location: "Server Room",
      lastSeen: "Now",
      icon: NetworkIcon,
    },
    {
      id: 2,
      name: "Main Switch",
      ip: "192.168.1.2",
      type: "Switch",
      status: "up",
      location: "Server Room",
      lastSeen: "Now",
      icon: WifiIcon,
    },
    {
      id: 3,
      name: "File Server",
      ip: "192.168.1.10",
      type: "Server",
      status: "up",
      location: "Server Room",
      lastSeen: "Now",
      icon: ServerIcon,
    },
    {
      id: 4,
      name: "Backup Server",
      ip: "192.168.1.11",
      type: "Server",
      status: "down",
      location: "Server Room",
      lastSeen: "10 minutes ago",
      icon: ServerIcon,
    },
    {
      id: 5,
      name: "Web Server",
      ip: "192.168.1.20",
      type: "Server",
      status: "up",
      location: "Server Room",
      lastSeen: "Now",
      icon: ServerIcon,
    },
    {
      id: 6,
      name: "Office Printer",
      ip: "192.168.1.30",
      type: "Printer",
      status: "up",
      location: "Main Office",
      lastSeen: "5 minutes ago",
      icon: PrinterIcon,
    },
    {
      id: 7,
      name: "Admin Laptop",
      ip: "192.168.1.100",
      type: "Workstation",
      status: "up",
      location: "Admin Office",
      lastSeen: "2 minutes ago",
      icon: LaptopIcon,
    },
  ]

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.ip.includes(searchQuery) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <device.icon className="h-4 w-4 text-muted-foreground" />
                    {device.name}
                  </div>
                </TableCell>
                <TableCell>{device.ip}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {device.status === "up" ? (
                      <>
                        <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-4 w-4 text-red-500" />
                        <span>Offline</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{device.lastSeen}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Device</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Ping Device</DropdownMenuItem>
                      <DropdownMenuItem>View Traffic</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Device</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
