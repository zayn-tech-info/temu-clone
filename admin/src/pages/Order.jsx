import { useState } from "react";
import { NavBar } from "../components/NavBar";
import AdminSidebar from "../components/AdminSidebar";
import { OrderTab } from "../components/OrderTab";

export function Order() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div>
        <NavBar
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          isSidebarOpen={sidebarOpen}
          title="Orders"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 items-stretch">
        <div className="lg:col-span-3 h-full">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
        <div className="col-span-12 lg:col-span-9 flex h-full">
          <OrderTab />
        </div>
      </div>
    </div>
  );
}
