import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login } from "../api/api"; // Import the login API

// Schema for form validation
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset, // Add reset function from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data); // Call the login API
      localStorage.setItem("token", response.token); // Store the token in localStorage
      localStorage.setItem("role", response.role); // Store the role in localStorage

      // Display success message
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Clear the form fields
      reset();

      // Redirect based on role
      if (response.role === "backer") {
        navigate("/backer-dashboard");
      } else if (response.role === "fundraiser") {
        navigate("/fundraiser-dashboard");
      } else if (response.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.message || "Invalid email or password");
      toast.error(error.message || "Invalid email or password", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Navbar userRole="guest" /> {/* Show guest navbar */}
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] "
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a1a2e] text-white py-2 px-4 rounded-lg hover:bg-[#16213e] transition duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-[#1a1a2e] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;