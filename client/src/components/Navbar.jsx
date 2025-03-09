import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaPlus, FaCog, FaUsers, FaChartLine } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const navigate = useNavigate();

  // Handle role change from localStorage
  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem("role") || "guest";
      setUserRole(role);
    };

    updateRole(); // Initial role check

    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation links
  const navConfig = {
    guest: [
      { path: "/", label: "Home" },
      { path: "/explore", label: "Explore Campaigns" },
      { path: "/about", label: "About Us" },
      { path: "/contact", label: "Contact" },
      { path: "/login", label: "Login/Signup" }
    ],
    backer: [
      { path: "/backer", label: "Home" },
      { path: "/backer/explore", label: "Explore Campaigns" },
      { path: "/backer/saved", label: "Saved Campaigns" },
      { path: "/backer/profile", label: "Profile", icon: FaUser },
      { path: "/logout", label: "Logout", icon: FaSignOutAlt }
    ],
    fundraiser: [
      { path: "/fundraiser/dashboard", label: "Dashboard", icon: FaTachometerAlt },
      { path: "/fundraiser/create-campaign", label: "Create Campaign", icon: FaPlus },
      { path: "/fundraiser/my-campaigns", label: "My Campaigns" },
      { path: "/fundraiser/success-story", label: "Create Success Story", icon: FaPlus },
      { path: "/fundraiser/profile", label: "Profile", icon: FaUser },
      { path: "/logout", label: "Logout", icon: FaSignOutAlt }
    ],
    admin: [
      { path: "/admin/dashboard", label: "Admin Dashboard", icon: FaTachometerAlt },
      { path: "/admin/manage-campaigns", label: "Manage Campaigns", icon: FaCog },
      { path: "/admin/manage-users", label: "Manage Users", icon: FaUsers },
      { path: "/admin/reports", label: "Reports & Transactions", icon: FaChartLine },
      { path: "/logout", label: "Logout", icon: FaSignOutAlt }
    ]
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "py-3 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] shadow-xl" 
                : "py-2 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white transition duration-300 hover:text-gray-200">
              CrowdFund
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navConfig[userRole].map((item, index) => (
              <Link key={index} to={item.path} className="px-3 py-2 text-sm font-medium text-white hover:text-gray-200">
                {item.icon && <item.icon className="inline-block mr-1" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="text-white md:hidden">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
