export default function Overview({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Stat title="Reviews" value={data?.reviews?.length || 0} />
      <Stat title="Complaints" value={data?.complain?.length || 0} />
      <Stat title="Payments" value={data?.payment?.length || 0} />
      <Stat title="Wishlist" value={data?.profile?.wishlist?.length || 0} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 text-center">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
