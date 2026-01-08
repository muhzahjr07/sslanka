
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-bg text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <i className="fa-solid fa-computer-mouse text-sm"></i>
              </div>
              <span className="text-xl font-bold">Smart Solutions Lanka</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leading and trusted provider of comprehensive IT solutions and services in Sri Lanka. Established in 2019.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-500">Home</a></li>
              <li><a href="#" className="hover:text-blue-500">Our Services</a></li>
              <li><a href="#" className="hover:text-blue-500">Product Store</a></li>
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <i className="fa-solid fa-location-dot mt-1 text-blue-500"></i>
                <span>Bambalapitiya, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-phone text-blue-500"></i>
                <span>+94 117 202 404</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <span>info@smartsolutionslanka.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest IT solutions.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:row justify-between items-center text-gray-500 text-xs">
          <p>© 2025 Smart Solutions Lanka Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
