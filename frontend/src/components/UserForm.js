import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, MenuItem, Select, TextField, InputLabel, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const UserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/owners/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        openSnackbar("Falha ao buscar usuário.", "error");
      }
    };

    fetchUser();
  }, [id, openSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/owners/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      openSnackbar("Role do usuário atualizada com sucesso!", "success");
      navigate("/users");
    } catch (error) {
      openSnackbar("Falha ao atualizar role do usuário.", "error");
    }
  };

  if (!user) return null;

  return (
    <div style={{ paddingLeft: "25vw", paddingRight: "25vw", height: "80vh" }}>
      <Typography gutterBottom variant="h5" component="div">
        Editar Perfil do Usuário
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          disabled
          id="outlined-required"
          label="Titulo"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={user.name}
        />
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "25%",
            paddingRight: "25%",
            marginTop: "15px",
          }}
        >
          <Button variant="outlined" type="submit" sx={{ marginBottom: "15px" }}>
            <SaveIcon sx={{ marginRight: "5px" }} />
            Salvar
          </Button>
          <Button variant="contained" onClick={() => navigate(`/users`)}>
            <ArrowBackIcon sx={{ marginRight: "5px" }} /> Voltar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
