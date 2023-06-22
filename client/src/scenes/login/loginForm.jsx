import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Your email is invalid")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const color = theme.palette.primary.secondary;

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      "http://localhost:3001/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    
    if (loggedInUserResponse.ok) {
      const loggedIn = await loggedInUserResponse.json();
      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    } else {
      // Handle non-200 response here
      console.log(loggedInUserResponse);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  const initialValuesLogin = {
    email: "",
    password: "",
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
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
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <>
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                type="password"
              />

              {/* BOTTONI*/}
              <Box width="93vh">
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "1rem 0",
                    p: "1rem",
                    bgcolor: theme.palette.secondary.light,
                    "&:hover": { color: theme.palette.secondary.main },
                  }}
                >
                  LOGIN
                </Button>
                <Typography
                  onClick={() => {
                    navigate(`/register`);
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: theme.palette.secondary.light,
                    "&:hover": {
                      cursor: "pointer",
                      color: theme.palette.primary[200],
                    },
                  }}
                >
                  You don't have an account?
                </Typography>
              </Box>
            </>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
