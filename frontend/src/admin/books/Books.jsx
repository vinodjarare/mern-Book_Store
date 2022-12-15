import "./books.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, fetchallbooks } from "../../Actions/bookAction";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Books = () => {
  const dispatch = useDispatch();
  const { books, isDeleted } = useSelector((state) => state.book);
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "bookName", headerName: "Book Name", width: 230 },
    { field: "auther", headerName: "Auther", width: 130 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
    },
    {
      field: "categary",
      headerName: "Categary",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Actions",
      with: "auto",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/books/${params.row.id}`}>
              <Edit />
            </Link>
            <Button color="error" onClick={() => deleteHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const deleteHandler = (id) => {
    dispatch(deleteBook(id));
  };
  const rows = [];
  books &&
    books.forEach((item) => {
      rows.push({
        id: item._id,
        bookName: item.name,
        auther: item.auther,
        price: item.price,
        stock: item.stock,
        categary: item.categary,
      });
    });

  useEffect(() => {
    dispatch(fetchallbooks());
    if (isDeleted) {
      toast.success("Book deleted successfully");
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, isDeleted]);

  return (
    <div className="books">
      <Sidebar />
      <div className="bookcontainer">
        <Navbar />
        <div className="booksTable">
          <div className="datatableTitle">
            Add New Book
            <Link to="/admin/books/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Books;
