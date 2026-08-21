/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { isAccessTokenExist } from "@/service/refreshToken";
import { getMe } from "@/service/getMe";
type GearState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

/*

    data : {
        title
        conten
    }
*/
export const createGear = async (
  prevState: GearState,
  formData: FormData,
) => {
  const user= await getMe()
  console.log(user)
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
console.log(payload)
  const accessToken = await isAccessTokenExist()

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`

      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};
export const updateGear = async (
  postId: string,
  prevState: GearState,
  formData: FormData,
) => {
  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
    // tags: (formData.get("tags") as string).split(", ") ?? "",
    // isPremium: formData.get("isPremium") === "on",
  };

  const accessToken = await  isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
        // Authorization : accessToken as unknown as string,
        // Authorization : `${accessToken}`,
        // Authorization : `Bearer ${accessToken}`

        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

 
  

  return result;
};

export const getMyRentals = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`

      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1day
      tags: ["rentals"],
    },
  });

  const result = res.json();

  return result;
};
