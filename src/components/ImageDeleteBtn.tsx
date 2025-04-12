"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const ImageDeleteBtn = ({ index }: { index: number }) => {
  return (
    <IconButton
      onClick={() => console.log(index)}
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
