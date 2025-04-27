import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ordersRes = await axios.get("http://localhost:5000/api/orders");
        const productsRes = await axios.get("http://localhost:5000/api/products");

        const orders = ordersRes.data;
        const products = productsRes.data;

        const sales = orders.reduce((acc: number, order: any) => acc + order.total, 0);

        setTotalSales(sales);
        setTotalOrders(orders.length);
        setTotalProducts(products.length);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">{totalProducts}</p>
        </div>
      </div>

      {/* Recent Orders */}
      {/* Later, you can add recent orders or top-selling products here */}
    </div>
  );
};

export default AdminDashboard;