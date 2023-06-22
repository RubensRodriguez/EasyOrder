import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme.js";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./scenes/homepage/index.jsx";
import Layout from "./scenes/layout/index.jsx";
import Register from "./scenes/register/index.jsx";
import Login from "./scenes/login/index.jsx";
import Suppliers from "./scenes/suppliers/index.jsx";
import SupplierDetails from "./scenes/suppliers/supplierDetails.jsx";
import ProductsPage from './scenes/products/index.jsx'

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/suppliers/:id" element={<SupplierDetails />} />
              <Route path="/products" element={<ProductsPage />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
