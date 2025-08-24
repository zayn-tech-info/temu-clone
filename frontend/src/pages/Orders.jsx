import { Fragment } from "react";
import OrdersSideBar from "../components/OrdersSideBar";
import PageHeader from "../components/PageHeader";
import OrderOptions from "../components/OrderOptions";

const Orders = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
      <div>
        <PageHeader pagename="Order Tracking" />
      </div>
      <div className="md:grid md:grid-cols-5 md:gap-5">
        <div className="col-span-1">
          <OrdersSideBar />
        </div>
        <div className="col-span-4">
          <OrderOptions />
        </div>
      </div>
    </div>
  );
};

export default Orders;
