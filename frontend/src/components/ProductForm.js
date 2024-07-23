import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const ProductForm = () => {
  const { openSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const ownerId = localStorage.getItem("ownerId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { title, description, price, category, ownerId };
    try {
      await axios.post("http://localhost:3001/products", product);
      openSnackbar("Product created successfully!", "success");
    } catch (error) {
      openSnackbar("Failed to create product.", "error");
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Product Catalog
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
          multiline
          rows={4}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Preço"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Categoria"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          disabled
          id="outlined-required"
          label="ID do proprietário"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={ownerId}
        />
        <Button variant="outlined" type="submit">
          <SaveIcon /> Criar Produto
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
