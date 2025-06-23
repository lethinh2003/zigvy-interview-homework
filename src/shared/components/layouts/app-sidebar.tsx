"use client";

import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { TaskDialog } from "@/modules/task/components";
import { useTaskStore } from "@/modules/task/stores/task.store";
import { Button } from "@/shared/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { PathEnum } from "@/shared/enums";
import { cn } from "@/shared/utils";
import { LayoutDashboard, Plus, Settings } from "lucide-react";
import Link from "next/link";

function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { openCreateTaskDialog } = useTaskStore();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 dark:border-gray-800"
    >
      <SidebarHeader className={cn("p-4", isCollapsed ? "px-2" : "")}>
        {isAuthenticated && (
          <TaskDialog
            dialogTrigger={
              <Button
                onClick={() => {
                  openCreateTaskDialog();
                }}
                disabled={!isAuthenticated}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium ${
                  isCollapsed ? "" : "px-2"
                }`}
              >
                <Plus className="w-4 h-4" />
                {!isCollapsed && <span className="ml-2">Add New</span>}
              </Button>
            }
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href={PathEnum.TASKS}>
                  <SidebarMenuButton
                    className="text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  tooltip="Settings"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
