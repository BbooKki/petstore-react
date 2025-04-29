import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">200+ </Box>
            <Box className="static-text">Pets </Box>
          </Stack>

          <Divider height="64" width="3" bg="#002a48" />

          <Stack className="static-box">
            <Box className="static-num">15+</Box>
            <Box className="static-text">Breeds</Box>
          </Stack>

          <Divider height="64" width="3" bg="#002a48" />

          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Services</Box>
          </Stack>

          <Divider height="64" width="3" bg="#002a48" />

          <Stack className="static-box">
            <Box className="static-num">1000+</Box>
            <Box className="static-text">Happy Owners</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
