export default function Reviews({ reviews }) {
  if (!reviews?.length) return <p>No reviews yet</p>;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">⭐ {r.rating}/5</p>
          <p className="text-gray-600">{r.review}</p>
        </div>
      ))}
    </div>
  );
}
