"use client";
import { Box, Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { ChangeEvent } from "react";
type TMeta = { total: number; page: number; limit: number; totalPage: number };
const ProductPagination = ({ meta }: { meta: TMeta }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const parmas = new URLSearchParams(searchParams);
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    parmas.set("page", String(page));
    router.replace(`${pathName}?${parmas.toString()}`);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        onChange={handlePageChange}
        count={meta?.totalPage || 1}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
};

export default ProductPagination;
