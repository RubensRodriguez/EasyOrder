import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, TextField, Rating } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAddSupplierPopup } from "../state/index";
import Header from "./Header";


const supplierSchema = yup.object().shape({
  supplierName: yup.string().required("Supplier name is required"),
  supplierEmail: yup
    .string()
    .email("Invalid email address")
    .required("Supplier email is required"),
  supplierPhoneNumber: yup.number(),
  rating: yup.number().required("Rating is required")
});

const AddSupplier = () => {
  const initialValuesSupplier = {
    supplierName: "",
    supplierEmail: "",
    supplierPhoneNumber: "",
    rating: 0,
  };
  /*  const userProducts = user.suppliers.flatMap((supplier) => supplier.products);
    return userProducts.map((product) => {
      return <Typography key={product.productName}>{product.productName} {product.productPrice}</Typography>;
    }); */

  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const isAddPopupOpen = useSelector((state) => state.addSupplierPopup)

  const addSupplier = async (values, onSubmitProps, user) => {
    const addSupplierResponse = await fetch(
      "http://localhost:3001/api/supplier/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierName: values.supplierName,
          supplierEmail: values.supplierEmail,
          supplierPhoneNumber: values.supplierPhoneNumber,
          rating: values.rating,
          user: user,
        }),
      }
    );

    if (addSupplierResponse.ok) {
      const newUser = await addSupplierResponse.json();
      console.log(newUser);

      dispatch(
        setUser({
          user: newUser.user,
        })
      );
      dispatch(setAddSupplierPopup());
    } else {
      console.log(addSupplierResponse.json());
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addSupplier(values, onSubmitProps, user);
  };
  return (
    <Dialog
      open={isAddPopupOpen}
      onClose={() => dispatch(setAddSupplierPopup())}
      sx={{
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      <Box bgcolor={theme.palette.background.alt} border={"2px solid"}>
        <Box>
          <Header title="Add a supplier" subtitle="" paddingBottom="5rem" />
        </Box>
        <Box
          marginRight={"1rem"}
          marginLeft={"1rem"}
          bgcolor={theme.palette.background.alt}
          paddingTop={"1rem"}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesSupplier}
            validationSchema={supplierSchema}
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
                    label="Supplier name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.supplierName}
                    name="supplierName"
                    error={
                      Boolean(touched.supplierName) &&
                      Boolean(errors.supplierName)
                    }
                    helperText={touched.supplierName && errors.supplierName}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Supplier email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.supplierEmail}
                    name="supplierEmail"
                    error={
                      Boolean(touched.supplierEmail) &&
                      Boolean(errors.supplierEmail)
                    }
                    helperText={touched.supplierEmail && errors.supplierEmail}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Supplier phone number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.supplierPhoneNumber}
                    name="supplierPhoneNumber"
                    error={
                      Boolean(touched.supplierPhoneNumber) &&
                      Boolean(errors.supplierPhoneNumber)
                    }
                    helperText={
                      touched.supplierPhoneNumber && errors.supplierPhoneNumber
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Rating
                    name="simple-controlled"
                    value={values.rating}
                    size="large"
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

export default AddSupplier;
