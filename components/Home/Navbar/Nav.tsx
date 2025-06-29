"use client";

import { navLinks } from "@/lib/constants/Constant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartArea, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Swal from "sweetalert2";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const { data: session, status } = useSession();
  console.log("SESSION STATUS:", status, session);

  useEffect(() => {
    const handler = () => {
      setNavBg(window.scrollY >= 40);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
    <div
      className={`fixed ${
        navBg ? "bg-white shadow-md" : "fixed"
      } w-full transition-all duration-200 lg:h-[12vh] h-[8vh] z-[1000]`}
    >
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-15 md:w-25"
        >
          <Link href={"/"}>
            <Image
              className="w-full cursor-pointer"
              width={100}
              height={100}
              src="/images/Logo-text.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* MENU */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.url === "/") {
                  window.location.href = "/";
                } else {
                  const isHome = window.location.pathname === "/";
                  if (isHome) {
                    document
                      .querySelector(link.url)
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = `/${link.url}`;
                  }
                }
              }}
              className="nav__link"
            >
              {link.label}
            </button>
          ))}

          {status === "loading" ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : status === "authenticated" ? (
            <Link href={"/financial-check"}>
              <button className="md:px-6 md:py-2 px-6 py-2 text-white font-semibold text-base bg-brand-orange hover:bg-brand-gold transition-all duration-200 rounded-full cursor-pointer">
                Financial Check Up
              </button>
            </Link>
          ) : null}
        </div>

        {/* BUTTON */}
        <div className="flex items-center space-x-4">
          {/* Login & Join Us (unauthenticated) */}
          {status === "unauthenticated" && (
            <div className="flex items-center space-x-4">
              <Link className="font-semibold" href={"/login"}>
                Login
              </Link>
              <Link href={"/signup"}>
                <button className="md:px-6 md:py-2 px-6 py-2 text-white font-semibold text-base bg-brand-orange hover:bg-brand-gold transition-all duration-200 rounded-full cursor-pointer">
                  Join Us
                </button>
              </Link>
            </div>
          )}

          {/* User Dropdown (authenticated) */}
          {status === "authenticated" && (
            <div className="hidden lg:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 rounded-full px-2 flex items-center space-x-2"
                  >
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
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 z-[1100]"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem className="font-normal">
                    <Link href={"/profile"}>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {session?.user.role === "financial-advisor" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/financial-advisor">
                          <ChartArea className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile menu button - tetap tampil */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-black lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
