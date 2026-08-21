/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
export const allRentalsFromDB = async (
) => {
  const accessToken = await isAccessTokenExist()
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
   
  });
  const result = await res.json();
  return result;
};



