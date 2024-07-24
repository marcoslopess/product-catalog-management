import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import EditIcon from "@mui/icons-material/Edit";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories", {
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

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Titulo" },
    { field: "description", headerName: "Descrição", width: 200 },
    { field: "ownerId", headerName: "Propietario" },
    {
      field: "actions",
      headerName: "Ações",
      width: 90,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit-category/${params.row.id}`)}>
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => navigate(`/categories/new`)}>
        Criar Categoria
      </Button>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default CategoryList;
