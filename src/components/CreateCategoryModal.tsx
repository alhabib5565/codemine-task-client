/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CommonModal, { TModalOpenProps } from "./CommonModal";
import { Button, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { createCategory } from "@/actions/createCategory";

const CreateCategoryModal = ({ open, setOpen }: TModalOpenProps) => {
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await createCategory({ categoryName });
      if (response?.success) {
        Swal.fire({
          title: "Good job!",
          text: `${response?.message}` || "Image added successfully",
          icon: "success",
        });
        setCategoryName("");
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
    <CommonModal open={open} setOpen={setOpen} title="Create Category">
      <TextField
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        fullWidth
        required
        label="Category Name"
      />
      <Stack direction={"row"} justifyContent="flex-end" mt={2}>
        <Button disabled={!categoryName} onClick={handleSubmit}>
          Create
        </Button>
      </Stack>
    </CommonModal>
  );
};

export default CreateCategoryModal;
