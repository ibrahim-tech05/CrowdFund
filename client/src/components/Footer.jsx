const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-white py-10">
      <div className="grid grid-cols-1 gap-6 px-6 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-4">
        
        <div>
          <h3 className="mb-3 text-xl font-bold">CrowdFund</h3>
          <p className="text-sm">Empowering dreams through collective support.</p>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/explore" className="hover:text-gray-300">Explore Campaigns</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold">Follow Us</h4>
          <ul className="space-y-2">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold">Contact Us</h4>
          <p className="text-sm">Email: support@crowdfund.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
        </div>
      </div>

      <div className="pt-6 mt-8 text-center border-t border-gray-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} CrowdFund. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
