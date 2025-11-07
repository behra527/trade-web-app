"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/molecules/Sidebar";
import  Header  from "@/features/components/Header";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900 w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Section */}
        <div className="flex-1 flex flex-col sm:w-full md:w-full lg:w-full xl:w-full bg-slate-900">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="w-full p-6 md:w-full lg:w-full xl:w-full overflow-hidden overflow-y-auto bg-slate-900">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
