import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import EditIcon from "@mui/icons-material/Edit";

const ProductList = () => {
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
        openSnackbar("Failed to fetch products.", "error");
      }
    };

    fetchProducts();
  }, [openSnackbar]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Titulo", width: 150 },
    { field: "description", headerName: "Descrição", width: 200 },
    { field: "price", headerName: "Preço", width: 110 },
    { field: "categoryId", headerName: "Categoria", width: 130 },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit-product/${params.row.id}`)}>
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => navigate(`/products/new`)}>
        Criar Produto
      </Button>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductList;
