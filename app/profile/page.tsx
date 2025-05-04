"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Camera, Save } from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [formData, setFormData] = useState({
    username: "admin",
    email: "admin@mileseducation.com",
    fullName: "Administrator",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    dashboard: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    console.log("Profile data:", formData)
    alert("Profile updated successfully!")
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the password change request
    console.log("Password data:", {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    })
    alert("Password updated successfully!")
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update notification preferences
    console.log("Notification preferences:", notifications)
    alert("Notification preferences updated!")
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image */}
          <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-[#00FFFF]">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-[#00FFFF]"
                />
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-[#00FFFF] text-[#1A1A2E] p-2 rounded-full cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload image</span>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-white">{formData.fullName}</h3>
                <p className="text-gray-400">Administrator</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="bg-[#1A1A2E]/50 border border-[#00FFFF]/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#00FFFF]">Profile Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-[#1A1A2E] border border-[#00FFFF]/20 mb-4">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                  >
                    Password
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
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
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80 w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="password">
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-white">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                        <p className="text-xs text-gray-400">
                          Password must be at least 12 characters with mixed case, numbers, and symbols
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="bg-[#1A1A2E] border-[#00FFFF]/30 text-white"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80 w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="notifications">
                  <form onSubmit={handleNotificationSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-400">Receive alerts via email</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={() => handleNotificationChange("email")}
                          className="data-[state=checked]:bg-[#00FFFF]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-400">Receive alerts via SMS</p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={() => handleNotificationChange("sms")}
                          className="data-[state=checked]:bg-[#00FFFF]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Dashboard Notifications</h4>
                          <p className="text-sm text-gray-400">Show alerts in the dashboard</p>
                        </div>
                        <Switch
                          checked={notifications.dashboard}
                          onCheckedChange={() => handleNotificationChange("dashboard")}
                          className="data-[state=checked]:bg-[#00FFFF]"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-[#00FFFF] text-[#1A1A2E] hover:bg-[#00FFFF]/80 w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
