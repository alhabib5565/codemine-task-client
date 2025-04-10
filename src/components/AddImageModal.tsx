"use client";
import * as React from "react";
import CommonModal, { TCommonModalOpenProps } from "./CommonModal";
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
const top100Films = ["habib", "fahim", "netun", "imran"];

type TImageData = {
  title: string;
  category: string;
  tags: string[];
  images: File[];
};

const AddImageModal = ({ open, setOpen }: TCommonModalOpenProps) => {
  const [newTag, setNewTag] = React.useState("");
  const [imageData, setImageData] = React.useState<TImageData>({
    title: "",
    category: "",
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

  return (
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
          value={imageData.category}
          onChange={(e, newValue) =>
            handleInputChange(newValue as string, "category")
          }
          disablePortal
          options={top100Films}
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
              required
              label="tag"
            />
            <Button onClick={handleAddTag}>Add</Button>
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
      </Stack>
    </CommonModal>
  );
};

export default AddImageModal;
