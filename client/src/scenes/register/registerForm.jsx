import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Your email is invalid")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Passwords must match")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const color = theme.palette.primary.secondary;

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://192.168.1.18:3001/api/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (savedUserResponse.ok) {
      const savedUser = await savedUserResponse.json();
      console.log(savedUser);
      onSubmitProps.resetForm();
      navigate("/login");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  const initialValuesRegister = {
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.secondName}
                name="secondName"
                error={
                  Boolean(touched.secondName) && Boolean(errors.secondName)
                }
                helperText={touched.secondName && errors.secondName}
                sx={{ gridColumn: "span 2" }}
              />
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
                sx={{ gridColumn: "span 2" }}
                type="password"
              />
              <TextField
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
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
                  REGISTER
                </Button>
                <Typography
                  onClick={() => {
                    navigate(`/login`);
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
                  Already have an account?
                </Typography>
              </Box>
            </>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
