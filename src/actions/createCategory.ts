/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export const createCategory = async (data: any) => {
  const response = await fetch(
    "https://codmin-image-gallery-api.vercel.app/api/v1/categories/create-category",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("category");
  return await response.json();
};
