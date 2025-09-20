import Orders from "../components/Orders";
import OrdersSideBar from "../components/OrdersSideBar";

const Order = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-8">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <OrdersSideBar />
        </div>
        <div className="col-span-8">
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Order;
