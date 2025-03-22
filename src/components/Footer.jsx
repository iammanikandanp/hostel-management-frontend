import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import logo from "../assets/img/images.png";

export const Footer = () => {
  return (
    <footer className="footers bg-opacity-50 text-white py-6 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo Section */}
        <div className="mb-4 md:mb-0 flex justify-center items-center flex-col text-center">
          <img src={logo} alt="Company Logo" className="w-24" />
          <h3 className="text-lg font-semibold">Easc Hostel Management</h3>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-right flex flex-col items-center ">
          <h1 className="text-lg  font-semibold mb-2">Contact</h1>

          <div className="space-y-2 md:items-end">
            <p className="flex items-center gap-2">
              <Phone size={20} color="green" /> 
              <a href="tel:+914242430004" className="text-white">0424 2430004</a>, 
              <a href="tel:+914242430095" className="text-white"> 0424 2430095</a>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={20} color="red" />
              <a href="mailto:easchostelmanagement@gmail.com" className="text-white">
                easchostelmanagement@gmail.com
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={20} color="red" />
              <a href="mailto:erodearts2006@yahoo.co.in" className="text-white">
                erodearts2006@yahoo.co.in
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={20} color="red" />
              <a href="mailto:info@easc.ac.in" className="text-white">
                info@easc.ac.in
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Globe size={24} color="black" />
              <a className="text-white" href="http://www.easc.ac.in" target="_blank" rel="noopener noreferrer">
                www.easc.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-4 border-t border-gray-700 pt-3 w-full">
        &copy; 2025 EASC Hostel Management. All rights reserved.
      </div>
      <p className="text-sm text-gray-400 text-center">
        System Version 1.0 | Developed by{" "}
        <span className="font-semibold">
          <a href="https://github.com/iammanikandanp/" className="text-blue-400">
            Manikandan P.
          </a>
        </span>
      </p>
    </footer>
  );
};
