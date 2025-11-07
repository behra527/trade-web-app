"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/db";



export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-[160px]">
      <SidebarHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 border-b border-emerald-500/20">
        <h1 className="font-bold font-roboto px-3 py-2 text-white tracking-wide letter-spacing-[8px] text-center text-3xl">TradeX</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Main Menu</SidebarGroupLabel> */}
          <SidebarMenu>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 font-medium",
                        active
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border hover:border-slate-700/50"
                      )}
                    >
                      <Icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700/50 mt-auto p-3 bg-slate-900/50">
        <p className="text-xs text-slate-500 text-center font-medium">
          © 2025 TradeX Platform
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
