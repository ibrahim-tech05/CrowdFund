const Footer = () => {
  return (
    <footer className=" bg-gradient-to-t from-[#1a1a2e] to-[#16213e] text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CrowdFund</h3>
            <p className="text-sm">
              Empowering dreams through collective support.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/explore" className="hover:text-gray-200">
                  Explore Campaigns
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: support@crowdfund.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2023 CrowdFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
