import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, ListOrdered } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSideBarItems";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSidebarItem";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/customer/create-rentals",
    icon: ListOrdered,
  },
];

export const sidebarMenuItems = {
  Customer: CUSTOMER_SIDEBAR_ITEMS,
  Admin: ADMIN_SIDEBAR_ITEMS,
  Provider: PROVIDER_SIDEBAR_ITEMS,
};
