import { Paper, TextField, Button, Typography } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { useParams } from "react-router-dom";
import "./users.scss";
const New = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer newUser">
        <Paper className="formPaper">
          <Typography variant="h4" color={"GrayText"}>
            Edit User Details
          </Typography>
          <TextField label="name" />
          <TextField label="email" />
          <TextField label="make admin" />
          <Button color="primary" variant="contained">
            Add User
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default New;
