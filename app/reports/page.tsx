"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
  Loader2,
  Mail,
  MoreHorizontal,
  Palette,
  PieChart,
  Plus,
  Repeat,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import DashboardLayout from "@/components/layout/dashboard-layout"

// Mock report data
const mockReports = [
  {
    id: "1",
    name: "Daily Network Status",
    type: "Daily",
    lastGenerated: "2025-05-01T08:30:00Z",
    nextGeneration: "2025-05-02T08:30:00Z",
    format: "PDF",
    size: "2.4 MB",
    recipients: ["admin@mileseducation.com"],
  },
  {
    id: "2",
    name: "Weekly Traffic Analysis",
    type: "Weekly",
    lastGenerated: "2025-04-28T09:00:00Z",
    nextGeneration: "2025-05-05T09:00:00Z",
    format: "PDF",
    size: "4.7 MB",
    recipients: ["admin@mileseducation.com", "manager@mileseducation.com"],
  },
  {
    id: "3",
    name: "Monthly Security Report",
    type: "Monthly",
    lastGenerated: "2025-04-01T10:00:00Z",
    nextGeneration: "2025-05-01T10:00:00Z",
    format: "PDF",
    size: "8.2 MB",
    recipients: ["admin@mileseducation.com", "security@mileseducation.com"],
  },
  {
    id: "4",
    name: "Custom Device Health Report",
    type: "Custom",
    lastGenerated: "2025-04-29T14:15:00Z",
    nextGeneration: "N/A",
    format: "PDF",
    size: "3.1 MB",
    recipients: [],
  },
]

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false)
  const [isDeleteReportOpen, setIsDeleteReportOpen] = useState(false)
  const [currentReport, setCurrentReport] = useState<any>(null)
  const [newReport, setNewReport] = useState({
    name: "",
    type: "Daily",
    format: "PDF",
    sections: {
      executiveSummary: true,
      deviceHealth: true,
      trafficAnalysis: true,
      securityInsights: true,
      urlAccess: true,
      vpnPerformance: true,
    },
    recipients: "",
    timeRange: "24h",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReport((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewReport((prev) => ({ ...prev, [name]: value }))
  }

  const handleSectionToggle = (section: string) => {
    setNewReport((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section as keyof typeof prev.sections],
      },
    }))
  }

  const handleCreateReport = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      const newId = (reports.length + 1).toString()
      const now = new Date().toISOString()
      let nextGen = "N/A"

      if (newReport.type === "Daily") {
        const next = new Date()
        next.setDate(next.getDate() + 1)
        nextGen = next.toISOString()
      } else if (newReport.type === "Weekly") {
        const next = new Date()
        next.setDate(next.getDate() + 7)
        nextGen = next.toISOString()
      } else if (newReport.type === "Monthly") {
        const next = new Date()
        next.setMonth(next.getMonth() + 1)
        nextGen = next.toISOString()
      }

      setReports([
        ...reports,
        {
          id: newId,
          name: newReport.name,
          type: newReport.type,
          lastGenerated: now,
          nextGeneration: nextGen,
          format: newReport.format,
          size: "0.0 MB",
          recipients: newReport.recipients ? newReport.recipients.split(",").map((email) => email.trim()) : [],
        },
      ])
      setIsLoading(false)
      setIsCreateReportOpen(false)
    }, 1000)
  }

  const handleDeleteReport = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      setReports(reports.filter((report) => report.id !== currentReport.id))
      setIsLoading(false)
      setIsDeleteReportOpen(false)
    }, 1000)
  }

  const handleGenerateReport = (report: any) => {
    setIsGenerating(true)
    // In a real app, this would generate the report
    setTimeout(() => {
      setIsGenerating(false)
      alert(`Report "${report.name}" generated successfully!`)
    }, 2000)
  }

  const openDeleteDialog = (report: any) => {
    setCurrentReport(report)
    setIsDeleteReportOpen(true)
  }

  const formatDate = (dateString: string) => {
    if (dateString === "N/A") return "N/A"
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <Button
            className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
            onClick={() => setIsCreateReportOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-[#00FFFF]/10 p-3 rounded-full mb-4">
                <FileText className="h-8 w-8 text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-bold text-white">{reports.length}</h3>
              <p className="text-gray-400">Total Reports</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-[#00FFFF]/10 p-3 rounded-full mb-4">
                <Repeat className="h-8 w-8 text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-bold text-white">3</h3>
              <p className="text-gray-400">Scheduled Reports</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-[#00FFFF]/10 p-3 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-bold text-white">7</h3>
              <p className="text-gray-400">Generated This Week</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#00FFFF] flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Report Management
            </CardTitle>
            <CardDescription>View, generate, and manage your reports.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#00FFFF]/20">
                    <th className="px-4 py-3 text-left text-gray-400">Report Name</th>
                    <th className="px-4 py-3 text-left text-gray-400">Type</th>
                    <th className="px-4 py-3 text-left text-gray-400 hidden md:table-cell">Last Generated</th>
                    <th className="px-4 py-3 text-left text-gray-400 hidden md:table-cell">Next Generation</th>
                    <th className="px-4 py-3 text-left text-gray-400 hidden md:table-cell">Format</th>
                    <th className="px-4 py-3 text-right text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b border-[#00FFFF]/10 hover:bg-[#1A1A2E]/80">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{report.name}</div>
                        <div className="text-gray-400 text-xs md:hidden">
                          {report.type} • {formatDate(report.lastGenerated)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.type === "Daily"
                              ? "bg-green-500/20 text-green-500"
                              : report.type === "Weekly"
                                ? "bg-blue-500/20 text-blue-500"
                                : report.type === "Monthly"
                                  ? "bg-purple-500/20 text-purple-500"
                                  : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {report.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {formatDate(report.lastGenerated)}
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {formatDate(report.nextGeneration)}
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {report.format} ({report.size})
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                            onClick={() => handleGenerateReport(report)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span className="sr-only md:not-sr-only md:ml-2">Generate</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#1A1A2E] border border-[#00FFFF]/20">
                              <DropdownMenuItem
                                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                                onClick={() => alert(`Downloading ${report.name}...`)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                                onClick={() => alert(`Sending ${report.name} via email...`)}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Email Report
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                                onClick={() => openDeleteDialog(report)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white">No reports found</h3>
                <p className="text-gray-400 mt-2">Create your first report to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Report Dialog */}
        <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
          <DialogContent className="bg-[#1A1A2E] border border-[#00FFFF]/20 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-[#00FFFF]">Create New Report</DialogTitle>
              <DialogDescription className="text-gray-400">
                Configure your report settings and schedule.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="bg-[#1A1A2E] border border-[#00FFFF]/20 mb-4">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                >
                  Delivery
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Report Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newReport.name}
                    onChange={handleInputChange}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="e.g., Weekly Network Status"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-white">
                    Report Type
                  </Label>
                  <Select value={newReport.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectItem value="Daily">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-green-500" />
                          Daily
                        </div>
                      </SelectItem>
                      <SelectItem value="Weekly">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          Weekly
                        </div>
                      </SelectItem>
                      <SelectItem value="Monthly">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                          Monthly
                        </div>
                      </SelectItem>
                      <SelectItem value="Custom">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          Custom (One-time)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format" className="text-white">
                    Report Format
                  </Label>
                  <Select value={newReport.format} onValueChange={(value) => handleSelectChange("format", value)}>
                    <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeRange" className="text-white">
                    Time Range
                  </Label>
                  <Select value={newReport.timeRange} onValueChange={(value) => handleSelectChange("timeRange", value)}>
                    <SelectTrigger className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white">
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="executiveSummary" className="text-white">
                      Executive Summary
                    </Label>
                    <p className="text-sm text-gray-400">Overview of network status and key metrics</p>
                  </div>
                  <Switch
                    id="executiveSummary"
                    checked={newReport.sections.executiveSummary}
                    onCheckedChange={() => handleSectionToggle("executiveSummary")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="deviceHealth" className="text-white">
                      Device Health
                    </Label>
                    <p className="text-sm text-gray-400">Status and metrics for all monitored devices</p>
                  </div>
                  <Switch
                    id="deviceHealth"
                    checked={newReport.sections.deviceHealth}
                    onCheckedChange={() => handleSectionToggle("deviceHealth")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trafficAnalysis" className="text-white">
                      Traffic Analysis
                    </Label>
                    <p className="text-sm text-gray-400">Bandwidth usage and traffic patterns</p>
                  </div>
                  <Switch
                    id="trafficAnalysis"
                    checked={newReport.sections.trafficAnalysis}
                    onCheckedChange={() => handleSectionToggle("trafficAnalysis")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityInsights" className="text-white">
                      Security Insights
                    </Label>
                    <p className="text-sm text-gray-400">Security alerts and potential threats</p>
                  </div>
                  <Switch
                    id="securityInsights"
                    checked={newReport.sections.securityInsights}
                    onCheckedChange={() => handleSectionToggle("securityInsights")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urlAccess" className="text-white">
                      URL Access
                    </Label>
                    <p className="text-sm text-gray-400">Top accessed URLs and domains</p>
                  </div>
                  <Switch
                    id="urlAccess"
                    checked={newReport.sections.urlAccess}
                    onCheckedChange={() => handleSectionToggle("urlAccess")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="vpnPerformance" className="text-white">
                      VPN Performance
                    </Label>
                    <p className="text-sm text-gray-400">VPN usage and performance metrics</p>
                  </div>
                  <Switch
                    id="vpnPerformance"
                    checked={newReport.sections.vpnPerformance}
                    onCheckedChange={() => handleSectionToggle("vpnPerformance")}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>

                <div className="pt-4">
                  <div className="p-4 border border-[#00FFFF]/20 rounded-md bg-[#00FFFF]/5">
                    <div className="flex items-center mb-2">
                      <Palette className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <h3 className="text-white font-medium">Report Preview</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#1A1A2E] border border-[#00FFFF]/20 rounded-md p-3 flex items-center justify-center">
                        <img src="/miles-logo.png" alt="Report Cover" className="h-12 object-contain" />
                      </div>
                      <div className="bg-[#1A1A2E] border border-[#00FFFF]/20 rounded-md p-3 flex items-center justify-center">
                        <PieChart className="h-12 w-12 text-[#00FFFF]" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients" className="text-white">
                    Email Recipients
                  </Label>
                  <Input
                    id="recipients"
                    name="recipients"
                    value={newReport.recipients}
                    onChange={handleInputChange}
                    className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                    placeholder="e.g., admin@mileseducation.com, manager@mileseducation.com"
                  />
                  <p className="text-xs text-gray-400">Separate multiple email addresses with commas</p>
                </div>

                {newReport.type !== "Custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="schedule" className="text-white">
                      Schedule
                    </Label>
                    <div className="p-4 border border-[#00FFFF]/20 rounded-md bg-[#00FFFF]/5">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-[#00FFFF] mr-2" />
                        <h3 className="text-white font-medium">
                          {newReport.type === "Daily"
                            ? "Daily at 8:00 AM"
                            : newReport.type === "Weekly"
                              ? "Every Monday at 8:00 AM"
                              : "First day of each month at 8:00 AM"}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        {newReport.type === "Daily"
                          ? "Report will be generated every day at 8:00 AM"
                          : newReport.type === "Weekly"
                            ? "Report will be generated every Monday at 8:00 AM"
                            : "Report will be generated on the first day of each month at 8:00 AM"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <Label htmlFor="emailDelivery" className="text-white">
                      Email Delivery
                    </Label>
                    <p className="text-sm text-gray-400">Automatically email report when generated</p>
                  </div>
                  <Switch
                    id="emailDelivery"
                    checked={!!newReport.recipients}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        setNewReport((prev) => ({ ...prev, recipients: "" }))
                      }
                    }}
                    className="data-[state=checked]:bg-[#00FFFF]"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateReportOpen(false)}
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateReport}
                className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80"
                disabled={isLoading || !newReport.name}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Create Report
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Report Dialog */}
        <Dialog open={isDeleteReportOpen} onOpenChange={setIsDeleteReportOpen}>
          <DialogContent className="bg-[#1A1A2E] border border-[#00FFFF]/20 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-500">Delete Report</DialogTitle>
              <DialogDescription className="text-gray-400">This action cannot be undone.</DialogDescription>
            </DialogHeader>
            {currentReport && (
              <div className="py-4">
                <p className="text-white">
                  Are you sure you want to delete the report <span className="font-bold">{currentReport.name}</span>?
                </p>
                <p className="text-gray-400 mt-2">All associated data and schedules will be permanently removed.</p>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteReportOpen(false)}
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteReport}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Report
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
