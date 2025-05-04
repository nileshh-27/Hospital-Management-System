
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EdocHospital</h3>
            <p className="text-gray-300 mb-4">
              Providing exceptional healthcare services with compassion and expertise since 1995.
              Committed to improving lives through innovative medical care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-white">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-gray-300 hover:text-white">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/cardiology" className="text-gray-300 hover:text-white">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link to="/services/neurology" className="text-gray-300 hover:text-white">
                  Neurology
                </Link>
              </li>
              <li>
                <Link to="/services/pediatrics" className="text-gray-300 hover:text-white">
                  Pediatrics
                </Link>
              </li>
              <li>
                <Link to="/services/orthopedics" className="text-gray-300 hover:text-white">
                  Orthopedics
                </Link>
              </li>
              <li>
                <Link to="/services/diagnostics" className="text-gray-300 hover:text-white">
                  Diagnostics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 mt-1" />
                <span className="text-gray-300">123 Medical Drive, Healthcare City, HC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400" />
                <a href="mailto:info@edochospital.com" className="text-gray-300 hover:text-white">
                  info@edochospital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EdocHospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
