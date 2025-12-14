import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space } from 'antd';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* TOP SECTION: 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-gray-800 pb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              SHOPE<span className="text-red-500">MALL</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop destination for fashion, electronics, and lifestyle products. Quality
              guaranteed.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-red-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-500 shrink-0" size={20} />
                <span>123 Street Name, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-500 shrink-0" size={20} />
                <span>+84 901 234 567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-500 shrink-0" size={20} />
                <span>support@shopemall.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for latest updates and offers.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600 focus:bg-gray-800"
              />
              <Button
                type="primary"
                icon={<Send size={16} />}
                className="bg-red-600 hover:bg-red-700! border-none h-10"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 ShopEmall. All Rights Reserved.</p>
          <div className="flex gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-6 bg-white p-1 rounded"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6 bg-white p-1 rounded"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              className="h-6 bg-white p-1 rounded"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
