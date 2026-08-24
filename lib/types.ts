import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

enum OrderStatus {
  PENDING,
  CONFIRMED,
  PROCESSING,
  RETURNED,
  READY_FOR_PICKUP,
  OUT_FOR_DELIVERY,
  COMPLETED,
  CANCELLED,
}

enum PaymentStatus {
  PENDING,
  PAID,
  FAILED,
  REFUNDED,
}

enum PickupMethod {
  SELF_PICKUP,
  HOME_DELIVERY,
}
export type IGearStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface TUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  address?: string;
  city?: string;
  role?: "Customer" | "Provider" | "Admin";
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

export interface IRentalOrder {
  orderNumber: string;
  id?: string;
  customerId: string;
  gearItemId: string;

  rentalStartDate?: Date;
  rentalEndDate?: Date;

  pickupMethod?: "SELF_PICKUP" | "HOME_DELIVERY";

  subtotal: number;
  deliveryFee: number;
  totalAmount: number;

  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  orderStatus:
    | "PENDING"
    | "CONFIRMED"
    | "RETURNED"
    | "READY_FOR_PICKUP"
    | "OUT_FOR_DELIVERY"
    | "COMPLETED"
    | "CANCELLED";

  createdAt: Date;
  updatedAt: Date;
}
export interface ICategory {
  id: string;
  name: string;
  category?: string;
  status?: string;
  sortOrder?: number;
  totalGearItems?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSingle {
  id: string;
  name: string;
  email: string;
  status: string;
  role: "Admin" | "Customer" | "Provider";
  createdAt: string;
  updatedAt: string;
  phone: number;
  password: string;
  address: string;
  city: string;
  country: string;
}

export interface IRentalOrderUpdated {
  orderNumber?: string;
  customerId?: string;
  gearItemId?: string;

  rentalStartDate?: Date;
  rentalEndDate?: Date;

  pickupMethod?: PickupMethod;

  subtotal?: number;
  deliveryFee?: number;
  totalAmount?: number;

  paymentStatus?: PaymentStatus;
  orderStatus?: OrderStatus;
}

enum SportType {
  FOOTBALL,
  CRICKET,
  TENNIS,
}

enum GearCondition {
  NEW,
  EXCELLENT,
  GOOD,
  FAIR,
}

enum GearStatus {
  PENDING,
  APPROVED,
  REJECTED,
}
export interface IGearItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  picture: string;
  model: string;
  description: string;
  sportType: SportType;
  condition: GearCondition;

  stockQuantity?: number;
  availableQuantity?: number;

  minRentalDays?: number;
  maxRentalDays?: number;

  status?: GearStatus;
  isAvailable?: boolean;

  providerId: string;
  categoryId: string;
}
// export interface IGearQuery extends GearItemWhereInput {
//   searchTerm?: string;
//   page?: string;
//   limit?: string;
//   sortOrder?: string;
//   sortBy?: string;
// }
