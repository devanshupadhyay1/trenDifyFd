import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const API_BASE_URL = "https://trendifybd.onrender.com "; 

const AdminCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/categories`, {
        name: newCategory,
      });
      setCategories([...categories, res.data]);
      setNewCategory("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full sm:w-auto flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddCategory}
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>

      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow-sm"
          >
            <span className="text-gray-800 font-medium">{cat.name}</span>
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategory;