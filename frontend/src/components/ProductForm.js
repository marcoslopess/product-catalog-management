import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { openSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [version, setVersion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const ownerId = localStorage.getItem("ownerId");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const product = response.data;
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setSelectedCategory(product.categoryId);
          setVersion(product.version);
        } catch (error) {
          openSnackbar("Falha ao buscar produtos.", "error");
        }
      };

      fetchProduct();
    }
  }, [id, openSnackbar]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(categoriesResponse.data);
      } catch (error) {
        openSnackbar("Falha ao buscar categorias.", "error");
      }
    };

    fetchCategories();
  }, [openSnackbar]);

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const product = { title, description, price, categoryId: selectedCategory, ownerId, version };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/products`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      openSnackbar("Produto criado com sucesso!", "success");
      navigate("/products");
    } catch (error) {
      openSnackbar("Falha ao criar produto.", "error");
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = { title, description, price, categoryId: selectedCategory, version };
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      openSnackbar("Produto atualizado com sucesso!", "success");
      navigate("/products");
    } catch (error) {
      openSnackbar("Falha ao atualizar produto.", "error");
    }
  };

  return (
    <div style={{ paddingLeft: "25vw", paddingRight: "25vw", height: "80vh" }}>
      <Typography gutterBottom variant="h5" component="div">
        {edit ? "Editar" : "Criar"} Produto
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
          select
          label="Categoria"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <MenuItem value={null} sx={{ color: "transparent" }}>
            <em>Selecione uma categoria</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          disabled
          id="outlined-required"
          label="ID do proprietário"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={ownerId}
        />
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
            <SaveIcon sx={{ marginRight: "5px" }} /> {edit ? "Salvar" : "Criar"}
          </Button>
          <Button variant="contained" onClick={() => navigate(`/products`)}>
            <ArrowBackIcon sx={{ marginRight: "5px" }} /> Voltar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
