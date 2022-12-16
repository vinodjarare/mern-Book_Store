import "./users.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, updateUser } from "../../Actions/userAction";
import { toast } from "react-toastify";
const Users = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(false);
  const { users, deleted, updated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
    if (deleted) {
      toast.success("User deleted Successfully");
      dispatch({ type: "deleteReset" });
    }
    if (updated) {
      toast.success("User updated Successfully");
      dispatch({ type: "updateUserReset" });
    }
  }, [dispatch, deleted, updated]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const changeUserRoleHandler = (event, id) => {
    event.preventDefault();
    dispatch(updateUser(id, role));
  };
  const onchange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
    console.log(role);
  };

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
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true)}>
              <Edit />
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Change user role
                </Typography>
                <form
                  onSubmit={(event) =>
                    changeUserRoleHandler(event, params.row.id)
                  }
                >
                  <select name="isAdmin" onChange={onchange}>
                    <option>Select Role</option>
                    <option value="false">User</option>
                    <option value="true">Admin</option>
                  </select>
                  <Button type="submit">Update</Button>
                </form>
              </Box>
            </Modal>
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
