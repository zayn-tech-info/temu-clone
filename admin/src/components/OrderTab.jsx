import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "orderid", headerName: "Order ID", width: 90 },
  { field: "customerName", headerName: "Customer Name", width: 200},
  { field: "payment", headerName: "Payment", width: 180 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "contact", headerName: "Telephone", width: 160 },
];

const rows = [
  {
    orderid: 1,
    customerName: "Snow Jon",
    payment: "Online",
    status: "Delivered",
    contact: "+234 701 234 5678",
  },
  {
    orderid: 2,
    customerName: "Lannister Cersei",
    payment: "Cash on Delivery",
    status: "Processing",
    contact: "+234 802 345 6789",
  },
  {
    orderid: 3,
    customerName: "Lannister Jaime",
    payment: "Online",
    status: "Cancelled",
    contact: "+234 803 456 7890",
  },
  {
    orderid: 4,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 5,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 6,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 7,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 8,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 9,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
  {
    orderid: 10,
    customerName: "Stark Arya",

    payment: "Cash on Delivery",
    status: "Shipped",
    contact: "+234 704 567 8901",
  },
];

export function OrderTab() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.orderid}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="client"
        autoHeight
        hideFooterSelectedRowCount
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
