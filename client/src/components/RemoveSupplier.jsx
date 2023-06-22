import React from "react";
import { setUser, setRemoveSupplierPopup } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

import { Box, Typography, Dialog, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RemoveSupplier = ({ supplier, id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isAddPopupOpen = useSelector((state) => state.removeSupplierPopup);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const removeSupplier = async (id, user) => {
    const removeSupplierResponse = await fetch(
      "http://localhost:3001/api/supplier/remove",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          user: user,
        }),
      }
    );

    if (removeSupplierResponse.ok) {
      const newUser = await removeSupplierResponse.json();
      navigate(`/suppliers`);
      dispatch(
        setUser({
          user: newUser.user,
        })
      );
      dispatch(setRemoveSupplierPopup());
    } else {
      console.log(removeSupplierResponse.json());
    }
  };

  return (
    <Dialog
      open={isAddPopupOpen}
      onClose={() => dispatch(setRemoveSupplierPopup())}
      sx={{
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      <Box
        bgcolor={theme.palette.background.alt}
        border={"2px solid"}
        space-between={"center"}
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box m="1rem" mb="1rem">
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Do you want to delete {supplier.supplierName}?
          </Typography>
          <Box
            space-between={"center"}
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
            mt={"1rem"}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                removeSupplier(id, user);
              }}
              sx={{
                fontWeight: "bold",
                marginRight: "1.5rem",
                bgcolor: theme.palette.background.alt,
                "&:hover": { color: theme.palette.secondary.main },
              }}
            >
              Yes
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => dispatch(setRemoveSupplierPopup())}
              sx={{
                fontWeight: "bold",
                marginRight: "1.5rem",
                bgcolor: theme.palette.background.alt,
                "&:hover": { color: theme.palette.secondary.main },
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RemoveSupplier;
