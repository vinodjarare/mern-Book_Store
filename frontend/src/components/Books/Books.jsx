import { Button, Container, Grid, Slider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallbooks } from "../../Actions/bookAction";
import BooksCard from "../Card/Card";
import "./bookDetail.scss";
import Pagination from "react-js-pagination";
import { FilterAltOffOutlined, FilterAltOutlined } from "@mui/icons-material";

const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
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
  const categories = ["adventure", "fantacy", "novel", "science", "sci-fi"];
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const dispatch = useDispatch();
  const { books, resultPerPage, filteredbooksCount, booksCount } = useSelector(
    (state) => state.book
  );
  let count = filteredbooksCount;

  useEffect(() => {
    dispatch(fetchallbooks(currentPage, price, category));
  }, [dispatch, currentPage, price, category]);
  return (
    <>
      <Container className="book-detail">
        <Button
          variant="contained"
          color="inherit"
          className="filterButton"
          onClick={() => setOpenFilter(true)}
        >
          <FilterAltOutlined />
        </Button>
        <div className={openFilter ? `filterBox` : `closed`}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setOpenFilter(false)}
          >
            <FilterAltOffOutlined />
          </Button>
          <Typography variant="h6">Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />

          <Typography variant="h6">Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                <Button color="inherit">{category}</Button>
              </li>
            ))}
          </ul>
        </div>
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
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={booksCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default AllBooks;
