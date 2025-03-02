import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ManageUsers = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Backer" },
    // Add more users dynamically
  ]);

  return (
    <>
      <Navbar userRole="admin" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageUsers;
