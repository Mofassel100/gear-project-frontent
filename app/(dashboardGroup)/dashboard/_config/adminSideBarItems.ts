import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
];
