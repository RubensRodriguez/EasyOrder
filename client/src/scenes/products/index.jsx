import { useTheme } from "@emotion/react";
import { Typography, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";


const ProductsPage = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  return (
    <Box ml="0.5rem">
      <Header title="PRODUCTS" subtitle="Your products list" />
      <Typography>{user.firstName}</Typography>
      {user.suppliers.map((supplier) =>
        supplier.products.map((product) => (
          <Typography key={product.productId}>{product.productName}</Typography>
        ))
      )}
    </Box>
  );
};

export default ProductsPage;
