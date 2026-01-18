import { Mail, Wallet, ShieldCheck } from "lucide-react";

export default function ProfileHeader({ profile }) {
  const usernameInitial =
    profile?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <section className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center p-6 md:p-8">

        {/* ================= AVATAR ================= */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div
              className="h-20 w-20 md:h-24 md:w-24 rounded-full
              bg-gradient-to-br from-indigo-500 to-purple-600
              flex items-center justify-center
              text-white text-3xl md:text-4xl font-extrabold
              shadow-inner select-none"
            >
              {usernameInitial}
            </div>

            {/* Online Indicator */}
            <span
              className="absolute bottom-1 right-1 h-4 w-4
              rounded-full bg-green-500 border-2 border-white"
            />
          </div>
        </div>

        {/* ================= USER INFO ================= */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
            {profile?.username}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm">
            <Mail className="w-4 h-4" />
            <span className="break-all">{profile?.email}</span>
          </div>

          {/* Role & Status */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
            <span
              className="inline-flex items-center gap-1 px-3 py-1
              bg-indigo-100 text-indigo-700
              text-xs font-semibold rounded-full"
            >
              <ShieldCheck className="w-4 h-4" />
              {profile?.role}
            </span>

            <span
              className="inline-flex items-center gap-1 px-3 py-1
              bg-green-100 text-green-700
              text-xs font-semibold rounded-full"
            >
              Active User
            </span>
          </div>
        </div>

        {/* ================= WALLET ================= */}
        <div className="flex justify-center md:justify-end">
          <div
            className="flex flex-col items-center md:items-end
            bg-gray-50 border border-gray-200
            rounded-xl px-5 py-4 min-w-[160px]"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <Wallet className="w-4 h-4" />
              Wallet Balance
            </div>

            <p className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
              ₹{Number(profile?.walletBalance ?? 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
