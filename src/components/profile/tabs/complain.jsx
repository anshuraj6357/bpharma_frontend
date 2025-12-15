export default function Complaints({ complaints }) {
  return (
    <div className="space-y-3">
      {complaints?.map((c) => (
        <div key={c._id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">{c.title}</p>
          <p className="text-gray-600">{c.status}</p>
        </div>
      ))}
    </div>
  );
}
