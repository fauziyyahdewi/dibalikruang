// import { signOutAccount } from "@/app/actions/auth/signout";
import { LogOut } from "lucide-react";
import React from "react";

type Props = {
  confirm: boolean;
};

export const ButtonSignOutMobile = (confirm: Props) => {
  return (
    <form action="">
      <button
        type="submit"
        className="flex px-10 py-8  items-center gap-4 text-red-500 font-semibold text-sm"
      >
        <LogOut className="w-5 h-5" />
        Keluar
      </button>
    </form>
  );
};

export const ButtonSignOut = (confirm: Props) => {
  return (
    <form action="">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </form>
  );
};
