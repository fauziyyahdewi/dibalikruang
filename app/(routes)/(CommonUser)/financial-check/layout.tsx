import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ResponsiveNav />
      {children}
      {/* Bottom Section */}
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-gray-300 py-2 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p className="text-center md:text-left">
            Copyright © 2025 Nur Fauziyyah Dewi. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>Social Media:</span>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <FaInstagram />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
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
    </main>
  );
}
