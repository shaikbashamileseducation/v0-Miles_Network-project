"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  BellRing,
  Database,
  Globe,
  HardDrive,
  ImageIcon,
  Loader2,
  Mail,
  Palette,
  Save,
  Server,
  SettingsIcon,
} from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("appearance")
  const [settings, setSettings] = useState({
    appearance: {
      theme: "futuristic-dark",
      primaryColor: "#00FFFF",
      accentColor: "#FF00FF",
      animationsEnabled: true,
      dashboardLayout: "default",
    },
    monitoring: {
      bandwidthThreshold: 80,
      cpuThreshold: 90,
      memoryThreshold: 85,
      pollingInterval: 30,
      dataRetention: 30,
    },
    notifications: {
      email: true,
      sms: false,
      dashboard: true,
      criticalOnly: false,
    },
    branding: {
      companyName: "Miles Education Private Limited",
      logoUrl: "/miles-logo.png",
    },
    system: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "alerts@mileseducation.com",
      smtpPassword: "••••••••••••",
      autoStart: true,
      autoUpdate: true,
    },
  })

  const handleAppearanceChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    })
  }

  const handleMonitoringChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      monitoring: {
        ...settings.monitoring,
        [key]: value,
      },
    })
  }

  const handleNotificationsChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const handleBrandingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      branding: {
        ...settings.branding,
        [key]: value,
      },
    })
  }

  const handleSystemChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      system: {
        ...settings.system,
        [key]: value,
      },
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          handleBrandingChange("logoUrl", event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    setIsLoading(true)
    // In a real app, this would send the settings to the server
    setTimeout(() => {
      setIsLoading(false)
      alert("Settings saved successfully!")
    }, 1500)
  }

  const handleTestSMTP = () => {
    setIsLoading(true)
    // In a real app, this would test the SMTP connection
    setTimeout(() => {
      setIsLoading(false)
      alert("SMTP test successful! Test email sent.")
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20 md:w-64 flex-shrink-0">
              <CardContent className="p-4">
                <TabsList className="flex flex-col space-y-1 bg-transparent p-0">
                  <TabsTrigger
                    value="appearance"
                    className={`justify-start px-3 py-2 h-auto ${
                      activeTab === "appearance"
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] border-l-2 border-[#00FFFF]"
                        : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
                    }`}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value="monitoring"
                    className={`justify-start px-3 py-2 h-auto ${
                      activeTab === "monitoring"
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] border-l-2 border-[#00FFFF]"
                        : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
                    }`}
                  >
                    <HardDrive className="h-4 w-4 mr-2" />
                    Monitoring
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className={`justify-start px-3 py-2 h-auto ${
                      activeTab === "notifications"
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] border-l-2 border-[#00FFFF]"
                        : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
                    }`}
                  >
                    <BellRing className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="branding"
                    className={`justify-start px-3 py-2 h-auto ${
                      activeTab === "branding"
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] border-l-2 border-[#00FFFF]"
                        : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
                    }`}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Branding
                  </TabsTrigger>
                  <TabsTrigger
                    value="system"
                    className={`justify-start px-3 py-2 h-auto ${
                      activeTab === "system"
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] border-l-2 border-[#00FFFF]"
                        : "text-gray-400 hover:text-white hover:bg-[#00FFFF]/5"
                    }`}
                  >
                    <Server className="h-4 w-4 mr-2" />
                    System
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <div className="flex-1">
              <TabsContent value="appearance" className="mt-0">
                <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                  <CardHeader>
                    <CardTitle className="text-[#00FFFF] flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Appearance Settings
                    </CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme" className="text-white">
                        Theme
                      </Label>
                      <Select
                        value={settings.appearance.theme}
                        onValueChange={(value) => handleAppearanceChange("theme", value)}
                      >
                        <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectItem value="futuristic-dark">Futuristic Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryColor" className="text-white">
                        Primary Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 rounded-full border border-white"
                          style={{ backgroundColor: settings.appearance.primaryColor }}
                        ></div>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.appearance.primaryColor}
                          onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                          className="w-16 h-10 p-1 bg-[#1A1A2E] border-[#00FFFF]/30"
                        />
                        <Input
                          value={settings.appearance.primaryColor}
                          onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accentColor" className="text-white">
                        Accent Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 rounded-full border border-white"
                          style={{ backgroundColor: settings.appearance.accentColor }}
                        ></div>
                        <Input
                          id="accentColor"
                          type="color"
                          value={settings.appearance.accentColor}
                          onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                          className="w-16 h-10 p-1 bg-[#1A1A2E] border-[#00FFFF]/30"
                        />
                        <Input
                          value={settings.appearance.accentColor}
                          onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animations" className="text-white">
                          Enable Animations
                        </Label>
                        <p className="text-sm text-gray-400">Toggle animations for charts and transitions</p>
                      </div>
                      <Switch
                        id="animations"
                        checked={settings.appearance.animationsEnabled}
                        onCheckedChange={(checked) => handleAppearanceChange("animationsEnabled", checked)}
                        className="data-[state=checked]:bg-[#00FFFF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dashboardLayout" className="text-white">
                        Dashboard Layout
                      </Label>
                      <Select
                        value={settings.appearance.dashboardLayout}
                        onValueChange={(value) => handleAppearanceChange("dashboardLayout", value)}
                      >
                        <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="expanded">Expanded</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80 w-full"
                      onClick={() => handleAppearanceChange("theme", "futuristic-dark")}
                    >
                      Reset to Default Theme
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring" className="mt-0">
                <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                  <CardHeader>
                    <CardTitle className="text-[#00FFFF] flex items-center">
                      <HardDrive className="h-5 w-5 mr-2" />
                      Monitoring Settings
                    </CardTitle>
                    <CardDescription>Configure thresholds and data collection parameters.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="bandwidthThreshold" className="text-white">
                            Bandwidth Threshold ({settings.monitoring.bandwidthThreshold}%)
                          </Label>
                          <span className="text-sm text-gray-400">Alert when usage exceeds this value</span>
                        </div>
                        <Slider
                          id="bandwidthThreshold"
                          min={50}
                          max={100}
                          step={5}
                          value={[settings.monitoring.bandwidthThreshold]}
                          onValueChange={(value) => handleMonitoringChange("bandwidthThreshold", value[0])}
                          className="[&>span]:bg-[#00FFFF]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="cpuThreshold" className="text-white">
                            CPU Threshold ({settings.monitoring.cpuThreshold}%)
                          </Label>
                          <span className="text-sm text-gray-400">Alert when usage exceeds this value</span>
                        </div>
                        <Slider
                          id="cpuThreshold"
                          min={50}
                          max={100}
                          step={5}
                          value={[settings.monitoring.cpuThreshold]}
                          onValueChange={(value) => handleMonitoringChange("cpuThreshold", value[0])}
                          className="[&>span]:bg-[#00FFFF]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="memoryThreshold" className="text-white">
                            Memory Threshold ({settings.monitoring.memoryThreshold}%)
                          </Label>
                          <span className="text-sm text-gray-400">Alert when usage exceeds this value</span>
                        </div>
                        <Slider
                          id="memoryThreshold"
                          min={50}
                          max={100}
                          step={5}
                          value={[settings.monitoring.memoryThreshold]}
                          onValueChange={(value) => handleMonitoringChange("memoryThreshold", value[0])}
                          className="[&>span]:bg-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pollingInterval" className="text-white">
                        Polling Interval (seconds)
                      </Label>
                      <Select
                        value={settings.monitoring.pollingInterval.toString()}
                        onValueChange={(value) => handleMonitoringChange("pollingInterval", Number.parseInt(value))}
                      >
                        <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectItem value="15">15 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="60">1 minute</SelectItem>
                          <SelectItem value="300">5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-400">How often devices are polled for data</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataRetention" className="text-white">
                        Data Retention (days)
                      </Label>
                      <Select
                        value={settings.monitoring.dataRetention.toString()}
                        onValueChange={(value) => handleMonitoringChange("dataRetention", Number.parseInt(value))}
                      >
                        <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-400">How long historical data is kept</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                  <CardHeader>
                    <CardTitle className="text-[#00FFFF] flex items-center">
                      <BellRing className="h-5 w-5 mr-2" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>Configure how and when you receive alerts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-white">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-400">Receive alerts via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => handleNotificationsChange("email", checked)}
                        className="data-[state=checked]:bg-[#00FFFF]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications" className="text-white">
                          SMS Notifications
                        </Label>
                        <p className="text-sm text-gray-400">Receive alerts via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationsChange("sms", checked)}
                        className="data-[state=checked]:bg-[#00FFFF]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dashboardNotifications" className="text-white">
                          Dashboard Notifications
                        </Label>
                        <p className="text-sm text-gray-400">Show alerts in the dashboard</p>
                      </div>
                      <Switch
                        id="dashboardNotifications"
                        checked={settings.notifications.dashboard}
                        onCheckedChange={(checked) => handleNotificationsChange("dashboard", checked)}
                        className="data-[state=checked]:bg-[#00FFFF]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="criticalOnly" className="text-white">
                          Critical Alerts Only
                        </Label>
                        <p className="text-sm text-gray-400">Only notify for critical issues</p>
                      </div>
                      <Switch
                        id="criticalOnly"
                        checked={settings.notifications.criticalOnly}
                        onCheckedChange={(checked) => handleNotificationsChange("criticalOnly", checked)}
                        className="data-[state=checked]:bg-[#00FFFF]"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
                        onClick={() => alert("Test notification sent!")}
                      >
                        <BellRing className="h-4 w-4 mr-2" />
                        Send Test Notification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="branding" className="mt-0">
                <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                  <CardHeader>
                    <CardTitle className="text-[#00FFFF] flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Branding Settings
                    </CardTitle>
                    <CardDescription>Customize branding elements for your organization.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        value={settings.branding.companyName}
                        onChange={(e) => handleBrandingChange("companyName", e.target.value)}
                        className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Company Logo</Label>
                      <div className="flex flex-col items-center p-6 border border-dashed border-[#00FFFF]/30 rounded-md bg-[#1A1A2E]/30">
                        <img
                          src={settings.branding.logoUrl || "/placeholder.svg"}
                          alt="Company Logo"
                          className="h-20 mb-4 object-contain"
                        />
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Upload New Logo
                          </Button>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                          <Button
                            variant="outline"
                            className="border-gray-600 text-gray-400 hover:bg-gray-800"
                            onClick={() => handleBrandingChange("logoUrl", "/miles-logo.png")}
                          >
                            Reset to Default
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Recommended size: 200x60 pixels, PNG or JPG format</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
                  <CardHeader>
                    <CardTitle className="text-[#00FFFF] flex items-center">
                      <Server className="h-5 w-5 mr-2" />
                      System Settings
                    </CardTitle>
                    <CardDescription>Configure system-wide settings and integrations.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        SMTP Configuration
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpHost" className="text-white">
                            SMTP Host
                          </Label>
                          <Input
                            id="smtpHost"
                            value={settings.system.smtpHost}
                            onChange={(e) => handleSystemChange("smtpHost", e.target.value)}
                            className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                            placeholder="e.g., smtp.gmail.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort" className="text-white">
                            SMTP Port
                          </Label>
                          <Input
                            id="smtpPort"
                            type="number"
                            value={settings.system.smtpPort}
                            onChange={(e) => handleSystemChange("smtpPort", Number.parseInt(e.target.value))}
                            className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                            placeholder="e.g., 587"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpUser" className="text-white">
                            SMTP Username
                          </Label>
                          <Input
                            id="smtpUser"
                            value={settings.system.smtpUser}
                            onChange={(e) => handleSystemChange("smtpUser", e.target.value)}
                            className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                            placeholder="e.g., alerts@mileseducation.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPassword" className="text-white">
                            SMTP Password
                          </Label>
                          <Input
                            id="smtpPassword"
                            type="password"
                            value={settings.system.smtpPassword}
                            onChange={(e) => handleSystemChange("smtpPassword", e.target.value)}
                            className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        onClick={handleTestSMTP}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Test SMTP Connection
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Application Settings
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autoStart" className="text-white">
                            Auto-start on Boot
                          </Label>
                          <p className="text-sm text-gray-400">Start the application automatically when system boots</p>
                        </div>
                        <Switch
                          id="autoStart"
                          checked={settings.system.autoStart}
                          onCheckedChange={(checked) => handleSystemChange("autoStart", checked)}
                          className="data-[state=checked]:bg-[#00FFFF]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autoUpdate" className="text-white">
                            Automatic Updates
                          </Label>
                          <p className="text-sm text-gray-400">Automatically download and install updates</p>
                        </div>
                        <Switch
                          id="autoUpdate"
                          checked={settings.system.autoUpdate}
                          onCheckedChange={(checked) => handleSystemChange("autoUpdate", checked)}
                          className="data-[state=checked]:bg-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center p-4 border border-[#FF00FF]/30 rounded-md bg-[#FF00FF]/10 mb-4">
                        <AlertTriangle className="h-5 w-5 text-[#FF00FF] mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Database Maintenance</p>
                          <p className="text-sm text-gray-400">
                            Performing database maintenance will temporarily pause data collection.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="outline"
                          className="border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF]/10"
                          onClick={() => alert("Database backup started. This may take a few minutes.")}
                        >
                          <Database className="h-4 w-4 mr-2" />
                          Backup Database
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF]/10"
                          onClick={() =>
                            confirm(
                              "Are you sure you want to optimize the database? This operation cannot be interrupted once started.",
                            )
                          }
                        >
                          <SettingsIcon className="h-4 w-4 mr-2" />
                          Optimize Database
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
            onClick={handleSaveSettings}
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
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
