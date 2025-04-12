/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export const createImage = async (data: any) => {
  const response = await fetch(
    "https://codmin-image-gallery-api.vercel.app/api/v1/images/create-image",
    // "http://localhost:5000/api/v1/animals/create-animal",
    {
      method: "POST",
      body: data,
    }
  );
  revalidateTag("images");
  return await response.json();
};

export const deleteImage = async (id: any) => {
  const response = await fetch(
    `https://codmin-image-gallery-api.vercel.app/api/v1/images/${id}`,
    {
      method: "DELETE",
    }
  );
  revalidateTag("images");
  return await response.json();
};
