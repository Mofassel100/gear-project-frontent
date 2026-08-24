/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { isAccessTokenExist } from "@/service/refreshToken";
type RentaleState = {
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
export const createRental = async (
  prevState: RentaleState,
  formData: FormData,
) => {
  console.log({
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  });

  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const accessToken = await isAccessTokenExist()

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
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

  if (result.success) {
    revalidateTag("rentals", {
      expire: 0,
    });
  }

  


  return result;
};
export const updateRental = async (
  postId: string,
  prevState: RentaleState,
  formData: FormData,
) => {
  console.log({
    postId,
  });
  

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

  if (result.success) {
    revalidateTag("rentals", {
      expire: 0,
    });
  }

 
  

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
