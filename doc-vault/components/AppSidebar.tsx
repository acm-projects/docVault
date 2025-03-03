import { Menu, Home, Folder, Settings, ChevronUp, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Folders",
    url: "#",
    icon: Folder,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const subItems = [
  {
    title: "Personal",
    url: "#",
  },
  {
    title: "School",
    url: "#",
  },
  {
    title: "Work",
    url: "#",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-10 text-3xl font-semibold text-center">docVault</SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flexCenter">
          <SidebarMenuItem className="py-5">
            <SidebarMenuButton className=" text-2xl">
              <Link className="flex" href="/dashboard">
                <Home size="32" />
                <span className="px-10"> Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="py-5">
            <SidebarMenuButton className="text-2xl">
              <Link className="flex" href="#">
                <Folder size="32" />
                <span className="px-8">Folders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="py-5">
            <SidebarMenuButton className="text-2xl">
              <Link className="flex" href="/settings">
                <Settings size="32" />
                <span className="px-7">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="text-lg">
                    <User2 size="32" /> 
                    <span>Username</span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}