import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

// Guest Pages
import Home from "./pages/Guest/Home";
import ExploreChampions from "./pages/Guest/ExploreChampions";
import About from "./pages/Guest/About";
import ContactUs from "./pages/Guest/ContactUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Logout from "./pages/Logout";

// Backer Pages
import BackerHome from "./pages/Backer/BackerHome";
import BackerSaved from "./pages/Backer/BackerSaved";
import BackerProfile from "./pages/Backer/BackerProfile";
import PaymentPage from "./pages/PaymentPage";

// Fundraiser Pages
import FundraiserDashboard from "./pages/Fund/FundraiserDashboard";
import CreateCampaign from "./pages/Fund/CreateCampaign";
import MyCampaigns from "./pages/Fund/MyCampaigns";
import FundraiserProfile from "./pages/Fund/FundraiserProfile";
import CreateSuccessStory from "./pages/Fund/CreateSuccessStory";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCampaigns from "./pages/Admin/ManageCampaigns";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";
import AppLayout from "./components/AppLayout";

const App = () => {
  return (
    <Router>
      <AppLayout>
          <ToastContainer />
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreChampions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<Logout />} />

            {/* Backer Routes */}
            <Route path="/backer" element={<BackerHome />} />
            <Route path="/backer/explore" element={<ExploreChampions />} />
            <Route path="/backer/saved" element={<BackerSaved />} />
            <Route path="/backer/profile" element={<BackerProfile />} />
            <Route path="/donate/:id" element={<PaymentPage />} />

            {/* Fundraiser Routes */}
            <Route path="/fundraiser/dashboard" element={<FundraiserDashboard />} />
            <Route path="/fundraiser/create-campaign" element={<CreateCampaign />} />
            <Route path="/fundraiser/my-campaigns" element={<MyCampaigns />} />
            <Route path="/fundraiser/success-story" element={<CreateSuccessStory />} />
            <Route path="/fundraiser/profile" element={<FundraiserProfile />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-campaigns" element={<ManageCampaigns />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Routes>
       
          </AppLayout>
    </Router>
  );
};

export default App;
