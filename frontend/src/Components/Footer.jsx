import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="border-t bg-gray-700 text-white py-6 flex justify-center">
        <div className="container mx-auto flex flex-col items-center text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-sm">
            {/* Company Info */}
            <div>
              <h2 className="text-lg font-semibold mb-2">National Institute of Electronics & Information Technology(NIELIT) </h2>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Career</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p className="text-gray-400">NIELIT Bhawan, Plot No. 3, PSP Pocket</p>
              <p className="text-gray-400">Sector-8, Dwarka, New Delhi-110077</p>
              <p className="text-gray-400">Phone: <a href="tel:01144446777" className="hover:text-white">011-44446777</a></p>
              <p className="text-gray-400">Email: <a href="mailto:contact@nielit.gov.in" className="hover:text-white">contact@nielit.gov.in</a></p>
            </div>

            {/* Location Map */}
            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9144816154994!2d77.06115847544984!3d28.54824467564562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a2b0e8f0cfd%3A0xa8f8bb6bb9396315!2sNational%20Institute%20of%20Electronics%20%26%20Information%20Technology!5e0!3m2!1sen!2sin!4v1707923454321"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-gray-800 py-4 flex justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between w-full max-w-5xl text-sm text-center">
          <div className="text-xl font-semibold">
            Nielit<span className="text-blue-500 font-bold">Track</span>
          </div>
          <p className="text-gray-400">&copy; 2025 NIELIT Delhi. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <a href="#" aria-label="GitHub"><FaGithub size="2.0rem"  className="h-5 hover:text-blue-500 transition-colors" /></a>
            <a href="#" aria-label="YouTube"><BsYoutube size="2.0rem" className="h-5 hover:text-red-500 transition-colors" /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin size="2.0rem" className="h-5 hover:text-blue-600 transition-colors" /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
