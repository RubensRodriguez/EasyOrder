import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { useTheme } from "@mui/material/styles";
import { tokensDark, tokensLight } from "../../theme";
import * as yup from "yup";
import LoginForm from './loginForm.jsx'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const theme = useTheme();
  const color = theme.palette.primary.secondary;
  const token = useSelector((state) => state.token)
  const isNotLoggedIn = token === null;
  if (!isNotLoggedIn) {
    return <Navigate to="/home" replace />;
  }


  return (
    <>
      <Box textAlign={"center"} padding={"1%"}>
        <Typography
          color={theme.palette.secondary.main}
          variant="h2"
          fontWeight="bold"
        >
          EASYORDER
        </Typography>
      </Box>
      <Box
        width="50%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        textAlign={"center"}
      >
        <Typography variant="h4" fontWeight="bold" pb={"2rem"}>
          Login to start
        </Typography>
        <LoginForm></LoginForm>
      </Box>
    </>
  );
};

export default Login;
