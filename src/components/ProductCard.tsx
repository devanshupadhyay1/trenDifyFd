import { useCart } from "../context/CartContext";

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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-700 mb-1">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 italic mb-4">
          Category: {product.category?.name}
        </p>
      </div>
      <button
        className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category.name,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;