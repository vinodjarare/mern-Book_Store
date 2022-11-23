import { Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallbooks } from "../../Actions/bookAction";
import BooksCard from "../Card/Card";
import "./bookDetail.scss";

const AllBooks = () => {
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
    <Container className="book-detail">
      <Grid
        container
        spacing={2}
        my={2}
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.5 }}
      >
        {books &&
          books.map((book) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              component={motion.div}
              variants={item}
              key={book._id}
            >
              <BooksCard book={book} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default AllBooks;
