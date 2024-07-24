import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        openSnackbar("Falha ao buscar produtos.", "error");
      }
    };

    fetchProducts();
  }, [openSnackbar]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/products/${idDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((product) => product.id !== idDelete));
      openSnackbar("Produto excluido com sucesso!", "success");
      setIdDelete(null);
      setOpen(false);
    } catch (error) {
      openSnackbar("Falha ao excluir produto.", "error");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Titulo" },
    { field: "description", headerName: "Descrição" },
    { field: "price", headerName: "Preço" },
    { field: "categoryId", headerName: "Categoria" },
    { field: "ownerId", headerName: "Propietario" },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            sx={{
              color: "primary.main",
            }}
            onClick={() => navigate(`/edit-product/${id}`)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            className="textPrimary"
            sx={{ color: red[500] }}
            onClick={() => {
              setOpen(true);
              setIdDelete(id);
            }}
          />,
        ];
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "25px",
        }}
      >
        <Button variant="contained" color="primary" onClick={() => navigate(`/products/new`)}>
          <CreateIcon sx={{ marginRight: "5px" }} /> Criar Produto
        </Button>
      </div>
      <DataGrid rows={products} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Deseja excluir o produto?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
