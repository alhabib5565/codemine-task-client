import { CloudUpload } from "@mui/icons-material";
import { Box, InputLabel } from "@mui/material";
import React from "react";

const UploadImage = ({
  handleUploadImage,
}: {
  handleUploadImage: (image: File) => void;
}) => {
  console.log("rendr image upload");

  return (
    <Box
      sx={{
        border: "2px dashed #aaa",
        borderRadius: 2,
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputLabel
        htmlFor="image-upload"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            background: "#f5f5f5",
            cursor: "pointer",
          },
        }}
      >
        <CloudUpload fontSize="large" />
      </InputLabel>
      <input
        onChange={(e) => handleUploadImage(e.target.files![0])}
        id="image-upload"
        type="file"
        hidden
      />
    </Box>
  );
};

export default UploadImage;
