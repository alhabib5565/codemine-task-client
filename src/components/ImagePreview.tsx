import { CancelOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

type TImagePreviewProps = {
  image: File;
  handleDelteImage: (i: number, fieldName: "images") => void;
  index: number;
};
const ImagePreview = ({
  image,
  index,
  handleDelteImage,
}: TImagePreviewProps) => {
  console.log("rendr image previewr");
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        border: "1px solid #ccc",
        boxShadow: 1,
        overflow: "hidden",
        width: "100%",
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={URL.createObjectURL(image)}
        alt=""
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        fill
      />
      <IconButton
        onClick={() => handleDelteImage(index, "images")}
        color="error"
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CancelOutlined />
      </IconButton>
    </Box>
  );
};

export default ImagePreview;
