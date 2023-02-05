import "./bookDetail.scss";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchaBookDetail } from "../../Actions/bookAction";
import { addItemsToCart } from "../../Actions/cartAction";
const BookDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const { book } = useSelector((state) => state.book);

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
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  const cartHandler = () => {
    dispatch(addItemsToCart(id));
  };
  useEffect(() => {
    dispatch(fetchaBookDetail(id));
  }, [dispatch, id]);
  return (
    <div className="book-detail">
      <motion.h2
        initial={{ y: "-100%", opacity: "0" }}
        animate={{ y: "0%", opacity: "1" }}
        transition={{ delay: 0.2 }}
      >
        Book Detail
      </motion.h2>

      <div className="book-detail-body">
        <div className="left">
          <motion.img
            initial={{ x: "-100%", opacity: "0" }}
            animate={{ x: "0%", opacity: "1" }}
            transition={{ delay: 0.3 }}
            height={500}
            width="auto"
            src={book?.cover?.url}
            alt="product_image"
          />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.8 }}
          className="right"
        >
          <motion.span variants={item}>{book?.categary}</motion.span>
          <motion.h2 variants={item}>{book?.name}</motion.h2>
          <motion.h3 variants={item}>{book?.auther}</motion.h3>
          <motion.p variants={item}>₹ {book?.price}</motion.p>
          {/* <div className="input-div">
            <button onClick={decrement}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={increment}>+</button>
          </div> */}
          <motion.p variants={item} className="description">
            {book?.description}
          </motion.p>
          <motion.div variants={item} className="button-group">
            <button className="btn" onClick={cartHandler}>
              Add to cart
            </button>
            <Link to="/cart" className="btn cart-btn">
              Go to cart
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;
