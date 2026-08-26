"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { LogOut, ServerCrashIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "Gear", href: "/gear" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Home", icon: User, action: "/" },
  { label: "Gear", icon: ServerCrashIcon, action: "/gear" },
];

type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    status: string;
    city: string;
    country: string;
    phone: number;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};
 const dashboardPaths: Record<string, string> = {
  Customer: "/dashboard/customer",
  Admin: "/dashboard/admin",
  Provider: "/dashboard/provider",
};

type NavbarProps = {
  user?: IUser;
};

export function Navbar({ user }: NavbarProps) {
  
  const router = useRouter();

const dashboardPath = user?.data?.role
  ? dashboardPaths[user?.data?.role]
  : undefined;

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-primary">Popular Gears</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {user?.data?.status && dashboardPath && (
  <Link href={dashboardPath}>
    <Button className="bg-white cursor-pointer text-gray-950">
      My Dashboard
    </Button>
  </Link>
)}
          </div>

          {/* User Dropdown */}
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open user menu"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-4 text-primary" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user?.data?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.data?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                 
               {user?.data?.status && dashboardPath && (
  <Link href={dashboardPath}>
    <Button className="bg-white cursor-pointer text-gray-950">
      My Dashboard
    </Button>
  </Link>
)}
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                      >
                        <Icon className="mr-2 size-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUserMenuAction("logout")}>
                  <LogOut className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
