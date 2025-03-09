import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../api/auth"; // Import the login API

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
      localStorage.setItem("email",response.email);
      localStorage.setItem("name",response.name);

      // Display success message
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Clear the form fields
      reset();

      // Redirect based on role
      if (response.role === "backer") {
        navigate("/backer/profile");
      } else if (response.role === "fundraiser") {
        navigate("/fundraiser/dashboard");
      } else if (response.role === "admin") {
        navigate("/admin/dashboard");
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
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gradient-to-br from-[#f6f6f6] to-[#eaeaea] flex items-center justify-center"
  >
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl px-8 py-10 bg-white border shadow-2xl rounded-2xl backdrop-blur-lg border-white/20"
      noValidate
    >
      <h2 className="mb-8 text-3xl font-bold text-center text-[#1a1a2e]">
        Welcome Back
      </h2>

      <div className="space-y-6">
        {/* Email Field */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e] transition-all "
              
            />
          </div>
          {errors.email && (
              <motion.p
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center mt-1 text-sm text-red-500"
              >
                <FiAlertCircle className="mr-1" /> {errors.email.message}
              </motion.p>
            )}
        </motion.div>

        {/* Password Field */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="password"
              {...register("password")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 transition-all"
            />
          </div>
          {errors.password && (
              <motion.p
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center mt-1 text-sm text-red-500"
              >
                <FiAlertCircle className="mr-1" /> {errors.password.message}
              </motion.p>
            )}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Sign In
        </motion.button>
      </div>

      <div className="mt-6 text-center">
        <a
          href="/forgot-password"
          className="text-sm text-[#1a1a2e] hover:underline"
        >
          Forgot Password?
        </a>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-[#1a1a2e] font-semibold hover:underline underline-offset-4"
        >
          Create Account
        </a>
      </p>
    </motion.form>
    </motion.div>
  );
};

export default LoginPage;
