"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon, GlobeIcon, ServerIcon } from "lucide-react"

export function VirusTotalScanner() {
  const [scanInput, setScanInput] = useState("")
  const [scanType, setScanType] = useState("url")
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    if (!scanInput) return
    setIsScanning(true)
    // Simulate API call to VirusTotal
    setTimeout(() => {
      setIsScanning(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>VirusTotal Scanner</CardTitle>
        <CardDescription>Scan URLs, IPs, domains, or file hashes for threats</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" value={scanType} onValueChange={setScanType}>
          <TabsList className="mb-4">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="ip">IP Address</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="hash">File Hash</TabsTrigger>
          </TabsList>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                {scanType === "url" && (
                  <GlobeIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                {scanType === "ip" && (
                  <ServerIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                {scanType === "domain" && (
                  <GlobeIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                {scanType === "hash" && (
                  <FileIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  type="text"
                  placeholder={`Enter ${scanType}...`}
                  className="pl-8"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                />
              </div>
              <Button onClick={handleScan} disabled={isScanning || !scanInput}>
                {isScanning ? "Scanning..." : "Scan"}
              </Button>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  {isScanning ? "Scanning with VirusTotal..." : "Scan results will appear here"}
                </p>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
