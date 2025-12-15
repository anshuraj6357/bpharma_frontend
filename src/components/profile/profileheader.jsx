export default function ProfileHeader({ profile }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-8 transition-all hover:shadow-xl">
      
      {/* Avatar */}
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-inner">
          {profile?.username?.[0]?.toUpperCase()}
        </div>
        {/* Online status indicator */}
        <span className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 border-2 border-white rounded-full animate-pulse" />
      </div>

      {/* Profile Info */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800">{profile?.username}</h2>
        <p className="text-gray-500 mt-1">{profile?.email}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-block px-4 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full shadow-sm">
            {profile?.role}
          </span>

          {/* Optional: Add last login or status */}
          {profile?.lastLogin && (
            <span className="text-gray-400 text-sm">
              Last login: {new Date(profile.lastLogin).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}