import { Skeleton } from "@/components/ui/skeleton";
import { navLinks } from "@/lib/constants/Constant";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  LayoutDashboard,
  Home,
  UserIcon,
  Star,
  FileUser,
  CircleDollarSign,
  ChartArea,
} from "lucide-react";
import Swal from "sweetalert2";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Anda akan keluar dari sesi login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      signOut();
    }
  };

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[10000] w-full h-screen bg-black opacity-70 transition-transform duration-500 ${navOpen}`}
        onClick={closeNav}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-[10006] flex flex-col h-full w-[80%] sm:w-[60%] bg-white transform transition-transform duration-500 delay-300 ${navOpen}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/20">
          <Link href="/" onClick={closeNav}>
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 s:w-12 sm:h-10">
                <Image
                  src="/images/dibalikruang-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-lg sm:text-xl">
                dibalikruang.
              </span>
            </div>
          </Link>
          <CgClose
            onClick={closeNav}
            className="cursor-pointer w-6 h-6 sm:w-10 sm:h-10"
          />
        </div>

        {/* Nav Links */}
        <div className="flex flex-col space-y-6 mt-6 ml-12">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url} onClick={closeNav}>
              <div className="flex items-center gap-3 text-[20px] hover:border-b-[1.5px] pb-1 hover:border-white sm:text-[30px]">
                {/* Icon: contoh menggunakan kondisi berdasarkan label */}
                {link.label === "Home" ? (
                  <Home className="w-5 h-5" />
                ) : link.label === "Advisors" ? (
                  <UserIcon className="w-5 h-5" />
                ) : link.label === "Testimonial" ? (
                  <Star className="w-5 h-5" />
                ) : link.label === "Contact" ? (
                  <FileUser className="w-5 h-5" />
                ) : (
                  <LayoutDashboard className="w-5 h-5" />
                )}
                <p className="nav__link">{link.label}</p>
              </div>
            </Link>
          ))}

          {status === "loading" ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : status === "authenticated" ? (
            <Link href={"/financial-advisor"} onClick={closeNav}>
              <div className="flex items-center gap-3 text-[20px] hover:border-b-[1.5px] pb-1 hover:border-white sm:text-[30px]">
                <CircleDollarSign className="w-5 h-5" />
                <p className="nav__link">Financial Check Up</p>
              </div>
            </Link>
          ) : null}
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 border-t border-white/20 flex flex-col gap-4">
          {/* User Info + Logout */}
          {status === "authenticated" && (
            <div className="flex flex-col space-y-3">
              {/* Logout Button */}
              {session?.user.role === "financial-advisor" && (
                <Link href="/financial-advisor">
                  <button
                    type="button"
                    className="flex ml-5 items-center gap-4 font-semibold text-sm"
                  >
                    <ChartArea className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex ml-5 items-center gap-4 text-red-500 font-semibold text-sm"
              >
                <LogOut className="w-5 h-5" />
                Keluar
              </button>

              {/* User Info */}
              <div className="relative h-8 rounded-full border-t-1 border-black/20 px-2 flex items-center space-x-2">
                <Avatar className="h-10 w-10 border-2 rounded-full">
                  <AvatarImage
                    src="/images/profile-anonim.png"
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">
                  {session?.user?.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
