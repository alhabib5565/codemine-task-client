import ImageGallery from "@/components/ImageGallery";
import { Navbar } from "@/components/Navbar";
import PageTobar from "@/components/PageTopbar";
import ProductPagination from "@/components/ProductPagination";
import { Container } from "@mui/material";
import React from "react";
type TSearchParams = {
  searchParams: Promise<{
    categoryName: string;
  }>;
};
const Home = async ({ searchParams }: TSearchParams) => {
  const parsms = new URLSearchParams(await searchParams).toString();

  const categoryResponse = await fetch(
    "https://codmin-image-gallery-api.vercel.app/api/v1/categories",
    {
      next: {
        tags: ["category"],
      },
    }
  );

  const categories = await categoryResponse.json();
  const animalResponse = await fetch(
    `https://codmin-image-gallery-api.vercel.app/api/v1/images?${parsms}`,
    {
      next: {
        tags: ["images"],
      },
    }
  );
  const images = await animalResponse.json();
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          my: { xs: 5, md: 10 },
        }}
      >
        <PageTobar categories={categories?.data} />
        <ImageGallery images={images?.data} />
        <ProductPagination meta={images?.meta} />
      </Container>
    </div>
  );
};

export default Home;
