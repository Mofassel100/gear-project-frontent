/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { generateOrderId } from "@/lib/generatedId";
import { getMe } from "@/service/getMe";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath } from "next/cache";
type RentaleState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

export const createRental = async (

  prevState: RentaleState,
  formData: FormData,
) => {
  const user =await getMe()
  const orderNumber = generateOrderId()
 
  const stockQuantity = Number(formData.get("stockQuantity"));
  const price = Number(formData.get("price"));
  const rentalStartDate = new Date();
  rentalStartDate.setDate(rentalStartDate.getDate())
   const subTotal = stockQuantity * price
   const deleveryFee = 100 
   const totalAmount = subTotal + deleveryFee

const rentalEndDate = new Date(rentalStartDate);
rentalEndDate.setDate(rentalEndDate.getDate() + 3);

  const orderNumberss = `ORD-${orderNumber}`
  const payload = {
  orderNumber: orderNumberss,
  customerId:user.data.id ,
  stockQuantity:stockQuantity,
  gearItemId:formData.get("gearItemId"),
  rentalStartDate:rentalStartDate,
  rentalEndDate: rentalEndDate,
  subtotal: subTotal,
  deliveryFee: deleveryFee,
  totalAmount: totalAmount
  };
  console.log(payload)

  const accessToken = await isAccessTokenExist()

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
     
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
console.log(result)

  
  if(result.success){
revalidatePath("/dashboard/customer/create-rentals")
  }
  return result;
};


