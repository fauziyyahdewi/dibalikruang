import ComponentsUsersAccountSettingsTabs from "@/components/Profile/ComponentsUsersAccountSettingsTabs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account Setting",
};

const Profile = () => {
  return (
    <div>
      <ComponentsUsersAccountSettingsTabs />
    </div>
  );
};

export default Profile;
