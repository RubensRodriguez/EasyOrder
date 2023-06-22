import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAddProductPopup } from "../state/index";
import Header from "./Header";

const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  productPrice: yup.string().required("Supplier email is required"),
  productCategory: yup.string().required("Product category is required"),
  productMeasure: yup.string().required("Product measure is required"),
  productDescription: yup.string(),
});

const AddProduct = ({id}) => {
  const user = useSelector((state) => state.user);
  const isAddPopupOpen = useSelector((state) => state.addProductPopup);
  const theme = useTheme();

  const dispatch = useDispatch();

  const addProduct = async (values, onSubmitProps, user, id) => {
    const addProductResponse = await fetch(
      "http://localhost:3001/api/product/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: values.productName,
          productPrice: values.productPrice,
          productCategory: values.productCategory,
          productMeasure: values.productMeasure,
          productDescription: values.productDescription,
          user: user,
          id: id,
        }),
      }
    );

    if (addProductResponse.ok) {
      const newUser = await addProductResponse.json();
      dispatch(
        setUser({
          user: newUser.user,
        })
      );
      dispatch(setAddProductPopup()); //
    } else {
      console.log(addProductResponse.json());
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    await addProduct(values, onSubmitProps, user, id);
    console.log("ciao");
  };

  const initialValuesProduct = {
    productName: "",
    productPrice: "",
    productCategory: "",
    productMeasure: "",
    productDescription: "",
  };
  return (
    <Dialog
      open={isAddPopupOpen}
      onClose={() => dispatch(setAddProductPopup())}
      sx={{
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      <Box bgcolor={theme.palette.background.alt} border={"2px solid"}>
        <Box>
          <Header title="Add a product" subtitle="" paddingBottom="5rem" />
        </Box>
        <Box
          marginRight={"1rem"}
          marginLeft={"1rem"}
          bgcolor={theme.palette.background.alt}
          paddingTop={"1rem"}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesProduct}
            validationSchema={productSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(4, minmax(0,1fr)"
                >
                  <TextField
                    label="Product name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productName}
                    name="productName"
                    error={
                      Boolean(touched.productName) &&
                      Boolean(errors.productName)
                    }
                    helperText={touched.productName && errors.productName}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Product Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productPrice}
                    name="productPrice"
                    error={
                      Boolean(touched.productPrice) &&
                      Boolean(errors.productPrice)
                    }
                    helperText={touched.productPrice && errors.productPrice}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl sx={{ gridColumn: "span 4" }}>
                    <InputLabel id="measure" sx={{ gridColumn: "span 4" }}>
                      Product measure
                    </InputLabel>
                    <Select
                      id="measure"
                      value={values.productMeasure}
                      label="productMeasure"
                      onChange={handleChange}
                      name="productMeasure"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value={"Kg"}>Kg</MenuItem>
                      <MenuItem value={"Lt"}>Lt</MenuItem>
                      <MenuItem value={"Package"}>Package</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 4" }}>
                    <InputLabel id="category" sx={{ gridColumn: "span 4" }}>
                      Product category
                    </InputLabel>
                    <Select
                      id="category"
                      value={values.productCategory}
                      label="productCategory"
                      onChange={handleChange}
                      name="productCategory"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value={"Fish"}>Fish</MenuItem>
                      <MenuItem value={"Meat"}>Meat</MenuItem>
                      <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
                      <MenuItem value={"Canned food"}>Canned food</MenuItem>
                      <MenuItem value={"Freezed"}>Freezed</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Product description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productDescription}
                    name="productDescription"
                    error={
                      Boolean(touched.productDescription) &&
                      Boolean(errors.productDescription)
                    }
                    helperText={
                      touched.productDescription && errors.productDescription
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box
                  width={"100%"}
                  display={"flex"}
                  alignContent={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mt={"1rem"}
                  mb={"1rem"}
                >
                  <Button size="large" onClick={handleSubmit}>
                    ADD
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddProduct;
