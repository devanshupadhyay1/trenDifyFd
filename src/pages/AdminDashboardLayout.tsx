import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed sm:relative z-20 bg-gray-800 text-white p-4 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 w-64`}>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/admin/products" className="hover:underline">Products</Link>
          <Link to="/admin/categories" className="hover:underline">Categories</Link>
          <Link to="/admin/orders" className="hover:underline">Orders</Link>
        </nav>
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar on Mobile */}
        <div className="sm:hidden bg-gray-800 text-white p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        <main className="p-4 sm:p-6 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}