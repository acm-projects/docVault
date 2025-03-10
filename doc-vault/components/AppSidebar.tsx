import { Home, Folder, Settings, ChevronUp, User2, ChevronDown } from "lucide-react"

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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
// potential folders
const items = [
  {
    title: "Personal",
    url: "/personal",
  },
  {
    title: "School",
    url: "/school",
  },
  {
    title: "Work",
    url: "/work",
  },
]

export function AppSidebar() {
  return (
    <>
    <div className="relative">
      <SidebarTrigger className="absolute top-0 right-0" />
    </div>
    <Sidebar>
        <Link href="/">
          <SidebarHeader className="p-10 text-3xl font-semibold text-center cursor-pointer">docVault</SidebarHeader>
        </Link>
        <SidebarContent>
          <SidebarMenu className="flexCenter">
            <SidebarMenuItem className="py-5">
              <SidebarMenuButton className="hover:font-bold hover:bg-lighterred transition-all text-2xl">
                <Link className="flex" href="/">
                  <Home size="32" />
                  <span className="px-10">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel className="flex text-white" asChild>
                  <CollapsibleTrigger className="hover:font-bold hover:bg-lighterred transition-all">
                    <Folder className="mx-5"/>
                    <span className="px-4">Folders</span>
                    <ChevronDown className="px-2 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                
                <CollapsibleContent>
                  <SidebarGroupContent className="py-5">
                    {items.map((item, index) => (
                      <Link key={index} href={item.url}>
                        <SidebarMenuItem>
                          <SidebarMenuButton className="hover:font-bold hover:bg-lighterred transition-all mx-5 py-5 text-xl">
                            {item.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                    ))}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarMenuItem className="py-5">
              <SidebarMenuButton className="hover:font-bold hover:bg-lighterred transition-all text-2xl">
                <Link className="flex" href="/settings">
                  <Settings className="mx-2" size="32" />
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
                  <Link href="/account">
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}