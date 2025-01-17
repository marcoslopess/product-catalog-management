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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        openSnackbar("Falha ao buscar categorias.", "error");
      }
    };

    fetchCategories();
  }, [openSnackbar]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/categories/${idDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== idDelete));
      openSnackbar("Categoria excluida com sucesso!", "success");
      setIdDelete(null);
      setOpen(false);
    } catch (error) {
      openSnackbar("Falha ao excluir categoria.", "error");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Titulo" },
    { field: "description", headerName: "Descrição", width: 200 },
    { field: "ownerId", headerName: "Propietario" },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            sx={{
              color: "primary.main",
            }}
            onClick={() => navigate(`/edit-category/${id}`)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            className="textPrimary"
            sx={{ color: red[500], display: !row.canBeDeleted ? "none" : "block" }}
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
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>Listagem de Categorias</h1>
        <Button variant="contained" color="primary" onClick={() => navigate(`/categories/new`)} sx={{}}>
          <CreateIcon sx={{ marginRight: "5px" }} /> Criar Categoria
        </Button>
      </div>
      <DataGrid rows={categories} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
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

export default CategoryList;
