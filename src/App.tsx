import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Products from "./pages/Products";
import Navbar from "./components/navbar";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import Success from "./pages/Success";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders"; 
import AdminCategories from "./pages/admin/AdminCategories"; 
import Home from "./pages/Home";
import ForgotPassword from "./auth/ForgotPassword";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminDashboardLayout />  
    </ProtectedAdminRoute>
  }
/>

        

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="dashboard" element={<div>Welcome Admin</div>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;