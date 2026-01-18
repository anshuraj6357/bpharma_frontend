export default function Overview({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <Stat
        title="Reviews"
        value={data?.reviews?.length || 0}
        color="from-indigo-500 to-indigo-700"
      />
      <Stat
        title="Complaints"
        value={data?.complain?.length || 0}
        color="from-red-500 to-red-700"
      />
      <Stat
        title="Payments"
        value={data?.payment?.length || 0}
        color="from-emerald-500 to-emerald-700"
      />
      <Stat
        title="Wishlist"
        value={data?.profile?.wishlist?.length || 0}
        color="from-yellow-500 to-yellow-700"
      />
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-r ${color}
        rounded-2xl p-8
        text-white
        shadow-xl
        hover:scale-[1.03]
        transition-transform duration-300
      `}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-white/10 blur-2xl"></div>

      <div className="relative z-10 text-center">
        <p className="text-lg font-medium opacity-90 tracking-wide">
          {title}
        </p>
        <h3 className="mt-3 text-5xl font-extrabold">
          {value}
        </h3>
      </div>
    </div>
  );
}