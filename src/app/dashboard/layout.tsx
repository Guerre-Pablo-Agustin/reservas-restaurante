"use client";
import SideNav from "@/components/Dashboard/Sidenav/Sidenav";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* SideNav */}
      <div
        className={`${
          isCollapsed ? "md:w-10" : "md:w-28"
        } w-full flex-none transition-all duration-300`}
      >
        <SideNav setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
      </div>

      {/* Page Content */}
      <div
        className={`flex-grow p-6 md:overflow-y-auto md:p-8 transition-all duration-300 ${
          isCollapsed ? "md:pl-24" : "md:pl-40"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
