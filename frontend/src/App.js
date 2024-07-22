import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ProductForm from "./components/ProductForm";
import RegisterLoginForm from "./components/RegisterLoginForm";
import axios from "axios";
import { SnackbarProvider } from "./context/SnackbarContext";

const App = () => {
  const [token, setToken] = useState("");

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    setAuthToken(newToken);
  };

  return (
    <SnackbarProvider>
      <div className="App">
        <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ height: "100vh" }}>
          <Card sx={{ maxWidth: 545 }}>
            <CardContent>{token ? <ProductForm /> : <RegisterLoginForm setToken={handleTokenChange} />}</CardContent>
          </Card>
        </Box>
      </div>
    </SnackbarProvider>
  );
};

export default App;
