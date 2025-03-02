import { useState, useEffect } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaCompass,
  FaHeart,
  FaTachometerAlt,
  FaPlus,
  FaEnvelope,
  FaCog,
  FaUsers,
  FaMoneyCheckAlt,
  FaChartLine,
} from "react-icons/fa";

const Navbar = ({ userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-lg  ${
        isScrolled
          ? "py-3 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] shadow-xl"
          : "py-2 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-white text-2xl font-bold font-sans hover:text-gray-200 transition duration-300"
            >
              CrowdFund
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {userRole === "guest" && (
              <>
                <a
                  href="/"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Home
                </a>
                <a
                  href="/explore"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Explore Campaigns
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Contact
                </a>
                <a
                  href="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login/Signup
                </a>
              </>
            )}

            {userRole === "backer" && (
              <>
                <a
                  href="/backer"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Home
                </a>
                <a
                  href="/backer/explore"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Explore Campaigns
                </a>
                <a
                  href="/backer/saved"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Saved Campaigns
                </a>
                <a
                  href="/backer/profile"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaUser className="inline-block mr-1" /> Profile
                </a>
                <a
                  href="/logout"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}

            {userRole === "fundraiser" && (
              <>
                <a
                  href="/fundraiser/dashboard"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaTachometerAlt className="inline-block mr-1" /> Dashboard
                </a>
                <a
                  href="/fundraiser/create-campaign"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaPlus className="inline-block mr-1" /> Create Campaign
                </a>
                <a
                  href="/fundraiser/my-campaigns"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  My Campaigns
                </a>
                <a
                  href="/fundraiser/messages"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaEnvelope className="inline-block mr-1" /> Messages
                </a>
                <a
                  href="/fundraiser/profile"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaUser className="inline-block mr-1" /> Profile
                </a>
                <a
                  href="/logout"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}

            {userRole === "admin" && (
              <>
                <a
                  href="/admin/dashboard"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaTachometerAlt className="inline-block mr-1" /> Admin
                  Dashboard
                </a>
                <a
                  href="/admin/manage-campaigns"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaCog className="inline-block mr-1" /> Manage Campaigns
                </a>
                <a
                  href="/admin/manage-users"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaUsers className="inline-block mr-1" /> Manage Users
                </a>
                <a
                  href="/admin/fund-disbursement"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaMoneyCheckAlt className="inline-block mr-1" /> Fund
                  Disbursement
                </a>
                <a
                  href="/admin/reports"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaChartLine className="inline-block mr-1" /> Reports &
                  Transactions
                </a>
                <a
                  href="/logout"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userRole === "guest" && (
              <>
                <a
                  href="/"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Home
                </a>
                <a
                  href="/explore"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Explore Campaigns
                </a>
                <a
                  href="/about"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Contact
                </a>
                <a
                  href="/login"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Login/Signup
                </a>
              </>
            )}

            {userRole === "backer" && (
              <>
                <a
                  href="/"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Home
                </a>
                <a
                  href="/explore"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Explore Campaigns
                </a>
                <a
                  href="/saved"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  Saved Campaigns
                </a>
                <a
                  href="/profile"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaUser className="inline-block mr-1" /> Profile
                </a>
                <a
                  href="/logout"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}

            {userRole === "fundraiser" && (
              <>
                <a
                  href="/dashboard"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaTachometerAlt className="inline-block mr-1" /> Dashboard
                </a>
                <a
                  href="/create-campaign"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaPlus className="inline-block mr-1" /> Create Campaign
                </a>
                <a
                  href="/my-campaigns"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  My Campaigns
                </a>
                <a
                  href="/messages"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaEnvelope className="inline-block mr-1" /> Messages
                </a>
                <a
                  href="/profile"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaUser className="inline-block mr-1" /> Profile
                </a>
                <a
                  href="/logout"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}

            {userRole === "admin" && (
              <>
                <a
                  href="/admin-dashboard"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaTachometerAlt className="inline-block mr-1" /> Admin
                  Dashboard
                </a>
                <a
                  href="/manage-campaigns"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaCog className="inline-block mr-1" /> Manage Campaigns
                </a>
                <a
                  href="/manage-users"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaUsers className="inline-block mr-1" /> Manage Users
                </a>
                <a
                  href="/fund-disbursement"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaMoneyCheckAlt className="inline-block mr-1" /> Fund
                  Disbursement
                </a>
                <a
                  href="/reports"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaChartLine className="inline-block mr-1" /> Reports &
                  Transactions
                </a>
                <a
                  href="/logout"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900 transition duration-300"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
