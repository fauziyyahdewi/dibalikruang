import { navLinks } from "@/lib/constants/Constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div>
      {/* overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[10000] bg-black opacity-70 w-full h-screen`}
      ></div>

      {/* Navlink */}
      <div
        className={`text-white ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-brand-brown space-y-6 z-[10006]`}
      >
        {navLinks.map((link) => {
          return (
            <Link key={link.id} href={link.url}>
              <p className="nav__link text-white text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
                {link.label}
              </p>
            </Link>
          );
        })}

        {/* close icon */}
        <CgClose
          onClick={closeNav}
          className="absolute top-[3rem] right-[2rem] sm:w-10 sm:h-10 w-8 h-8"
        />
      </div>
    </div>
  );
};

export default MobileNav;