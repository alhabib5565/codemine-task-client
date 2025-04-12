"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryTabs = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    params.set("sort", newValue);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs
        value={params.get("sort") || "createdAt"}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="wrapped label tabs example"
      >
        <Tab value="createdAt" label="Newest First" />
        <Tab value="price" label="Price -- Low to High" />
        <Tab value="-price" label="Price -- High to Low" />
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;
