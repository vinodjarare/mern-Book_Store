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
import { login } from "../Actions/userAction";
const Login = () => {
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
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const onchange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  const { email, password } = credential;
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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
            label="Username"
            placeholder="Enter your email"
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
            onClick={loginHandler}
          >
            Sign in
          </Button>

          <Typography marginY={2}>
            {" "}
            Do you have an account ?
            <Link to="/register" style={LinkStyle}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
