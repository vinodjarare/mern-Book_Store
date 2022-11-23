import "./bookDetail.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchaBookDetail } from "../../Actions/bookAction";
import axios from "axios";
import { useState } from "react";
const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [book, setBook] = useState({});
  //   const { book } = useSelector((state) => state.book);

  useEffect(() => {
    const getBook = async () => {
      const { data } = await axios.get(`/api/v1/books/${id}`);
      setBook(data.book);
    };
    getBook();
  }, [id]);

  return (
    <>
      <div className="book-detail">
        <h2>Book Detail</h2>
        <h3>{book.name}</h3>
        <div className="book-detail-body">
          <div className="left">
            <img
              height={500}
              width="auto"
              src={book.cover?.url}
              alt="product_image"
            />
          </div>
          <div className="right">
            <span>{book.categary}</span>
            <h2>{book.name}</h2>
            <h3>{book.auther}</h3>
            <p>{book.price}</p>
            <div className="input-div">
              <button>-</button>
              <input type="number" readOnly />
              <button>+</button>
            </div>
            <p className="description">{book.description}</p>
            <div className="button-group">
              <button className="btn">Add to cart</button>
              <button className="btn">Go to cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
