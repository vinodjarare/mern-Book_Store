import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  fetchaBookDetail,
  updateBook,
} from "../../Actions/bookAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const UpdateBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, book, isUpdated, loading } = useSelector(
    (state) => state.book
  );

  const [newBook, setNewBook] = useState({
    name: "",
    auther: "",
    price: 0,
    stock: 1,
    categary: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const { name, auther, price, stock, categary, description } = newBook;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBook(id, {
        name,
        auther,
        price,
        stock,
        categary,
        description,
        image,
      })
    );
  };

  useEffect(() => {
    if (book?._id !== id) {
      dispatch(fetchaBookDetail(id));
    } else {
      setNewBook({
        name: book.name,
        auther: book.auther,
        price: book.price,
        stock: book.stock,
        categary: book.categary,
        description: book.description,
      });
      setImage(book.cover.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Book Updated Successfully");
      navigate("/admin/books");
      dispatch({ type: "updateReset" });
    }
  }, [dispatch, error, isUpdated, id, book]);
  const onchange = (event) => {
    if (event.target.name === "cover") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          console.log(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setNewBook({ ...newBook, [event.target.name]: event.target.value });
    }
  };
  console.log(image);

  return (
    <div className="books">
      <Sidebar />
      <div className="bookcontainer">
        <Navbar />
        <div className="form-container">
          <div className="form-wrapper">
            <h2>Update Book Detail</h2>

            <form onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={onchange}
                type="text"
                placeholder="Book Name"
                name="name"
              />
              <input
                value={auther}
                onChange={onchange}
                type="text"
                placeholder="Auther Name"
                name="auther"
              />
              <input
                value={price}
                onChange={onchange}
                type="text"
                placeholder="Price"
                name="price"
              />
              <input
                value={stock}
                onChange={onchange}
                type="text"
                placeholder="Stock"
                name="stock"
              />
              <select onChange={onchange} name="categary">
                <option value="adventure">Adventure</option>
                <option value="fantacy">Fantacy</option>
                <option value="novel">Novel</option>
                <option value="science">Science</option>
                <option value="sci-fi">Sci-fi</option>
              </select>
              <input
                type="file"
                placeholder="select image"
                name="cover"
                accept="image/*"
                onChange={onchange}
              />
              <input
                value={description}
                onChange={onchange}
                type="text"
                placeholder="description"
                name="description"
              />
              {image && (
                <img className="image-preview" src={image} alt="preview" />
              )}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
