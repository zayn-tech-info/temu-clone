import { NavBar } from "../components/NavBar";
import AdminSidebar from "../components/AdminSidebar";
import { OrderTab } from "../components/OrderTab";

export function Order() {
  return (
    <div className="min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
        <div className="lg:col-span-3">
          <AdminSidebar />
        </div>
        <div className="col-span-9 flex">
          <OrderTab />
        </div>
      </div>
    </div>
  );
}
