import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-16 ">{children}</main>
    <Footer />
  </div>
  );
};

export default AppLayout;
