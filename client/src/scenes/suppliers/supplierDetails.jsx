import { useTheme } from "@emotion/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Rating,
  TextField,
  Dialog,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  setAddProductPopup,
  setRemoveSupplierPopup,
  setModifySupplierPopup,
  setModifyProductPopup,
  setRemoveProductPopup,
  setUser,
} from "../../state/index";
import AddProduct from "../../components/AddProduct";
import RemoveSupplier from "../../components/RemoveSupplier";
import ModifySupplier from "../../components/ModifySupplier";
import { DataGrid } from "@mui/x-data-grid";

const Product = ({ supplier }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 180 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "measure", headerName: "Measure", width: 150 },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => <Rating value={4} readOnly />,
    },
    {
      field: "button",
      headerName: "Modify",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => dispatch(setModifyProductPopup())}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => dispatch(setRemoveProductPopup())}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = supplier.products.map((product) => ({
    id: product._id,
    name: product.productName,
    price: product.productPrice,
    measure: product.productMeasure,
  }));

  return (
    <Box mr="0.5rem">
      <DataGrid disableRowSelectionOnClick rows={rows} columns={columns} />
    </Box>
  );
};

const SupplierDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const supplier = user.suppliers.find((supplier) => supplier._id === id);

  const dispatch = useDispatch();

  if (!supplier) {
    return <div>Supplier not found</div>;
  }

  return (
    <Box ml="0.5rem">
      <AddProduct id={id} />
      <RemoveSupplier supplier={supplier} id={id} />
      <ModifySupplier supplier={supplier} id={id} />
      <FlexBetween>
        <Box>
          <Header
            title={supplier.supplierName}
            subtitle={
              <Typography>{supplier.products.length} Products</Typography>
            }
          />
          <Box ml="1rem">
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.primary.light}
              gutterBottom
            >
              {supplier._id}
            </Typography>
            <Rating value={4} readOnly />
            <Typography sx={{ mb: "0.5rem" }} variant="h7" component="div">
              {supplier.supplierEmail}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            onClick={() => dispatch(setModifySupplierPopup())}
            sx={{
              fontWeight: "bold",
              marginRight: "1.5rem",
              bgcolor: theme.palette.background.alt,
              "&:hover": { color: theme.palette.secondary.main },
            }}
          >
            MODIFY
          </Button>
          <Button
            onClick={() => dispatch(setRemoveSupplierPopup())}
            sx={{
              fontWeight: "bold",
              marginRight: "1.5rem",
              bgcolor: theme.palette.background.alt,
              "&:hover": { color: theme.palette.secondary.main },
            }}
          >
            DELETE
          </Button>
          <Button
            onClick={() => dispatch(setAddProductPopup())}
            sx={{
              fontWeight: "bold",
              marginRight: "1.5rem",
              bgcolor: theme.palette.background.alt,
              "&:hover": { color: theme.palette.secondary.main },
            }}
          >
            ADD PRODUCT
          </Button>
        </Box>
      </FlexBetween>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
          fontWeight="bold"
        sx={{ mb: "1rem", mt: "1rem"}}
      >
        {supplier.supplierName + "'s products"}
      </Typography>
      <Product supplier={supplier} />
    </Box>
  );
};

export default SupplierDetails;
