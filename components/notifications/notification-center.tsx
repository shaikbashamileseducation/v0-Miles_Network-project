"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Check, X, AlertTriangle, Info, Shield, Wifi, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    title: "High CPU Usage",
    message: "pfSense Firewall CPU usage is at 92%",
    type: "warning",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    read: false,
    icon: AlertTriangle,
  },
  {
    id: "2",
    title: "Device Offline",
    message: "UniFi AP-02 is offline",
    type: "error",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    read: false,
    icon: Wifi,
  },
  {
    id: "3",
    title: "Security Alert",
    message: "AirDrop traffic detected from 192.168.1.45",
    type: "error",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    read: false,
    icon: Shield,
  },
  {
    id: "4",
    title: "Report Generated",
    message: "Daily Network Status report has been generated",
    type: "info",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    read: true,
    icon: Info,
  },
  {
    id: "5",
    title: "Device Added",
    message: "New device Switch-12 has been added",
    type: "success",
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    read: true,
    icon: HardDrive,
  },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [currentToast, setCurrentToast] = useState<any>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    // Simulate receiving a new notification
    const timer = setTimeout(() => {
      const newNotification = {
        id: (notifications.length + 1).toString(),
        title: "Memory Usage Alert",
        message: "Switch-05 memory usage is at 87%",
        type: "warning",
        timestamp: new Date().toISOString(),
        read: false,
        icon: AlertTriangle,
      }
      setNotifications([newNotification, ...notifications])
      setCurrentToast(newNotification)
      setShowToast(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [notifications])

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-500",
          icon: "text-red-500",
        }
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-500",
          icon: "text-yellow-500",
        }
      case "success":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-500",
          icon: "text-green-500",
        }
      case "info":
      default:
        return {
          bg: "bg-[#00FFFF]/10",
          border: "border-[#00FFFF]/30",
          text: "text-[#00FFFF]",
          icon: "text-[#00FFFF]",
        }
    }
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9 border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] bg-[#FF00FF] text-white" variant="default">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 bg-[#1A1A2E] border border-[#00FFFF]/20" align="end">
          <div className="flex items-center justify-between p-4">
            <DropdownMenuLabel className="text-lg font-semibold text-white">Notifications</DropdownMenuLabel>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-white"
                  onClick={markAllAsRead}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-white"
                  onClick={clearAll}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
          <DropdownMenuSeparator className="bg-[#00FFFF]/20" />
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <DropdownMenuGroup>
                {notifications.map((notification) => {
                  const styles = getTypeStyles(notification.type)
                  const NotificationIcon = notification.icon

                  return (
                    <div key={notification.id} className="relative">
                      <DropdownMenuItem
                        className={`p-4 ${!notification.read ? styles.bg : ""} hover:bg-[#00FFFF]/5 cursor-default`}
                      >
                        <div className="flex w-full">
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full ${styles.bg} flex items-center justify-center mr-3`}
                          >
                            <NotificationIcon className={`h-5 w-5 ${styles.icon}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className={`font-medium ${styles.text}`}>{notification.title}</p>
                              <span className="text-xs text-gray-400 ml-2">{formatTime(notification.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#00FFFF]/10" />
                    </div>
                  )
                })}
              </DropdownMenuGroup>
            ) : (
              <div className="py-8 text-center">
                <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No notifications</p>
              </div>
            )}
          </div>
          <DropdownMenuSeparator className="bg-[#00FFFF]/20" />
          <div className="p-2">
            <Button
              variant="outline"
              className="w-full border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
              onClick={() => setIsOpen(false)}
            >
              View All Notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && currentToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-80 p-4 rounded-lg shadow-lg ${
              getTypeStyles(currentToast.type).bg
            } border ${getTypeStyles(currentToast.type).border}`}
          >
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-[#1A1A2E]/50 flex items-center justify-center mr-3`}
              >
                <currentToast.icon className={`h-5 w-5 ${getTypeStyles(currentToast.type).icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className={`font-medium ${getTypeStyles(currentToast.type).text}`}>{currentToast.title}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1 text-gray-400 hover:text-white"
                    onClick={() => setShowToast(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-white mt-1">{currentToast.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
