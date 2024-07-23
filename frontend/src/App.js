import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SnackbarProvider } from "./context/SnackbarContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Navigate } from "react-router-dom";

import RegisterLoginForm from "./components/RegisterLoginForm";

import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";

const App = () => {
  return (
    <Router>
      <SnackbarProvider>
        <div className="App">
          <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ height: "100vh" }}>
            <Card sx={{ maxWidth: 545 }}>
              <CardContent>
                <Routes>
                  <Route
                    path="/registerLogin"
                    element={
                      <PublicRoute>
                        <RegisterLoginForm />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <PrivateRoute>
                        <ProductForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <PrivateRoute>
                        <CategoryForm />
                      </PrivateRoute>
                    }
                  />

                  <Route path="/" element={<Navigate to="/registerLogin" />} />
                </Routes>
                {/* {token ? <ProductForm /> : <RegisterLoginForm setToken={handleTokenChange} />} */}
              </CardContent>
            </Card>
          </Box>
        </div>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
