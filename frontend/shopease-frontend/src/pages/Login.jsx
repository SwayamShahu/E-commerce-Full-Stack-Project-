import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-4">
      
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl flex">

        {/* Left Branding Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center">
            Login to continue shopping amazing deals on ShopEase.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Register
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
