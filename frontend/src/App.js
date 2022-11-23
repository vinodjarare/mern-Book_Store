import Dashboard from "./admin/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./admin/users/Users";
import Books from "./admin/books/Books";
import New from "./admin/users/New";
import NewBook from "./admin/books/NewBook";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import BookDetail from "./components/Books/BookDetail";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./components/Books/Books";
import Cart from "./components/Cart/Cart";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin">
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<New />} />
            <Route path="books" element={<Books />} />
            <Route path="books/new" element={<NewBook />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
