"use client";

import * as React from "react";
import { IconDashboard, IconListDetails, IconUserCheck, IconUsers } from "@tabler/icons-react";

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/FinancialAdvisorDashboard/nav-main";
import { NavUser } from "@/components/FinancialAdvisorDashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const data = {
  user: {
    name: `${session?.user?.name}`,
    email: `${session?.user?.email}`,
    avatar: "/images/profile-anonim.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/financial-advisor",
      icon: IconDashboard,
    },
    {
      title: "Clients",
      url: "/financial-advisor/clients",
      icon: IconUsers,
    },
    {
      title: "Financial Check",
      url: "/financial-advisor/financial-check",
      icon: IconListDetails,
    },
    {
      title: "My Services",
      url: "/financial-advisor/services",
      icon: IconUserCheck,
    },
  ],
};
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center">
                <div className="relative !size-6">
                  <Image
                    src="/images/dibalikruang-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-base font-semibold">dibalikruang.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
