"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Edit,
  Key,
  Loader2,
  MoreHorizontal,
  PlusCircle,
  Search,
  Shield,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"

// Mock user data
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@mileseducation.com",
    fullName: "Administrator",
    role: "Admin",
    lastLogin: "2025-05-01T08:30:00Z",
    status: "active",
  },
  {
    id: "2",
    username: "manager",
    email: "manager@mileseducation.com",
    fullName: "Network Manager",
    role: "Manager",
    lastLogin: "2025-05-01T09:15:00Z",
    status: "active",
  },
  {
    id: "3",
    username: "viewer1",
    email: "viewer1@mileseducation.com",
    fullName: "Network Viewer 1",
    role: "Viewer",
    lastLogin: "2025-04-30T14:20:00Z",
    status: "active",
  },
  {
    id: "4",
    username: "viewer2",
    email: "viewer2@mileseducation.com",
    fullName: "Network Viewer 2",
    role: "Viewer",
    lastLogin: "2025-04-29T11:45:00Z",
    status: "inactive",
  },
  {
    id: "5",
    username: "security",
    email: "security@mileseducation.com",
    fullName: "Security Analyst",
    role: "Manager",
    lastLogin: "2025-04-30T16:10:00Z",
    status: "active",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    fullName: "",
    role: "Viewer",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (role: string) => {
    setNewUser((prev) => ({ ...prev, role }))
  }

  const handleAddUser = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      const newId = (users.length + 1).toString()
      setUsers([
        ...users,
        {
          id: newId,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
          lastLogin: "Never",
          status: "active",
        },
      ])
      setNewUser({
        username: "",
        email: "",
        fullName: "",
        role: "Viewer",
        password: "",
        confirmPassword: "",
      })
      setIsLoading(false)
      setIsAddUserOpen(false)
    }, 1000)
  }

  const handleEditUser = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role,
              }
            : user,
        ),
      )
      setIsLoading(false)
      setIsEditUserOpen(false)
    }, 1000)
  }

  const handleDeleteUser = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      setUsers(users.filter((user) => user.id !== currentUser.id))
      setIsLoading(false)
      setIsDeleteUserOpen(false)
    }, 1000)
  }

  const handleResetPassword = () => {
    setIsLoading(true)
    // In a real app, this would send the data to the server
    setTimeout(() => {
      // Password reset logic would go here
      setIsLoading(false)
      setIsResetPasswordOpen(false)
      alert(`Password reset email sent to ${currentUser.email}`)
    }, 1000)
  }

  const openEditDialog = (user: any) => {
    setCurrentUser(user)
    setNewUser({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      password: "",
      confirmPassword: "",
    })
    setIsEditUserOpen(true)
  }

  const openDeleteDialog = (user: any) => {
    setCurrentUser(user)
    setIsDeleteUserOpen(true)
  }

  const openResetPasswordDialog = (user: any) => {
    setCurrentUser(user)
    setIsResetPasswordOpen(true)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    if (dateString === "Never") return "Never"
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-4 w-4 text-[#FF00FF]" />
      case "Manager":
        return <Key className="h-4 w-4 text-[#00FFFF]" />
      case "Viewer":
        return <User className="h-4 w-4 text-gray-400" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <Button className="bg-[#FF00FF] text-white hover:bg-[#FF00FF]/80" onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="bg-[#1A1A2E]/50 border border-[#FF00FF]/20 mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name, username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A2E]/50 border border-[#FF00FF]/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#FF00FF] flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FF00FF]/20">
                  <th className="px-4 py-3 text-left text-gray-400">User</th>
                  <th className="px-4 py-3 text-left text-gray-400">Role</th>
                  <th className="px-4 py-3 text-left text-gray-400 hidden md:table-cell">Last Login</th>
                  <th className="px-4 py-3 text-left text-gray-400 hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 text-right text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#FF00FF]/10 hover:bg-[#1A1A2E]/80">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-white">{user.fullName}</div>
                        <div className="text-gray-400 text-xs">
                          {user.username} • {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span
                          className={`ml-2 ${
                            user.role === "Admin"
                              ? "text-[#FF00FF]"
                              : user.role === "Manager"
                                ? "text-[#00FFFF]"
                                : "text-gray-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{formatDate(user.lastLogin)}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "active" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1A1A2E] border border-[#FF00FF]/20">
                          <DropdownMenuItem
                            className="text-white hover:bg-[#FF00FF]/10 cursor-pointer"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-white hover:bg-[#FF00FF]/10 cursor-pointer"
                            onClick={() => openResetPasswordDialog(user)}
                          >
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          {user.username !== "admin" && (
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                              onClick={() => openDeleteDialog(user)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white">No users found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-[#1A1A2E] border border-[#FF00FF]/20 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#FF00FF]">Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                placeholder="e.g., john.doe"
                required
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
                value={newUser.email}
                onChange={handleInputChange}
                className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                placeholder="e.g., john.doe@mileseducation.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={newUser.fullName}
                onChange={handleInputChange}
                className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <Select value={newUser.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white">
                  <SelectItem value="Admin">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-[#FF00FF]" />
                      Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="Manager">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-[#00FFFF]" />
                      Manager
                    </div>
                  </SelectItem>
                  <SelectItem value="Viewer">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      Viewer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1">
                {newUser.role === "Admin"
                  ? "Full access to all features and settings."
                  : newUser.role === "Manager"
                    ? "Can view all data and generate reports, but cannot manage users."
                    : "Can only view dashboards and device status."}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                required
              />
              <p className="text-xs text-gray-400">
                Password must be at least 12 characters with mixed case, numbers, and symbols.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={newUser.confirmPassword}
                onChange={handleInputChange}
                className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserOpen(false)}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              className="bg-[#FF00FF] text-white hover:bg-[#FF00FF]/80"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="bg-[#1A1A2E] border border-[#FF00FF]/20 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#FF00FF]">Edit User</DialogTitle>
            <DialogDescription className="text-gray-400">Update user information and permissions.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={newUser.username}
                  className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
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
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={newUser.fullName}
                  onChange={handleInputChange}
                  className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Role
                </Label>
                <Select value={newUser.role} onValueChange={handleRoleChange} disabled={newUser.username === "admin"}>
                  <SelectTrigger className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A2E] border-[#FF00FF]/30 text-white">
                    <SelectItem value="Admin">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-[#FF00FF]" />
                        Admin
                      </div>
                    </SelectItem>
                    <SelectItem value="Manager">
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-[#00FFFF]" />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="Viewer">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        Viewer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditUserOpen(false)}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              className="bg-[#FF00FF] text-white hover:bg-[#FF00FF]/80"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="bg-[#1A1A2E] border border-[#FF00FF]/20 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete User</DialogTitle>
            <DialogDescription className="text-gray-400">This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p className="text-white">
                Are you sure you want to delete the user <span className="font-bold">{currentUser.fullName}</span> (
                {currentUser.username})?
              </p>
              <p className="text-gray-400 mt-2">All associated data will be permanently removed.</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteUserOpen(false)}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} className="bg-red-500 text-white hover:bg-red-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="bg-[#1A1A2E] border border-[#FF00FF]/20 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#FF00FF]">Reset Password</DialogTitle>
            <DialogDescription className="text-gray-400">Send a password reset email to the user.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p className="text-white">
                Send a password reset email to <span className="font-bold">{currentUser.fullName}</span> at{" "}
                <span className="text-[#00FFFF]">{currentUser.email}</span>?
              </p>
              <p className="text-gray-400 mt-2">
                The user will receive an email with instructions to reset their password.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetPasswordOpen(false)}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResetPassword}
              className="bg-[#FF00FF] text-white hover:bg-[#FF00FF]/80"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
