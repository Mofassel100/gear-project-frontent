/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation"
import { resourceLimits } from "worker_threads";

type GearState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

export const paymentCreate = async (
  prevState: GearState,
  formData: FormData,
) => {
  const user= await getMe()

// console.log(user, formData.get("name"),formData.get("brand"),formData.get("model"),formData.get("condition"), formData.get("categoryId"),formData.get("description"))
  const payload = {
   
    rentalOrderId:formData.get("id")
    
  };
 
  
  const accessToken = await isAccessTokenExist()

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/create`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log("result: ", result)
if(result.success){
            redirect(`${result?.data?.checkoutUrl}`);
        }
  return result;
};
export const paymentUpdated = async (
  prevState: GearState,
  formData: FormData,
) => {
  const user= await getMe()

// console.log(user, formData.get("name"),formData.get("brand"),formData.get("model"),formData.get("condition"), formData.get("categoryId"),formData.get("description"))
  const payload = {
    name: formData.get("name"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    condition: formData.get("condition"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    userId: user.data.id
  };
  const accessToken = await isAccessTokenExist()
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/create`, {
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



