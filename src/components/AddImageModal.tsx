/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import CommonModal, { TModalOpenProps } from "./CommonModal";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import UploadImage from "./UploadImage";
import ImagePreview from "./ImagePreview";
import { TCategory } from "./PageTopbar";
import { createImage } from "@/actions/image";
import Swal from "sweetalert2";

type TImageData = {
  title: string;
  categoryName: string;
  tags: string[];
  images: File[];
};

const AddImageModal = ({
  open,
  setOpen,
  categories,
}: TModalOpenProps & { categories: TCategory[] }) => {
  const [newTag, setNewTag] = React.useState("");

  const [imageData, setImageData] = React.useState<TImageData>({
    title: "",
    categoryName: "",
    tags: [],
    images: [],
  });

  const handleInputChange = (value: string, fieldName: string) => {
    setImageData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleAddTag = () => {
    setImageData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setNewTag("");
  };

  const handleUploadImage = (image: File) => {
    setImageData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
  };

  const handleDeleteImageOrTag = React.useCallback(
    (index: number, fieldName: "tags" | "images") => {
      const remainingImages = imageData[fieldName].filter(
        (item: File | string, i: number) => i !== index
      );
      setImageData((prev) => ({ ...prev, [fieldName]: remainingImages }));
    },
    [imageData]
  );

  const handleSubmit = async () => {
    const { images, ...remainingData } = imageData;
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("data", JSON.stringify(remainingData));

    try {
      const response = await createImage(formData);
      if (response?.success) {
        Swal.fire({
          title: "Good job!",
          text: `${response?.message}` || "Image added successfully",
          icon: "success",
        });
        setImageData({ title: "", categoryName: "", tags: [], images: [] });
        setOpen(false);
      } else {
        Swal.fire({
          title: "Error",
          text: `${response?.message}` || "something went wrong",
          icon: "error",
        });
        console.log(response?.message || "something went wrong");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: `${error?.message}` || "something went wrong",
        icon: "error",
      });
      console.log(error?.message || "something went wrong");
      // reset();
    }
  };

  return (
    <>
      <CommonModal open={open} setOpen={setOpen} title="Add Image into gallery">
        <Stack direction="column" spacing={2}>
          <TextField
            value={imageData.title}
            onChange={(e) => handleInputChange(e.target.value, "title")}
            fullWidth
            required
            label="Title"
          />
          <Autocomplete
            value={imageData.categoryName}
            onChange={(e, newValue) =>
              handleInputChange(newValue as string, "categoryName")
            }
            disablePortal
            options={categories?.map((category) => category.categoryName)}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Box>
            <Stack direction="row" gap={2} flexWrap={"wrap"}>
              {imageData.tags.map((tag, i) => (
                <Typography
                  variant="body1"
                  sx={{
                    background: "#f5f5f5",
                    borderRadius: 5,
                    px: 2,
                    py: 0.5,
                    position: "relative",
                  }}
                  key={i}
                >
                  {tag}
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteImageOrTag(i, "tags")}
                    color="error"
                    sx={{ position: "absolute", top: -12, right: -12 }}
                  >
                    <CancelOutlined />
                  </IconButton>
                </Typography>
              ))}
            </Stack>
            <Stack direction="row" gap={1}>
              <TextField
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                fullWidth
                label="tag"
              />
              <Button disabled={!newTag} onClick={handleAddTag}>
                Add
              </Button>
            </Stack>
          </Box>
          {/* Images here */}
          <Grid container spacing={2}>
            {/* show image preview */}
            {imageData.images.map((image, i) => (
              <Grid size={{ sm: 4, md: 2 }} key={i}>
                <ImagePreview
                  image={image}
                  index={i}
                  handleDelteImage={handleDeleteImageOrTag}
                />
              </Grid>
            ))}
            {/* add image input field*/}
            <Grid size={{ sm: 4, md: 2 }}>
              <UploadImage handleUploadImage={handleUploadImage} />
            </Grid>
          </Grid>
          <Stack direction={"row"} justifyContent="flex-end">
            <Button
              disabled={
                !imageData.title ||
                imageData.images.length < 1 ||
                !imageData.categoryName
              }
              onClick={handleSubmit}
            >
              Create Image
            </Button>
          </Stack>
        </Stack>
      </CommonModal>
    </>
  );
};

export default AddImageModal;
