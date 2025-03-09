import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import { register as registerUser } from "../api/auth"; // Rename API function

// Schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register: formRegister,
    handleSubmit,
    reset,
    watch, // Add this line
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  

  const onSubmit = async (formData) => {
    console.log("Form Data:", formData); // Debugging: Log form data
    try {
      // Call the register API
      const response = await registerUser(formData);

      // Display success message
      toast.success("Registration successful! Redirecting to login...", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Clear the form fields
      reset();

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration Error:", error); // Debugging: Log error
      setError(error.message || "Registration failed");
      toast.error(error.message || "Registration failed", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const passwordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#f6f6f6] to-[#eaeaea] flex items-center justify-center "
    >
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl px-8 py-10 my-10 bg-white border shadow-2xl rounded-2xl backdrop-blur-lg border-white/20"
      >
        <h2 className="mb-8 text-3xl font-bold text-center text-[#1a1a2e]">
          Create Account
        </h2>

        <div className="space-y-6">
          {/* Name Field */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                {...formRegister("name")}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 transition-all"
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center mt-1 text-sm text-red-500"
              >
                <FiAlertCircle className="mr-1" /> {errors.name.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="email"
              {...formRegister("email")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 transition-all"
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

          {/* Password Strength Meter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="password"
                {...formRegister("password")}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 transition-all"
              />
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-full rounded-full transition-all ${
                    passwordStrength(watch("password")) > i
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="password"
              {...formRegister("confirmPassword")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 transition-all"
            />
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center mt-1 text-sm text-red-500"
            >
              <FiAlertCircle className="mr-1" /> {errors.confirmPassword.message}
            </motion.p>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Select Role
          </label>
          <div className="relative">
            <select
              {...formRegister("role")}
              className="w-full pl-4 pr-8 py-3 rounded-lg border border-gray-200 focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/20 appearance-none bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNyAxMGw1IDUgNS01eiIvPjwvc3ZnPg==')] bg-[position:right_0.5rem_center] bg-[size:1.5em]"
            >
              <option value="">Select Your Role</option>
              <option value="backer">Backer</option>
              <option value="fundraiser">Fundraiser</option>
            </select>
          </div>
          {errors.role && (
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center mt-1 text-sm text-red-500"
            >
              <FiAlertCircle className="mr-1" /> {errors.role.message}
            </motion.p>
          )}
        </motion.div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Create Account
          </motion.button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#1a1a2e] font-semibold hover:underline underline-offset-4"
          >
            Sign In
          </a>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default RegisterPage;
