export default function Payments({ payments }) {
  if (!payments?.length) return <p>No payments yet</p>;

  return (
    <div className="space-y-3">
      {payments.map((p) => (
        <div key={p._id} className="bg-white p-4 rounded shadow">
          <p>₹ {p.amount}</p>
          <p className="text-gray-500">{p.status}</p>
        </div>
      ))}
    </div>
  );
}
