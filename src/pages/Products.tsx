import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
};

const categories = ["All", "Clothing", "Footwear", "Accessories", "Electronics", "Grocery"];
const sortOptions = ["None", "Price: Low to High", "Price: High to Low"];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("None");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  let filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" ||
      product.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchCategory && matchSearch && matchPrice;
  });

  if (sortBy === "Price: Low to High") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">All Products</h2>

      {/* Filter Controls */}
      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded border text-sm ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-72 max-w-full"
          />

          <div className="flex gap-2 items-center">
            <label className="text-sm hidden sm:block">Min:</label>
            <input
              type="number"
              onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              className="border p-2 rounded w-20"
              placeholder="0"
            />
            <label className="text-sm hidden sm:block">Max:</label>
            <input
              type="number"
              onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
              className="border p-2 rounded w-20"
              placeholder="1000"
            />
          </div>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
            value={sortBy}
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;