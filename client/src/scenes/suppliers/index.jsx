import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Rating,
  CardActions,
  Dialog,
  TextField,
} from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../components/Header.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddSupplierPopup, setUser } from "../../state/index";
import AddSupplier from "../../components/AddSupplier";




const Supplier = ({ _id, supplierName, supplierEmail, products, rating }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        marginRight: "1rem",
        marginBottom: "1rem"
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.primary.light}
          gutterBottom
        >
          {_id}
        </Typography>
        <Typography
          sx={{ mb: "0.3rem" }}
          variant="h3"
          component="div"
          color={theme.palette.secondary[400]}
          fontWeight="bold"
        >
          {supplierName}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }} variant="h7" component="div">
          {supplierEmail}
        </Typography>
        <Typography
          sx={{ mb: "1rem" }}
          variant="h5"
          component="div"
          fontWeight={"bold"}
        >
          {products.length} Products listed
        </Typography>
        <Rating value={rating} readOnly />
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              navigate(`/suppliers/${_id}`);
            }}
          >
            SEE MORE
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const Suppliers = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const isNonMobile = useMediaQuery("(min-width: 1000px");
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const filteredSuppliers = user.suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  return (
    <Box ml={"0.5rem"} mr={"0.5rem"}>
      <AddSupplier />
      <FlexBetween>
        <Box display="flex">
          <Header title="SUPPLIERS" subtitle="Your suppliers list" />
          <Box m="1rem" mb="0rem">
            <TextField
              label="Search Supplier"
              variant="outlined"
              size="large"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
        </Box>
        <Button
          sx={{
            fontWeight: "bold",
            marginRight: "1.5rem",
            bgcolor: theme.palette.background.alt,
            "&:hover": { color: theme.palette.secondary.main },
          }}
          onClick={() => dispatch(setAddSupplierPopup())}
        >
          ADD
        </Button>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        ml={"1rem"}
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {filteredSuppliers.map((supplier) => {
          return (
            <Supplier
              key={supplier._id}
              _id={supplier._id}
              supplierName={supplier.supplierName}
              supplierEmail={supplier.supplierEmail}
              products={supplier.products}
              rating={4}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Suppliers;
/**      {user.suppliers.flatMap((supplier) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              position="fixed"
              key={supplier._id}
            >
              <Box
                bgcolor={theme.palette.background.alt}
                p="1rem 0.5rem 1rem 0.5rem"
                m="1rem"
                textAlign={"left"}
                borderRadius="0.5rem"
                key={supplier._id}
              >
                <Button
                  onClick={() => {
                    navigate(`/suppliers/${supplier._id}`);
                  }}
                >
                  Click
                </Button>
              </Box>
            </Box>
          );
        })} */
