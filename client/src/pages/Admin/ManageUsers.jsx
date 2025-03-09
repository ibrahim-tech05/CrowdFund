import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers, deleteUser } from "../../api/admin";

const ManageUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const loggedInRole = localStorage.getItem("role");

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.filter(user => user.role !== "admin"));
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load users", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser._id);
        setUsers(users.filter(user => user._id !== selectedUser._id));
        toast.success("User deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to delete user", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8 ">
      <div className="mx-auto max-w-7xl">
        <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Manage Users
        </motion.h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-4">
              {users.map((user) => (
                <motion.div key={user._id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }} className="p-6 transition-shadow shadow-lg bg-white/10 rounded-xl backdrop-blur-lg hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-purple-500/20">
                        {user.role === "admin" ? <FaUserShield className="w-6 h-6 text-purple-400" /> : <FaUser className="w-6 h-6 text-blue-400" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <p className="text-gray-300">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>{user.role}</span>
                      {loggedInRole === "admin" && user.role !== "admin" && (
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDeleteClick(user)} className="p-2 text-red-400 transition-colors rounded-lg hover:bg-red-500/20">
                          <FaTrash className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {users.length === 0 && !loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-xl text-center text-gray-400">No users found</motion.div>}
          </AnimatePresence>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="p-6 bg-[#1a1a2e] rounded-lg shadow-lg text-white w-96">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <p className="mt-2">Are you sure you want to delete <span className="font-bold">{selectedUser.name}</span>?</p>
              <div className="flex justify-end mt-4 space-x-4">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageUsers;