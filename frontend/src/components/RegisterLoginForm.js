import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RegisterForm = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = { name, email, password };
    try {
      const response = await axios.post("http://localhost:3001/auth/register", owner);
      const { token } = response.data;
      localStorage.setItem("token", token);
      var decoded = jwtDecode(token);
      localStorage.setItem("ownerId", decoded.id);
      localStorage.setItem("name", decoded.name);
      openSnackbar("Owner registered successfully!", "success");
      navigate("/products");
    } catch (error) {
      console.error(error);
      openSnackbar("Failed to register owner.", "error");
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          required
          id="outlined-required"
          label="Name"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <TextField
          required
          id="outlined-required"
          label="Email"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          type="password"
          label="Password"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Registrar
        </Button>
      </form>
    </>
  );
};

const LoginForm = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", { email, password });
      const { token } = response.data;
      var decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("ownerId", decoded.id);
      localStorage.setItem("name", decoded.name);
      openSnackbar("Login successful!", "success");
      navigate("/products");
    } catch (error) {
      console.error(error);
      openSnackbar("Failed to login.", "error");
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          type="password"
          label="Password"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outlined" type="submit">
          Logar
        </Button>
      </form>
    </>
  );
};

const RegisterLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <Button variant="contained" onClick={() => setIsLogin(!isLogin)} sx={{ marginTop: "15px" }}>
        {isLogin ? "criar registro" : "fazer login"}
      </Button>
    </Box>
  );
};

export default RegisterLoginForm;
