import "../books/books.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, deleteOrder } from "../../Actions/orderAction";
import { io } from "socket.io-client";

const socket = io("/");
const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isDeleted } = useSelector((state) => state.order);
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
    orders?.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(getAllOrders());

    socket.emit("join", "adminRoom");

    socket.on("orderPlaced", (order) => {
      dispatch(getAllOrders());
      toast.info(`New order with ID ${order._id} has been placed`);
    });
    if (isDeleted) {
      toast.success("Order deleted successfully");
      dispatch({ type: "clearMessage" });
    }

    //cleanup the event listener on component unmount
    return () => {
      socket.off("new_order");
    };
  }, [dispatch, isDeleted]);

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
