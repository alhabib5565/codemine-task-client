"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImageDeleteBtn from "./ImageDeleteBtn";
import { TImage } from "@/type/common.type";
import ImageDetailsModal from "./ImageDetailsModal";

const ImageGallery = ({ images }: { images: TImage[] }) => {
  const [imgForShowDetails, setImgForShowDetails] = useState<TImage | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (image: TImage) => {
    setOpen(true);
    setImgForShowDetails(image);
  };

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card sx={{ position: "relative" }}>
            <ImageDeleteBtn id={image._id} />
            <CardActionArea onClick={() => handleClickOpen(image)}>
              <CardMedia
                component="img"
                height="200"
                image={
                  image.imageUrl.slice(0, 50) +
                  "w_300,h_200,c_fill,q_auto,f_auto,g_face/" +
                  image.imageUrl.slice(50)
                }
                alt={`Image ${index + 1}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {image?.title || "No caption"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      {imgForShowDetails && open && (
        <ImageDetailsModal
          imageData={imgForShowDetails}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Grid>
  );
};

export default ImageGallery;
