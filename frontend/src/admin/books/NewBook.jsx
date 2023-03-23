import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { createBook } from "../../Actions/bookAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const NewBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.book);
  const [newBook, setNewBook] = useState({
    name: "",
    auther: "",
    price: 0,
    stock: 1,
    categary: "adventure",
    description: "",
  });
  const [image, setImage] = useState("");
  const { name, auther, price, stock, categary, description } = newBook;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBook({ name, auther, price, stock, categary, description, image })
    );
  };
  console.log(categary);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }

    if (success) {
      toast.success("Book created successfully");
      navigate("/admin/books");
      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, success, navigate]);

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

  return (
    <div className="books">
      <Sidebar />
      <div className="bookcontainer">
        <Navbar />
        <div className="form-container">
          <div className="form-wrapper">
            <h2>Enter Book Detail</h2>

            <form onSubmit={handleSubmit}>
              <input
                onChange={onchange}
                type="text"
                placeholder="Book Name"
                name="name"
              />
              <input
                onChange={onchange}
                type="text"
                placeholder="Auther Name"
                name="auther"
              />
              <input
                onChange={onchange}
                type="text"
                placeholder="Price"
                name="price"
              />
              <input
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
                onChange={onchange}
                type="text"
                placeholder="description"
                name="description"
              />
              {image && (
                <img
                  className="image-preview"
                  src={image}
                  alt="image preview"
                />
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
