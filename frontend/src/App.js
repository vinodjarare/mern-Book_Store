import Dashboard from "./admin/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./admin/users/Users";
import Books from "./admin/books/Books";
import New from "./admin/users/New";
import NewBook from "./admin/books/NewBook";
import Login from "./Pages/Login";
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
import Orders from "./admin/orders/Orders";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderDetails from "./components/MyOrders/OrderDetails";
import ProcessOrder from "./admin/orders/ProcessOrder";
import UpdateBook from "./admin/books/UpdateBook";
import Profile from "./components/User/Profile";
import Signup from "./Pages/Signup";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/admin">
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<New />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<UpdateBook />} />
              <Route path="books/new" element={<NewBook />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<ProcessOrder />} />
            </Route>
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
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
