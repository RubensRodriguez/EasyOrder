import React from "react";
import * as yup from "yup";
import { setModifySupplierPopup, setUser } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "./Header";

const modifySupplierSchema = yup.object().shape({
  supplierName: yup.string().required("Supplier name is required"),
  supplierEmail: yup
    .string()
    .email("Invalid email address")
    .required("Supplier email is required"),
  supplierPhoneNumber: yup.number(),
});

const ModifySupplier = ({ supplier, id }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAddPopupOpen = useSelector((state) => state.modifySupplierPopup);
  const initialValuesSupplier = {
    supplierName: supplier.supplierName,
    supplierEmail: supplier.supplierEmail,
    supplierPhoneNumber: supplier.supplierPhoneNumber,
  };
  const modifySupplier = async (values, onSubmitProps, user, id) => {
    const modifySupplierResponse = await fetch(
      "http://localhost:3001/api/supplier/modify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          supplierName: values.supplierName,
          supplierEmail: values.supplierEmail,
          supplierPhoneNumber: values.supplierPhoneNumber,
          user: user,
        }),
      }
    );
    if (modifySupplierResponse.ok) {
      const newUser = await modifySupplierResponse.json();
      dispatch(
        setUser({
          user: newUser.user,
        })
      );
      dispatch(setModifySupplierPopup());
    } else {
      console.log(modifySupplierResponse.json());
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await modifySupplier(values, onSubmitProps, user, id);
  };
  return (
    <Dialog
      open={isAddPopupOpen}
      onClose={() => dispatch(setModifySupplierPopup())}
      sx={{
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      <Box bgcolor={theme.palette.background.alt} border={"2px solid"}>
        <Box>
          <Header title="Modify supplier" subtitle="" paddingBottom="5rem" />
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
            validationSchema={modifySupplierSchema}
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
                    MODIFY
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

export default ModifySupplier;
