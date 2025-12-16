import { useState } from "react";
import { useProfileQuery } from "../Bothfeatures/features/api/authapi";
import ProfileHeader from "../components/profile/profileheader";
import ProfileTabs from "../components/profile/profiletab";

export default function Profile() {
  const { data, isLoading, isError, error } = useProfileQuery();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile: {error?.data?.message || error?.error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <ProfileHeader profile={data?.profile} />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
      />
    </div>
  );
}
