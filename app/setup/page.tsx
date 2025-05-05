"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Check, Loader2, Mail, Settings, Shield } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  const [setupConfig, setSetupConfig] = useState({
    general: {
      companyName: "Miles Education Private Limited",
      adminEmail: "",
      adminPassword: "",
      confirmPassword: "",
    },
    network: {
      scanSubnets: ["192.168.1.0/24"],
      scanInterval: "30",
      enableSnmp: true,
      snmpCommunity: "public",
      enableWmi: true,
    },
    monitoring: {
      cpuThreshold: 90,
      memoryThreshold: 85,
      diskThreshold: 90,
      bandwidthThreshold: 80,
      retentionDays: 30,
    },
    notifications: {
      enableEmail: true,
      smtpServer: "",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      useTls: true,
    },
    advanced: {
      enableAutoUpdate: true,
      enableRemoteAccess: false,
      enableHttps: true,
      httpPort: "5000",
      httpsPort: "5443",
      enableFirewall: true,
    },
  })

  const handleInputChange = (section: string, field: string, value: any) => {
    setSetupConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleAddSubnet = () => {
    setSetupConfig((prev) => ({
      ...prev,
      network: {
        ...prev.network,
        scanSubnets: [...prev.network.scanSubnets, ""],
      },
    }))
  }

  const handleSubnetChange = (index: number, value: string) => {
    const newSubnets = [...setupConfig.network.scanSubnets]
    newSubnets[index] = value
    setSetupConfig((prev) => ({
      ...prev,
      network: {
        ...prev.network,
        scanSubnets: newSubnets,
      },
    }))
  }

  const handleRemoveSubnet = (index: number) => {
    const newSubnets = setupConfig.network.scanSubnets.filter((_, i) => i !== index)
    setSetupConfig((prev) => ({
      ...prev,
      network: {
        ...prev.network,
        scanSubnets: newSubnets,
      },
    }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          setupConfig.general.companyName &&
          setupConfig.general.adminEmail &&
          setupConfig.general.adminPassword &&
          setupConfig.general.confirmPassword &&
          setupConfig.general.adminPassword === setupConfig.general.confirmPassword
        )
      case 2:
        return setupConfig.network.scanSubnets.length > 0 && setupConfig.network.scanSubnets[0] !== ""
      case 3:
        return true
      case 4:
        return (
          !setupConfig.notifications.enableEmail ||
          (setupConfig.notifications.smtpServer && setupConfig.notifications.smtpUsername)
        )
      case 5:
        return true
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    setIsLoading(true)
    // In a real app, this would send the configuration to the server/electron
    setTimeout(() => {
      // Save configuration to localStorage for demo purposes
      localStorage.setItem("setupConfig", JSON.stringify(setupConfig))
      localStorage.setItem("setupComplete", "true")
      setSetupComplete(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleGoToDashboard = () => {
    router.push("/login")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={setupConfig.general.companyName}
                onChange={(e) => handleInputChange("general", "companyName", e.target.value)}
                className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                placeholder="Enter your company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-white">
                Admin Email
              </Label>
              <Input
                id="adminEmail"
                type="email"
                value={setupConfig.general.adminEmail}
                onChange={(e) => handleInputChange("general", "adminEmail", e.target.value)}
                className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                placeholder="Enter admin email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-white">
                Admin Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                value={setupConfig.general.adminPassword}
                onChange={(e) => handleInputChange("general", "adminPassword", e.target.value)}
                className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                placeholder="Enter admin password"
                required
              />
              <p className="text-xs text-gray-400">
                Password must be at least 12 characters with mixed case, numbers, and symbols
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={setupConfig.general.confirmPassword}
                onChange={(e) => handleInputChange("general", "confirmPassword", e.target.value)}
                className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                placeholder="Confirm admin password"
                required
              />
              {setupConfig.general.adminPassword !== setupConfig.general.confirmPassword && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Network Subnets to Scan</Label>
              <div className="space-y-2">
                {setupConfig.network.scanSubnets.map((subnet, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={subnet}
                      onChange={(e) => handleSubnetChange(index, e.target.value)}
                      className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                      placeholder="e.g., 192.168.1.0/24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleRemoveSubnet(index)}
                      disabled={setupConfig.network.scanSubnets.length === 1}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                  onClick={handleAddSubnet}
                >
                  Add Subnet
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scanInterval" className="text-white">
                Scan Interval (seconds)
              </Label>
              <Select
                value={setupConfig.network.scanInterval}
                onValueChange={(value) => handleInputChange("network", "scanInterval", value)}
              >
                <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                  <SelectValue placeholder="Select scan interval" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSnmp" className="text-white">
                  Enable SNMP
                </Label>
                <p className="text-sm text-gray-400">Use SNMP for device monitoring</p>
              </div>
              <Switch
                id="enableSnmp"
                checked={setupConfig.network.enableSnmp}
                onCheckedChange={(checked) => handleInputChange("network", "enableSnmp", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>

            {setupConfig.network.enableSnmp && (
              <div className="space-y-2">
                <Label htmlFor="snmpCommunity" className="text-white">
                  SNMP Community String
                </Label>
                <Input
                  id="snmpCommunity"
                  value={setupConfig.network.snmpCommunity}
                  onChange={(e) => handleInputChange("network", "snmpCommunity", e.target.value)}
                  className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                  placeholder="e.g., public"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableWmi" className="text-white">
                  Enable WMI
                </Label>
                <p className="text-sm text-gray-400">Use WMI for Windows device monitoring</p>
              </div>
              <Switch
                id="enableWmi"
                checked={setupConfig.network.enableWmi}
                onCheckedChange={(checked) => handleInputChange("network", "enableWmi", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">CPU Usage Threshold (%)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={setupConfig.monitoring.cpuThreshold}
                  onChange={(e) => handleInputChange("monitoring", "cpuThreshold", Number.parseInt(e.target.value))}
                  className="[&::-webkit-slider-thumb]:bg-[#00FFFF]"
                />
                <span className="w-12 text-center text-white">{setupConfig.monitoring.cpuThreshold}%</span>
              </div>
              <p className="text-xs text-gray-400">Alert when CPU usage exceeds this threshold</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Memory Usage Threshold (%)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={setupConfig.monitoring.memoryThreshold}
                  onChange={(e) => handleInputChange("monitoring", "memoryThreshold", Number.parseInt(e.target.value))}
                  className="[&::-webkit-slider-thumb]:bg-[#00FFFF]"
                />
                <span className="w-12 text-center text-white">{setupConfig.monitoring.memoryThreshold}%</span>
              </div>
              <p className="text-xs text-gray-400">Alert when memory usage exceeds this threshold</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Disk Usage Threshold (%)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={setupConfig.monitoring.diskThreshold}
                  onChange={(e) => handleInputChange("monitoring", "diskThreshold", Number.parseInt(e.target.value))}
                  className="[&::-webkit-slider-thumb]:bg-[#00FFFF]"
                />
                <span className="w-12 text-center text-white">{setupConfig.monitoring.diskThreshold}%</span>
              </div>
              <p className="text-xs text-gray-400">Alert when disk usage exceeds this threshold</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Bandwidth Usage Threshold (%)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={setupConfig.monitoring.bandwidthThreshold}
                  onChange={(e) =>
                    handleInputChange("monitoring", "bandwidthThreshold", Number.parseInt(e.target.value))
                  }
                  className="[&::-webkit-slider-thumb]:bg-[#00FFFF]"
                />
                <span className="w-12 text-center text-white">{setupConfig.monitoring.bandwidthThreshold}%</span>
              </div>
              <p className="text-xs text-gray-400">Alert when bandwidth usage exceeds this threshold</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retentionDays" className="text-white">
                Data Retention (days)
              </Label>
              <Select
                value={setupConfig.monitoring.retentionDays.toString()}
                onValueChange={(value) => handleInputChange("monitoring", "retentionDays", Number.parseInt(value))}
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
              <p className="text-xs text-gray-400">How long to keep historical monitoring data</p>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableEmail" className="text-white">
                  Enable Email Notifications
                </Label>
                <p className="text-sm text-gray-400">Send alerts via email</p>
              </div>
              <Switch
                id="enableEmail"
                checked={setupConfig.notifications.enableEmail}
                onCheckedChange={(checked) => handleInputChange("notifications", "enableEmail", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>

            {setupConfig.notifications.enableEmail && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="smtpServer" className="text-white">
                    SMTP Server
                  </Label>
                  <Input
                    id="smtpServer"
                    value={setupConfig.notifications.smtpServer}
                    onChange={(e) => handleInputChange("notifications", "smtpServer", e.target.value)}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="e.g., smtp.gmail.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-white">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    value={setupConfig.notifications.smtpPort}
                    onChange={(e) => handleInputChange("notifications", "smtpPort", e.target.value)}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="e.g., 587"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUsername" className="text-white">
                    SMTP Username
                  </Label>
                  <Input
                    id="smtpUsername"
                    value={setupConfig.notifications.smtpUsername}
                    onChange={(e) => handleInputChange("notifications", "smtpUsername", e.target.value)}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="e.g., your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword" className="text-white">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={setupConfig.notifications.smtpPassword}
                    onChange={(e) => handleInputChange("notifications", "smtpPassword", e.target.value)}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="Enter SMTP password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="useTls" className="text-white">
                      Use TLS/SSL
                    </Label>
                    <p className="text-sm text-gray-400">Enable secure connection</p>
                  </div>
                  <Switch
                    id="useTls"
                    checked={setupConfig.notifications.useTls}
                    onCheckedChange={(checked) => handleInputChange("notifications", "useTls", checked)}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                  onClick={() => alert("Test email sent!")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Test Email Configuration
                </Button>
              </>
            )}
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAutoUpdate" className="text-white">
                  Enable Automatic Updates
                </Label>
                <p className="text-sm text-gray-400">Automatically download and install updates</p>
              </div>
              <Switch
                id="enableAutoUpdate"
                checked={setupConfig.advanced.enableAutoUpdate}
                onCheckedChange={(checked) => handleInputChange("advanced", "enableAutoUpdate", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableRemoteAccess" className="text-white">
                  Enable Remote Access
                </Label>
                <p className="text-sm text-gray-400">Allow access from outside your network</p>
              </div>
              <Switch
                id="enableRemoteAccess"
                checked={setupConfig.advanced.enableRemoteAccess}
                onCheckedChange={(checked) => handleInputChange("advanced", "enableRemoteAccess", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableHttps" className="text-white">
                  Enable HTTPS
                </Label>
                <p className="text-sm text-gray-400">Use secure connection for web interface</p>
              </div>
              <Switch
                id="enableHttps"
                checked={setupConfig.advanced.enableHttps}
                onCheckedChange={(checked) => handleInputChange("advanced", "enableHttps", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="httpPort" className="text-white">
                  HTTP Port
                </Label>
                <Input
                  id="httpPort"
                  value={setupConfig.advanced.httpPort}
                  onChange={(e) => handleInputChange("advanced", "httpPort", e.target.value)}
                  className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                  placeholder="e.g., 5000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="httpsPort" className="text-white">
                  HTTPS Port
                </Label>
                <Input
                  id="httpsPort"
                  value={setupConfig.advanced.httpsPort}
                  onChange={(e) => handleInputChange("advanced", "httpsPort", e.target.value)}
                  className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                  placeholder="e.g., 5443"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableFirewall" className="text-white">
                  Configure Firewall
                </Label>
                <p className="text-sm text-gray-400">Automatically configure firewall rules</p>
              </div>
              <Switch
                id="enableFirewall"
                checked={setupConfig.advanced.enableFirewall}
                onCheckedChange={(checked) => handleInputChange("advanced", "enableFirewall", checked)}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (setupComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1A1A2E] p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="pointer-events-none h-[500px] w-[900px] rounded-full bg-[#00FFFF] opacity-[0.02] blur-[100px]"></div>
          </div>
          <div className="absolute right-1/4 top-1/4">
            <div className="pointer-events-none h-[300px] w-[300px] rounded-full bg-[#FF00FF] opacity-[0.03] blur-[100px]"></div>
          </div>
        </div>

        <Card className="w-full max-w-md border border-[#00FFFF]/20 bg-[#1A1A2E]/60 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00FFFF]/10">
              <Check className="h-8 w-8 text-[#00FFFF]" />
            </div>
            <CardTitle className="text-2xl text-[#00FFFF]">Setup Complete!</CardTitle>
            <CardDescription>Your Miles Network Monitor is ready to use</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-gray-300">
              The application has been configured successfully. You can now log in with the admin credentials you
              provided.
            </p>
            <Button className="w-full bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80" onClick={handleGoToDashboard}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A2E] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="pointer-events-none h-[500px] w-[900px] rounded-full bg-[#00FFFF] opacity-[0.02] blur-[100px]"></div>
        </div>
        <div className="absolute right-1/4 top-1/4">
          <div className="pointer-events-none h-[300px] w-[300px] rounded-full bg-[#FF00FF] opacity-[0.03] blur-[100px]"></div>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <img src="/miles-logo.png" alt="Miles Education Logo" className="mx-auto h-16 w-auto" />
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            Network Monitor Setup
          </h1>
          <p className="mt-2 text-gray-400">Configure your monitoring solution</p>
        </div>

        <Card className="border border-[#00FFFF]/20 bg-[#1A1A2E]/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#00FFFF]">
                Step {currentStep}:{" "}
                {currentStep === 1
                  ? "General"
                  : currentStep === 2
                    ? "Network"
                    : currentStep === 3
                      ? "Monitoring"
                      : currentStep === 4
                        ? "Notifications"
                        : "Advanced"}
              </CardTitle>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-2 w-8 rounded-full ${
                      step === currentStep ? "bg-[#00FFFF]" : step < currentStep ? "bg-[#00FFFF]/50" : "bg-gray-700"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <CardDescription>
              {currentStep === 1
                ? "Set up your admin account and company information"
                : currentStep === 2
                  ? "Configure network scanning settings"
                  : currentStep === 3
                    ? "Set monitoring thresholds and parameters"
                    : currentStep === 4
                      ? "Configure notification settings"
                      : "Configure advanced system settings"}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
              onClick={handleNextStep}
              disabled={!validateStep(currentStep) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : currentStep === 5 ? (
                "Finish Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-[#00FFFF]" />
              <span className="text-sm text-gray-400">Step {currentStep}/5</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#00FFFF]" />
              <span className="text-sm text-gray-400">Secure Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
