import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/owners`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        openSnackbar("Falha ao buscar usuários.", "error");
      }
    };

    fetchUsers();
  }, [openSnackbar]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nome", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Editar" onClick={() => navigate(`/edit-user/${id}`)} />,
        ];
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>Listagem de Usuários</h1>
      </div>
      <DataGrid rows={users} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
};

export default UserList;
