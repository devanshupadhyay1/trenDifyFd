import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://trendifybd.onrender.com ";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  category: { name: string };
}

interface Category {
  id: number;
  name: string;
}

const AdminProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      const prodRes = await axios.get(`${API_BASE_URL}/api/products`);
      const catRes = await axios.get(`${API_BASE_URL}/api/categories`);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    };
    fetchAll();
  }, []);

  const deleteProduct = async (id: number) => {
    await axios.delete(`${API_BASE_URL}/api/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/products`, {
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        categoryId: parseInt(formData.categoryId),
      });
      setProducts([...products, res.data]);
      setFormData({ name: "", price: "", image: "", categoryId: "" });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Manage Products</h2>

      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="mb-8 space-y-4 bg-gray-100 p-4 rounded-md shadow"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded w-full sm:col-span-2"
            required
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border p-2 rounded w-full sm:col-span-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center sm:text-left">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Products List */}
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row items-center sm:items-start gap-4"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600">${p.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{p.category?.name}</p>
            </div>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;