import "./users.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../Actions/userAction";
import { toast } from "react-toastify";
const Users = () => {
  const dispatch = useDispatch();
  const { users, deleted } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
    if (deleted) {
      toast.success("User deleted Successfully");
      dispatch({ type: "deleteReset" });
    }
  }, [dispatch, deleted]);
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
            <Button color="error" onClick={() => deleteHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const rows = [];
  users?.forEach((element) => {
    rows.push({
      id: element._id,
      name: element.name,
      email: element.email,
      isadmin: element.isAdmin,
    });
  });
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
