import { NavBar } from "../components/NavBar";
import AdminSidebar from "../components/AdminSidebar";
import { TotalAvenue } from "../components/TotalAvenue";
import { OrderSummary } from "../components/OrderSummary";
import { Overview } from "../components/Overview";
import { TopSellingItems } from "../components/TopSellingItems";

export function Dashboard() {
  return (
    <div className="min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
        <div className="lg:col-span-3">
          <AdminSidebar />
        </div>
        <div className="lg:col-span-9 space-y-6">
          <TotalAvenue />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <OrderSummary />
            </div>
            <div className="lg:col-span-4">
              <Overview />
            </div>
            <div className="lg:col-span-3">
              <TopSellingItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
