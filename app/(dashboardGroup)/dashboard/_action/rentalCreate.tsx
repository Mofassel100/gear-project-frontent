/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { generateOrderId } from "@/lib/generatedId";
import { getMe } from "@/service/getMe";
import { isAccessTokenExist } from "@/service/refreshToken";
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
  const user = await getMe()
  const orderNumber = generateOrderId()
  const rentalStartDate = new Date();

const rentalEndDate = new Date(rentalStartDate);
rentalEndDate.setDate(rentalEndDate.getDate() + 3);
  
  const payload = {
    orderNumber: orderNumber,
    customerId:user.data.id ,
  gearItemId:formData.get("gearItemId"),
  rentalStartDate:rentalStartDate,
  rentalEndDate: rentalEndDate
  };

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
  return result;
};


