import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { openSnackbar } = useSnackbar();
  const [edit, setEdit] = useState(false);
  const [ownerId, setOwnerId] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/categories/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const category = response.data;
          setTitle(category.title);
          setDescription(category.description);
          setOwnerId(category.ownerId);
        } catch (error) {
          openSnackbar("Falha ao buscar categorias.", "error");
        }
      };

      fetchCategory();
    } else {
      setOwnerId(localStorage.getItem("ownerId"));
    }
  }, [id, openSnackbar]);

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const category = { title, description, ownerId };
    try {
      await axios.post("http://localhost:3001/categories", category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      openSnackbar("Categoria criada com sucesso!", "success");
      navigate("/categories");
    } catch (error) {
      openSnackbar("Falha ao criar categoria.", "error");
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const updateCategory = { title, description };
    try {
      await axios.put(`http://localhost:3001/categories/${id}`, updateCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      openSnackbar("Categoria atualizada com sucesso!", "success");
      navigate("/categories");
    } catch (error) {
      openSnackbar("Falha ao atualizar categoria.", "error");
    }
  };

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {edit ? "Editar" : "Criar"} Categoria
      </Typography>
      <form
        onSubmit={edit ? handleSubmitUpdate : handleSubmitCreate}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          required
          id="outlined-required"
          label="Titulo"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Descrição"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          disabled
          id="outlined-required"
          label="ID do proprietário"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={ownerId}
        />
        <Button variant="outlined" type="submit" sx={{ marginBottom: "15px" }}>
          {edit ? "Salvar" : "Criar"} Categoria
        </Button>
        <Button variant="contained" onClick={() => navigate(`/categories`)}>
          Voltar
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
