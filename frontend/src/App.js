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
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Shipping from "./components/Cart/Shipping";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from "./components/Cart/OrderSuccess";
const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);

  const stripesec =
    "pk_test_51LiZs7SIfK4ofOzioYXJMoWVlUK7wep0qAVogrvL2kkR37CBhWgQsP7vQYKkuRAPc5uDOYIiEmCUrcnMJryMVzgr00Hs0uwd4g";
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}> */}
          <Route path="/admin">
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<New />} />
            <Route path="books" element={<Books />} />
            <Route path="books/new" element={<NewBook />} />
          </Route>
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
