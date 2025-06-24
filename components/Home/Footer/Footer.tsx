import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-white py-10">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            {/* Logo */}
            <div className="w-25 md:w-30">
              <Image
                className="w-full cursor-pointer"
                width={100}
                height={100}
                src="/images/Logo-text.png"
                alt="logo"
              />
            </div>
            {/* Description */}
            <div className="mt-4 text-sm font-medium leading-[1.5rem] w-[80%] text-gray-600">
              <p>/Learn, Earn, Return/</p>
              <p>Connecting Your First Insurance Media</p>
            </div>
          </div>
          {/* About us Link */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">About Us</h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li>Support Center</li>
              <li>Customer Support</li>
              <li>About Us</li>
              <li>Copyright</li>
              <li>Popular Campaign</li>
            </ul>
          </div>

          {/* Our Information Link */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Our Information
            </h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Terms & Condition</li>
              <li>Site Map</li>
              <li>Store Hours</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Surabaya, Indonesia
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                +62 8123456789
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2" />
                WeekDays(8am - 4pm)
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                dibalikruang@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t-[0.5px] border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p className="text-center md:text-left">
            Copyright © 2025 Nur Fauziyyah Dewi. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>Social Media:</span>
            <Link href="https://www.instagram.com/dibalik.ruang/" className="text-gray-500 hover:text-gray-800">
              <FaInstagram />
            </Link>
            <Link href="https://tr.ee/_j7jkf4OpR" className="text-gray-500 hover:text-gray-800">
              <FaTiktok />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <FaFacebook />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
