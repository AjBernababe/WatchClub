"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trash,
  CircleCheckBig,
  TvMinimalPlay,
  Search,
  Clock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Watchlist",
      url: "/watchlist",
      icon: Clock,
    },
    {
      title: "Watching",
      url: "/watching",
      icon: TvMinimalPlay,
    },
    {
      title: "Completed",
      url: "/completed",
      icon: CircleCheckBig,
    },
    {
      title: "Dropped",
      url: "/dropped",
      icon: Trash,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Search,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>TEST</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>TEST</SidebarFooter>
    </Sidebar>
  );
}
