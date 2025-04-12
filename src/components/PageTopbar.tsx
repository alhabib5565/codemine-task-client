"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Add, Upload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import AddImageModal from "./AddImageModal";
import CreateCategoryModal from "./CreateCategoryModal";
export type TCategory = {
  categoryName: string;
};
const PageTopbar = ({ categories }: { categories: TCategory[] }) => {
  const [ImageUploadOpen, setImageUploadOpen] = useState(false);
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const handleImageUploadModalOpen = () => {
    setImageUploadOpen(!ImageUploadOpen);
  };

  const handleCreateCategoryModalOpen = () => {
    setCreateCategoryModalOpen(!createCategoryModalOpen);
  };

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    params.set("categoryName", newValue);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="flex-end"
      spacing={2}
      mb={3}
    >
      {/* tab for fillter by category */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={params.get("categoryName") || ""}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="wrapped label tabs example"
        >
          {categories?.map((category, i) => (
            <Tab
              key={i}
              value={category.categoryName}
              label={category.categoryName}
            />
          ))}
        </Tabs>
      </Box>
      {/* category and upload image button */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={handleImageUploadModalOpen}
          variant="outlined"
          startIcon={<Upload />}
        >
          Upload
        </Button>
        <Button
          sx={{ whiteSpace: "nowrap" }}
          onClick={handleCreateCategoryModalOpen}
          startIcon={<Add />}
        >
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
      </Box>
    </Stack>
  );
};

export default PageTopbar;
