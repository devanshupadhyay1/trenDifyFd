import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://tren-dify-bd.vercel.app";

interface OrderItem {
  id: number;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

interface Order {
  id: number;
  email: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <div className="space-y-2 mb-4">
                <p className="text-gray-800"><strong>Order ID:</strong> {order.id}</p>
                <p className="text-gray-800"><strong>Email:</strong> {order.email}</p>
                <p className="text-gray-800"><strong>Total:</strong> ${order.total}</p>
                <p className="text-gray-800"><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <h4 className="font-semibold mb-2">Items:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-700">
                    {item.product.name} - {item.quantity} × ${item.product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;