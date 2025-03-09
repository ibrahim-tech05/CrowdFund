import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    // Redirect to login after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 text-center bg-white shadow-md rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700">Logging out...</h2>
        <p className="text-gray-500">You will be redirected to the login page shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
