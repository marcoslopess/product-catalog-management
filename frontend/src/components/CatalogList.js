// components/CatalogList.js

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const CatalogList = () => {
  const [catalog, setCatalog] = useState([]);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flat/search`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCatalog(response.data);
      } catch (error) {
        openSnackbar("Falha ao buscar categorias.", "error");
      }
    }
    fetchData();
  }, [openSnackbar]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "productName", headerName: "Nome do Produto" },
    { field: "productDescription", headerName: "Descrição", width: 200 },
    { field: "productPrice", headerName: "Preço" },
    { field: "categoryName", headerName: "Categoria" },
    { field: "ownerId", headerName: "Proprietário" },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>Listagem</h1>
      </div>
      <DataGrid rows={catalog} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
};

export default CatalogList;
