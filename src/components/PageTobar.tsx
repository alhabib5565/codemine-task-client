"use client";

import { Upload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import AddImageModal from "./AddImageModal";

const PageTobar = () => {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(!open);
  };
  return (
    <Stack direction={"row"} justifyContent="flex-end">
      <Button
        onClick={handleModalOpen}
        variant="outlined"
        startIcon={<Upload />}
      >
        Upload
      </Button>
      <AddImageModal open={open} setOpen={setOpen} />
    </Stack>
  );
};

export default PageTobar;
