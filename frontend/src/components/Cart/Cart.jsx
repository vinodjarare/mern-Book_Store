import "./cart.scss";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  addItemsToCart,
  decreasecart,
  removeItemsFromCart,
} from "../../Actions/cartAction";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems: cart } = useSelector((state) => state.cart);

  const removeHandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const increase = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id));
  };
  const decrease = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    dispatch(decreasecart(id));
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="cart">
      <h2 className="title">Shopping Cart</h2>
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.5 }}
          className="left"
        >
          <div className="titles">
            <div className="left-titles">
              <h3>Book Details</h3>
            </div>
            <div className="right-titles">
              <h3>Quantity</h3>
              <h3>Price</h3>
              <h3>Total</h3>
            </div>
          </div>
          {cart?.map((cart) => (
            <motion.div className="cart-wrapper" key={cart.id} variants={item}>
              <div className="left-wrapper">
                <img src={cart.image} alt="" />
                <div className="details">
                  <h4>{cart?.name}</h4>
                  <h4>{cart?.auther}</h4>
                  <button onClick={() => removeHandler(cart.id)}>Remove</button>
                </div>
              </div>
              <div className="right-wrapper">
                <div className="quantity">
                  <button
                    onClick={() => increase(cart.id, cart.quantity, cart.stock)}
                  >
                    +
                  </button>
                  <span>{cart.quantity}</span>
                  <button onClick={() => decrease(cart.id, cart.quantity)}>
                    -
                  </button>
                </div>
                <h3>₹{cart.price}</h3>
                <h3>₹{cart.price * cart.quantity}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="right">
          <motion.div
            className="right-container"
            initial={{ x: "100%", opacity: "0" }}
            whileInView={{ x: "0%", opacity: "1" }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="summary">Order Summary</h4>
            <div className="wrapper">
              <h4>ITEMS</h4>
              <h4>{cart?.reduce((acc, item) => acc + item.quantity, 0)}</h4>
            </div>
            <div className="wrapper">
              <h4>Price</h4>
              <h4>
                ₹
                {cart?.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </h4>
            </div>
            <div className="wrapper">
              <h4>Shipping</h4>
              <h4>
                ₹
                {cart?.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                ) > 1000
                  ? "0"
                  : 100}
              </h4>
            </div>
            <Divider />
            <div className="wrapper">
              <h4>Total</h4>
              <h4>
                ₹
                {cart?.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                ) > 1000
                  ? cart?.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )
                  : cart?.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    ) + 100}
              </h4>
            </div>
            <Link to="/shipping" className="btn">
              Checkout
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
