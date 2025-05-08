import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Advertisement() {
  return (
    <Container>
      <Stack className="ads-img-frame" flexDirection={"column"}>
        <Box className="ads-title">One more friend</Box>
        <Box className="ads-sub-title">Thousands more fun!</Box>
        <Box className="ads-text">Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!</Box>
        <Link to="/products" className="ads-button">Explore Now</Link>
      </Stack>
    </Container>
  );
}
