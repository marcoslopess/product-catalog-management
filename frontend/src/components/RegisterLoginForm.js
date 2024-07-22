import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "../context/SnackbarContext";

const RegisterForm = ({ setToken }) => {
  const { openSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = { name, email, password };
    try {
      const response = await axios.post("http://localhost:3001/auth/register", owner);
      console.log(response.data);
      setToken(response.data.token);
      openSnackbar("Owner registered successfully!", "success");
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

const LoginForm = ({ setToken }) => {
  const { openSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", { email, password });
      console.log(response.data);
      setToken(response.data.token);
      openSnackbar("Login successful!", "success");
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

const RegisterLoginForm = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {isLogin ? <LoginForm setToken={setToken} /> : <RegisterForm setToken={setToken} />}
      <Button variant="contained" onClick={() => setIsLogin(!isLogin)} sx={{ marginTop: "15px" }}>
        {isLogin ? "criar registro" : "fazer login"}
      </Button>
    </Box>
  );
};

export default RegisterLoginForm;
