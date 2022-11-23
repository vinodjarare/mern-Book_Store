import "./users.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";

const rows = [
  { id: 1, name: "Snow", email: "Jon", isadmin: true },
  { id: 2, name: "Lannister", email: "Cersei", isadmin: false },
  { id: 3, name: "Lannister", email: "Jaime", isadmin: "false" },
  { id: 4, name: "Stark", email: "Arya", isadmin: "false" },
  { id: 5, name: "Targaryen", email: "Daenerys", isadmin: "false" },
  { id: 6, name: "Melisandre", email: "null", isadmin: "false" },
  { id: 7, name: "Clifford", email: "Ferrara", isadmin: "false" },
  { id: 8, name: "Frances", email: "Rossini", isadmin: "false" },
  { id: 9, name: "Roxie", email: "Harvey", isadmin: "false" },
];

const Users = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "isadmin",
      headerName: "IsAdmin",
      type: "boolean",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      with: "auto",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/users/${params.row.id}`}>
              <Visibility color="info" />
            </Link>
            <Button color="error" onClick={deleteHandler}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const deleteHandler = () => {
    console.log("hello");
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="usersTable">
          <div className="datatableTitle">
            Add New User
            <Link to="/admin/users/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
