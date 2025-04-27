import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

const API_BASE_URL = "https://trendifybd.onrender.com "; 

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryName = product.category?.name?.toLowerCase() || "";
    const matchesCategory =
      selectedCategory === "All" || categoryName === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-center py-20 px-4 sm:px-6 shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-sm">
          Welcome to trenDify
        </h1>
        <p className="mb-6 text-lg opacity-90">
          Discover fashion, comfort & savings — all in one place.
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="px-4 sm:px-6 py-12 bg-white text-center">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedCategory === cat.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="py-14 px-4 sm:px-6 bg-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">Featured Products</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products match your search.</p>
        )}
      </div>

      {/* Why Us */}
      <div className="py-16 px-4 sm:px-6 text-center bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">Why Choose trenDify?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Fast Shipping", desc: "Get your products delivered within 2 days." },
            { title: "Quality Guarantee", desc: "Only the best brands and products." },
            { title: "24/7 Support", desc: "We’re always here to help." },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10 px-4">
        <p>&copy; {new Date().getFullYear()} trenDify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;