"use client";
import { deleteImage } from "@/actions/image";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const ImageDeleteBtn = ({ id }: { id: string }) => {
  const handleDeleteImage = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteImage(id);
        Swal.fire({
          title: "Deleted!",
          text: response?.message || "The image has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <IconButton
      onClick={handleDeleteImage}
      size="small"
      color="error"
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <Delete fontSize="small" />
    </IconButton>
  );
};

export default ImageDeleteBtn;
