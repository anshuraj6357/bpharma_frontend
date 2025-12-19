import Overview from "./tabs/overview";
import Reviews from "./tabs/review";
import Complaints from "./tabs/complain";
import Payments from "./tabs/payment";

export default function ProfileTabs({ activeTab, setActiveTab, data }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
  
  ];

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "overview" && <Overview data={data} />}
        {activeTab === "reviews" && <Reviews reviews={data?.reviews} />}
      </div>
    </div>
  );
}