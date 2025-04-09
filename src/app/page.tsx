import { Navbar } from "@/components/Navbar";
import PageTobar from "@/components/PageTobar";
import { Container } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          my: { xs: 5, md: 10 },
        }}
      >
        <PageTobar />
      </Container>
    </div>
  );
};

export default Home;
