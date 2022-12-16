import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";

const Login = () => {
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
  const Loginhandle = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={Loginhandle}>
          <h2>LogIn</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onchange}
            placeholder="Enter Your email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onchange}
            placeholder="Enter Password"
          />
          <button type="submit">Sign Up</button>
          <Link to="/register" className="redirect">
            New user?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
