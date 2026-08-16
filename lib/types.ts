import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IGearStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface TUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  address?: string;
  city?: string;
  role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
}
export interface IUserStatus {
  status?: "ACTIVE" | "SUSPENDED";
}
export interface IUserRole {
  role?: "Admin" | "Customer" | "Provider";
}

type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: "Admin" | "Customer" | "Provider";
    createdAt: string;
    updatedAt: string;
  };
};

export type NavbarProps = {
  user: IUser;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
