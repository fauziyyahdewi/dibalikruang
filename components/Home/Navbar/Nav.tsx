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
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const { data: session, status } = useSession();
  console.log("SESSION STATUS:", status, session);

  useEffect(() => {
    const handler = () => {
      setNavBg(window.scrollY >= 97);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed ${
        navBg ? "bg-white shadow-md" : "fixed"
      } w-full transition-all duration-200 h-[12vh] z-[1000]`}
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
            <Link key={link.id} href={link.url}>
              <p className="nav__link">{link.label}</p>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="flex items-center space-x-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>
          ) : status === "unauthenticated" ? (
            <>
              <Link className="font-semibold" href={"/login"}>
                Login
              </Link>
              <Link href={"/signup"}>
                <button className="md:px-6 md:py-2 px-6 py-2 text-white font-semibold text-base bg-brand-orange hover:bg-brand-gold transition-all duration-200 rounded-full cursor-pointer">
                  Join Us
                </button>
              </Link>
            </>
          ) : (
            // Dropdown session user
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 rounded-full px-2 flex items-center space-x-2"
                >
                  <Avatar className="h-10 w-10 border-2  rounded-full">
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
                {/* <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
