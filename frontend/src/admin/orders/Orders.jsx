import "../books/books.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, deleteOrder } from "../../Actions/orderAction";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const columns = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "status", headerName: "Status", width: 230 },
    { field: "itemsQty", headerName: "Item qty", width: 130 },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/orders/${params.row.id}`}>
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
    dispatch(deleteOrder(id));
  };
  const rows = [];

  orders &&
    orders?.orders?.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="books">
      <Sidebar />
      <div className="bookcontainer">
        <Navbar />
        <div className="booksTable">
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

export default Orders;
