/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { isAccessTokenExist } from "@/service/refreshToken";
type GearCategoryState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};
type RentaleState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};
export  const getGearCategory = async (
) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`);

  const result = await res.json();
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
  console.log({
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    
  });

  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
  };

  const accessToken = await  isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
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
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
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

