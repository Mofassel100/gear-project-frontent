"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

type UserState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: Record<string, unknown>;
} | null;

export const updateUser = async (
  userId: string,
  prevState: UserState,
  formData: FormData,
): Promise<UserState> => {
  try {
    const status = formData.get("status");
console.log(status, userId)
    if (!userId) {
      return {
        success: false,
        statusCode: 400,
        message: "User ID is required",
      };
    }

    if (
      status !== "ACTIVE" &&
      status !== "SUSPENDED"
    ) {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid user status",
      };
    }

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized. Please login again.",
      };
    }

    const payload = {
      status,
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message:
          result?.message || "Failed to update user",
        data: result?.data || {},
      };
    }

    return {
      success: true,
      statusCode: res.status,
      message:
        result?.message || "User updated successfully",
      data: result?.data || {},
    };
  } catch (error) {
    console.error("Update user error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong while updating user",
    };
  }
};