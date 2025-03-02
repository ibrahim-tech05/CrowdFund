import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Guest/Home";
import ExploreChampions from "./pages/Guest/ExploreChampions";
import About from "./pages/Guest/About";
import ContactUs from "./pages/Guest/ContactUs";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import BackerHome from "./pages/Backer/BackerHome";
import BackerSaved from "./pages/Backer/BackerSaved";
import BackerProfile from "./pages/Backer/BackerProfile";
import FundraiserDashboard from "./pages/Fund/FundraiserDashboard";
import CreateCampaign from "./pages/Fund/CreateCampaign";
import MyCampaigns from "./pages/Fund/MyCampaigns";
import Messages from "./pages/Fund/Messages";
import FundraiserProfile from "./pages/Fund/FundraiserProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCampaigns from "./pages/Admin/ManageCampaigns";
import ManageUsers from "./pages/Admin/ManageUsers";
import FundDisbursement from "./pages/Admin/FundDisbursement";
import Reports from "./pages/Admin/Reports";

const App = () => {
  const [userRole, setUserRole] = useState("guest"); // Change this to "backer", "fundraiser", or "admin" to test different roles

  return (
    <Router>
      <Navbar userRole={userRole} />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreChampions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/login"
          element={<LoginPage setUserRole={setUserRole} />}
        />
        <Route
          path="/register"
          element={<RegisterPage setUserRole={setUserRole} />}
        />

        {/* Backer Routes */}
        <Route path="/backer" element={<BackerHome />} />
        <Route path="/backer/explore" element={<ExploreChampions />} />
        <Route path="/backer/saved" element={<BackerSaved />} />
        <Route path="/backer/profile" element={<BackerProfile />} />

        {/* Fundraiser Routes */}
        <Route path="/fundraiser/dashboard" element={<FundraiserDashboard />} />
        <Route
          path="/fundraiser/create-campaign"
          element={<CreateCampaign />}
        />
        <Route path="/fundraiser/my-campaigns" element={<MyCampaigns />} />
        <Route path="/fundraiser/messages" element={<Messages />} />
        <Route path="/fundraiser/profile" element={<FundraiserProfile />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-campaigns" element={<ManageCampaigns />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/fund-disbursement" element={<FundDisbursement />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;
