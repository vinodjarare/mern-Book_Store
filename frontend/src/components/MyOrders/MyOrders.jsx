import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../Actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./MyOrders.scss";
import { Launch } from "@mui/icons-material";
const MyOrders = () => {
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
            <Link to={`/orders/${params.row.id}`}>
              <Launch />
            </Link>
          </>
        );
      },
    },
  ];
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
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <div>
      <div className="container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default MyOrders;
