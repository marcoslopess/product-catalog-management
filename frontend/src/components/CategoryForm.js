import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { TextField, Button, Typography } from "@mui/material";

const CategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { openSnackbar } = useSnackbar();
  const ownerId = localStorage.getItem("ownerId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = { title, description, ownerId };
    try {
      await axios.post("http://localhost:3001/categories", category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      openSnackbar("Category created successfully!", "success");
    } catch (error) {
      openSnackbar("Failed to create category.", "error");
    }
  };

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        Create Category
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
        <Button variant="outlined" type="submit">
          Create Category
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
