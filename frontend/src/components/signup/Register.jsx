import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../Actions/userAction";
import "./signup.scss";
const Register = () => {
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

  const RegisterHandle = async (event) => {
    event.preventDefault();
    dispatch(register({ name, email, password }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={RegisterHandle}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onchange}
            placeholder="Enter Your Name"
          />
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
        </form>
      </div>
    </div>
  );
};

export default Register;
