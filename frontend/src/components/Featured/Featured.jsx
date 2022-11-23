import "./featured.scss";
import BooksCard from "../Card/Card";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallbooks } from "../../Actions/bookAction";
import { motion } from "framer-motion";
const Featured = () => {
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
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  useEffect(() => {
    dispatch(fetchallbooks());
  }, [dispatch]);
  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: "0", x: "-50%" }}
        whileInView={{ opacity: "1", x: "0%" }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
      >
        Featured
      </motion.h2>
      <div className="featured-wrapper">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.5 }}
          my={2}
        >
          {books?.map((book) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={book._id}
              component={motion.div}
              variants={item}
            >
              <BooksCard book={book} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Featured;
