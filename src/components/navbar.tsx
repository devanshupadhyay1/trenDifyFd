import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Embrace the trend
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-400">
              Products
            </Link>
            <Link to="/cart" className="hover:text-gray-400">
              Cart
            </Link>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-400">
              Signup
            </Link>
            
          </div>

          {/* Hamburger menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-1">
          <Link to="/" className="block text-white hover:bg-gray-700 rounded px-3 py-2">
            Home
          </Link>
          <Link to="/products" className="block text-white hover:bg-gray-700 rounded px-3 py-2">
            Products
          </Link>
          <Link to="/cart" className="block text-white hover:bg-gray-700 rounded px-3 py-2">
            Cart
          </Link>
          <Link to="/login" className="block text-white hover:bg-gray-700 rounded px-3 py-2">
            Login
          </Link>
          <Link to="/signup" className="block text-white hover:bg-gray-700 rounded px-3 py-2">
            Signup
          </Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;