export default function ProfileHeader({ profile }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
      <div className="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-white text-3xl font-bold">
        {profile?.username?.[0]?.toUpperCase()}
      </div>

      <div>
        <h2 className="text-2xl font-bold">{profile?.username}</h2>
        <p className="text-gray-600">{profile?.email}</p>

        <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          {profile?.role}
        </span>
      </div>
    </div>
  );
}
