import React from "react";
import { Box, Button, Container, Stack} from "@mui/material";
import { Link } from "react-router-dom";
import {Grid2 } from"@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewPets } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductSize} from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const newPetsRetriever = createSelector(retrieveNewPets, (newPets) => ({
  newPets,
})); //Selector

export default function NewPets() {
  const { newPets } = useSelector(newPetsRetriever);

  console.log("newPets:", newPets);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Stack className={"category-title"} flexDirection={"row"}>
            <Stack flexDirection={"column"}>
              <Box className={"new-products-title"}>What's new?</Box>
              <Typography className={"new-products-sub-title"}>Take A Look At Our New Pets!</Typography>
            </Stack>
            <Link to="/products" className="new-products-link">View More </Link>
          </Stack>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newPets.length !== 0 ? (
                 <div className="product-wrapper">
                    {newPets.map((product: Product) => {
                      const imagePath = `${serverApi}/${product.productImages[0]}`;
                      return (
                        <div key={product._id} className="product-card">
                          <Card
                            key={product._id}
                            variant="outlined"
                            className={"card"}
                          >
                            <CardOverflow>
                              <div className="product-sale">{ product.productCollection}</div>
                              <AspectRatio ratio={"1"} sx={{ padding: "5px", borderRadius: "10px" }}>
                                <img src={imagePath} alt=""  />
                              </AspectRatio>
                            </CardOverflow>

                            <CardOverflow variant="soft" className="product-detail">
                              <Stack className="info">
                                <Stack flexDirection={"column"} borderLeft={"1px solid "}>
                                  <Typography className={"title"}>
                                    {product.productName}
                                  </Typography>
                                  {/* <Divider width="1" height="24" bg="grey" /> */}
                                  <Typography className={"price"}>
                                  ₩{product.productPrice}
                                  </Typography>
                                </Stack>
                                <Stack>
                                  <Typography className={"views"}>
                                    <VisibilityIcon
                                      sx={{ fontSize: 20, marginRight: "3px" }}
                                    />
                                    {product.productViews}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </CardOverflow>
                          </Card>
                        </div>
                      );
                    } )}
                  </div>
                ) : (
                <Box className="no-data">New Prodcuts are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
