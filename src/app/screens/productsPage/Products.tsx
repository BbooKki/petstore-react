import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { error } from "console";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)), //Step 4: Redux Store ga malumotlarni joylash
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever); //Step 5: Redux Store dan malumotlarni olish selector yordamida
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService(); //Step 1: Backend server data fetch
    product
      .getProducts(
        //Step 2: getProduct method orqali data yig'ib olish

        productSearch
      )
      .then((data) => {
        console.log("Successfully received products:", data);
        setProducts(data);
      }) //Step 3: Redux Store ga yuborish
      .catch((err) =>
        console.error("Failed to fetch products:", {
          error: err,
          searchParams: productSearch,
        })
      );
  }, [productSearch]); //Product searchni qiymati har safar o'zgarganda backenddan malumotlarni olish

  useEffect(() => {
    if (searchText == "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch }); //productSearch obj qiymatlaridan foydalanib yangi reference object hosil etiladi
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    //Pagination orqali page ni o'zgartirish (+1 bilan o'zgarvoti va bu mantiq pastda yozilgan)
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    // Product bosilganda id bilan keyingi routega o'tishi kerek bo'lgan funktsiya
    history.push(`/products/${id}`); // Bu joyda product id olinib keyingi joyga jo'natiladi
  };

  return (
    <div className="products">
      <Container sx={{ width: 1300, marginBottom: "67px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Box className="text-title">Burak Restaurant</Box>
            <Box className="search-box">
              <input
                type="text"
                placeholder="Text here"
                name="singleResearch"
                className="input-text-field"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              {searchText && (
                <ClearIcon
                  onClick={() => setSearchText("")}
                  style={{
                    position: "absolute",
                    right: "110px", // Adjust position based on button width
                    cursor: "pointer",
                    color: "gray",
                  }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                className={"single-button-search"}
                onClick={searchProductHandler}
              >
                Search
                <SearchIcon sx={{ fontSize: 17, marginLeft: "5px" }} />
              </Button>
            </Box>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
              </div>
            </Stack>

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DISH
                      ? product.productVolume + "liter"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt=""
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-price">
                          <img src={"/icons/money.svg"} alt="" />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"} style={{ minWidth: "1300px" }}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Our Family Brands</Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src="/img/gurme.webp" alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src="/img/doner.webp" alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src="/img/seafood.webp" alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src="/img/sweets.webp" alt="" />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"} style={{ minWidth: "1300px" }}>
        <Container>
          <Stack className={"address-area"}>
            <Box className="address-title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2e7d30c3f5a!2sFlinders%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1633023222539!5m2!1sen!2sus"
              height={500}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
