"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, HardDrive, Loader2, Save, Shield, Wifi } from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AddDevicePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    type: "Switch",
    protocol: "SNMP",
    snmpVersion: "v2c",
    community: "public",
    username: "",
    authProtocol: "SHA-256",
    authPassword: "",
    privProtocol: "AES-256",
    privPassword: "",
    unifiControllerIp: "",
    unifiApiToken: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTestConnection = () => {
    setTestStatus("loading")
    // In a real app, this would test the connection to the device
    setTimeout(() => {
      if (formData.ip && (formData.community || formData.username)) {
        setTestStatus("success")
      } else {
        setTestStatus("error")
      }
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      setIsLoading(false)
      alert("Device added successfully!")
      router.push("/devices")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white mr-2"
            onClick={() => router.push("/devices")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Add New Device</h1>
        </div>

        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Device Details</CardTitle>
            <CardDescription>
              Add a new device to monitor. Fill in the required information and test the connection before saving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Device Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., pfSense Firewall"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip" className="text-white">
                    IP Address
                  </Label>
                  <Input
                    id="ip"
                    name="ip"
                    placeholder="e.g., 192.168.1.1"
                    value={formData.ip}
                    onChange={handleInputChange}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-white">
                    Device Type
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectItem value="Firewall">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-[#00FFFF]" />
                          Firewall
                        </div>
                      </SelectItem>
                      <SelectItem value="Switch">
                        <div className="flex items-center">
                          <HardDrive className="h-4 w-4 mr-2 text-[#00FFFF]" />
                          Switch
                        </div>
                      </SelectItem>
                      <SelectItem value="AccessPoint">
                        <div className="flex items-center">
                          <Wifi className="h-4 w-4 mr-2 text-[#00FFFF]" />
                          Access Point
                        </div>
                      </SelectItem>
                      <SelectItem value="Other">
                        <div className="flex items-center">
                          <HardDrive className="h-4 w-4 mr-2 text-[#00FFFF]" />
                          Other
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protocol" className="text-white">
                    Protocol
                  </Label>
                  <Select value={formData.protocol} onValueChange={(value) => handleSelectChange("protocol", value)}>
                    <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectValue placeholder="Select protocol" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectItem value="SNMP">SNMP</SelectItem>
                      <SelectItem value="SSH">SSH</SelectItem>
                      <SelectItem value="UniFiAPI">UniFi API</SelectItem>
                      <SelectItem value="ICMP">ICMP (Ping)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="snmp" value={formData.protocol === "UniFiAPI" ? "unifi" : "snmp"} className="w-full">
                <TabsList className="bg-[#1A1A2E] border border-[#00FFFF]/20 mb-4">
                  <TabsTrigger
                    value="snmp"
                    disabled={formData.protocol === "UniFiAPI"}
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                  >
                    SNMP Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="unifi"
                    disabled={formData.protocol !== "UniFiAPI"}
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                  >
                    UniFi Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="snmp">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="snmpVersion" className="text-white">
                        SNMP Version
                      </Label>
                      <Select
                        value={formData.snmpVersion}
                        onValueChange={(value) => handleSelectChange("snmpVersion", value)}
                      >
                        <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectValue placeholder="Select SNMP version" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectItem value="v2c">v2c</SelectItem>
                          <SelectItem value="v3">v3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.snmpVersion === "v2c" ? (
                      <div className="space-y-2">
                        <Label htmlFor="community" className="text-white">
                          Community String
                        </Label>
                        <Input
                          id="community"
                          name="community"
                          value={formData.community}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                          required={formData.snmpVersion === "v2c"}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-white">
                            Username
                          </Label>
                          <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                            required={formData.snmpVersion === "v3"}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="authProtocol" className="text-white">
                              Auth Protocol
                            </Label>
                            <Select
                              value={formData.authProtocol}
                              onValueChange={(value) => handleSelectChange("authProtocol", value)}
                            >
                              <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                                <SelectValue placeholder="Select auth protocol" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                                <SelectItem value="SHA-256">SHA-256</SelectItem>
                                <SelectItem value="SHA-1">SHA-1</SelectItem>
                                <SelectItem value="MD5">MD5</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="authPassword" className="text-white">
                              Auth Password
                            </Label>
                            <Input
                              id="authPassword"
                              name="authPassword"
                              type="password"
                              value={formData.authPassword}
                              onChange={handleInputChange}
                              className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                              required={formData.snmpVersion === "v3"}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="privProtocol" className="text-white">
                              Privacy Protocol
                            </Label>
                            <Select
                              value={formData.privProtocol}
                              onValueChange={(value) => handleSelectChange("privProtocol", value)}
                            >
                              <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                                <SelectValue placeholder="Select privacy protocol" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                                <SelectItem value="AES-256">AES-256</SelectItem>
                                <SelectItem value="AES-192">AES-192</SelectItem>
                                <SelectItem value="AES-128">AES-128</SelectItem>
                                <SelectItem value="DES">DES</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="privPassword" className="text-white">
                              Privacy Password
                            </Label>
                            <Input
                              id="privPassword"
                              name="privPassword"
                              type="password"
                              value={formData.privPassword}
                              onChange={handleInputChange}
                              className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                              required={formData.snmpVersion === "v3"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="unifi">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="unifiControllerIp" className="text-white">
                        UniFi Controller IP
                      </Label>
                      <Input
                        id="unifiControllerIp"
                        name="unifiControllerIp"
                        placeholder="e.g., 115.240.189.118:8443"
                        value={formData.unifiControllerIp}
                        onChange={handleInputChange}
                        className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        required={formData.protocol === "UniFiAPI"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unifiApiToken" className="text-white">
                        API Token
                      </Label>
                      <Input
                        id="unifiApiToken"
                        name="unifiApiToken"
                        type="password"
                        value={formData.unifiApiToken}
                        onChange={handleInputChange}
                        className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        required={formData.protocol === "UniFiAPI"}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                  onClick={handleTestConnection}
                  disabled={testStatus === "loading"}
                >
                  {testStatus === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>

                {testStatus === "success" && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Connection successful
                  </div>
                )}

                {testStatus === "error" && (
                  <div className="flex items-center text-red-500">
                    <Shield className="h-4 w-4 mr-2" />
                    Connection failed
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                  onClick={() => router.push("/devices")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Device
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
