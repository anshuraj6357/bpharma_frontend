
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <p className="text-lg font-semibold text-gray-800 tracking-wide">
      {value || "—"}
    </p>
  </div>
);


