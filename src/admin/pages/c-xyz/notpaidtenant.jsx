import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setAlltenants } from "../../../Bothfeatures/notpaidtenantslice";


export default function NotPaidTenants  ()  {
    const navigate=useNavigate()
 
  const tenants = useSelector((state) => state.tenants.tenants);
  console.log(tenants.tenants)


  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">🧾 Not Paid Tenants</h2>
      {tenants.length > 0 ? (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Rent</th>
              <th className="px-4 py-2 text-left">Dues</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant._id} className="border-b">
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">{tenant.contactNumber}</td>
                <td className="px-4 py-2">₹{tenant.Rent}</td>
                <td className="px-4 py-2 text-red-500">₹{tenant.dues}</td>
                <td className="px-4 py-2">
                  {tenant.paymentstatus === "over-dues" ? (
                    <span className="text-red-600 font-semibold">Overdue</span>
                  ) : (
                    <span className="text-gray-600">{tenant.paymentstatus}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm">All tenants are up to date ✅</p>
      )}
    </div>
  );
};

