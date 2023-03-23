import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { register } from "../Actions/userAction";
const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const LinkStyle = {
    color: "blue",
    textDecoration: "underline",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Grid>
        <Paper elevation={4} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ margin: "20px 0" }}>Log In</h2>
          </Grid>
          <TextField
            label="Name"
            placeholder="Enter your name"
            variant="outlined"
            name="name"
            fullWidth
            required
            margin="dense"
            value={name}
            onChange={onchange}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            name="email"
            fullWidth
            required
            margin="dense"
            value={email}
            onChange={onchange}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            required
            margin="dense"
            value={password}
            onChange={onchange}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={signUpHandler}
          >
            Sign Up
          </Button>

          <Typography marginY={2}>
            {" "}
            Already have an account ?{" "}
            <Link to="/login" style={LinkStyle}>
              Log In
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
