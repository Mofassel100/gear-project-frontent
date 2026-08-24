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
  console.log(Number(formData.get("stockQuantity")))
  const stockQuantity = Number(formData.get("stockQuantity"));
  const rentalStartDate = new Date();
   

const rentalEndDate = new Date(rentalStartDate);
rentalEndDate.setDate(rentalEndDate.getDate() + 3);
  
  const payload = {
  orderNumber: orderNumber,
  customerId:user.data.id ,
  stockQuantity:stockQuantity,
  gearItemId:formData.get("gearId"),
  rentalStartDate:rentalStartDate,
  rentalEndDate: rentalEndDate
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

  revalidatePath("/dashboard/customer/create-rentals")
  return result;
};


