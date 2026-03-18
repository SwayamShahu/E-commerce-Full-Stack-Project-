import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">

        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ShopEase
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-1/3 px-4 py-2 rounded-md text-black focus:outline-none"
        />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <ShoppingCart
            className="cursor-pointer hover:text-yellow-300 transition"
            onClick={() => navigate("/cart")}
          />

          {isAuthenticated ? (
            <>
              {/* Orders */}
              <button
                onClick={() => navigate("/orders")}
                className="hover:text-yellow-300 transition"
              >
                Orders
              </button>

              {/* Admin Dropdown - Only show for ADMIN role */}
              {isAdmin && (
                <div className="relative group">
                  <button className="hover:text-yellow-300 transition">
                    Admin
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button
                      onClick={() => navigate("/admin/products")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    >
                      Products
                    </button>
                    <button
                      onClick={() => navigate("/admin/orders")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                    >
                      All Orders
                    </button>
                  </div>
                </div>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-yellow-300 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1 hover:text-yellow-300 transition"
              >
                <User size={18} />
                Login
              </button>

              {/* Register */}
              <button
                onClick={() => navigate("/register")}
                className="bg-yellow-500 text-black px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
