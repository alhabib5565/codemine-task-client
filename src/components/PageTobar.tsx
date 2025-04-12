"use client";

import { Add, Upload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import AddImageModal from "./AddImageModal";
import CreateCategoryModal from "./CreateCategoryModal";
export type TCategory = {
  categoryName: string;
};
const PageTobar = ({ categories }: { categories: TCategory[] }) => {
  const [ImageUploadOpen, setImageUploadOpen] = useState(false);
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const handleImageUploadModalOpen = () => {
    setImageUploadOpen(!ImageUploadOpen);
  };

  const handleCreateCategoryModalOpen = () => {
    setCreateCategoryModalOpen(!createCategoryModalOpen);
  };
  return (
    <Stack direction={"row"} justifyContent="flex-end" spacing={2}>
      <Button
        onClick={handleImageUploadModalOpen}
        variant="outlined"
        startIcon={<Upload />}
      >
        Upload
      </Button>
      <Button onClick={handleCreateCategoryModalOpen} startIcon={<Add />}>
        Create Category
      </Button>
      <AddImageModal
        open={ImageUploadOpen}
        setOpen={setImageUploadOpen}
        categories={categories}
      />
      <CreateCategoryModal
        open={createCategoryModalOpen}
        setOpen={setCreateCategoryModalOpen}
      />
    </Stack>
  );
};

export default PageTobar;
