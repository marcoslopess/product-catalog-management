import React from "react";
import Box from "@mui/material/Box";
import { SnackbarProvider } from "./context/SnackbarContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Navigate } from "react-router-dom";
import MenuDrawer from "./components/MenuDrawer";

import RegisterLoginForm from "./components/RegisterLoginForm";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

const App = () => {
  return (
    <Router>
      <SnackbarProvider>
        <div className="App">
          <Routes>
            <Route
              path="/registerLogin"
              element={
                <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ height: "100vh" }}>
                  <PublicRoute>
                    <RegisterLoginForm />
                  </PublicRoute>
                </Box>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <MenuDrawer>
                    <Routes>
                      <Route
                        path="/products"
                        element={
                          <PrivateRoute>
                            <ProductList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/products/new"
                        element={
                          <PrivateRoute>
                            <ProductForm />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/edit-product/:id"
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
                            <CategoryList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/categories/new"
                        element={
                          <PrivateRoute>
                            <CategoryForm />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/edit-category/:id"
                        element={
                          <PrivateRoute>
                            <CategoryForm />
                          </PrivateRoute>
                        }
                      />{" "}
                    </Routes>
                  </MenuDrawer>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/registerLogin" />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
