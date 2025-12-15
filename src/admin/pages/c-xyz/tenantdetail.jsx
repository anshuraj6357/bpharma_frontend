

import { react, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery } from "../../../Bothfeatures/features2/api/tenant"



export default function TenantDetails() {
    const navigate = useNavigate();
    const [selectedTenant, setselectedTenant] = useState(null)

    const { id } = useParams()
    const { data, isLoading, error } = useGetTenantByIdQuery(id)
    useEffect(() => { setselectedTenant(data?.foundTenant) }, [data])

    if (isLoading) return <p>Loading tenant details...</p>;
    if (error) return <p>Failed to load tenant details 😢</p>;
    console.log(selectedTenant)



    const handleEditTenant = (id) => {
        navigate(`/edittenant/${id}`)


    };

    return (
        <>{
            data.foundTenant ? <>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                            <h2 className="text-2xl text-[#1e3a5f]">Tenant Profile</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Personal Info */}
                            <div>
                                <h3 className="text-lg text-[#1e3a5f] mb-4">
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Full Name</p>
                                        <p className="text-[#1e3a5f]">{selectedTenant?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone Number</p>
                                        <p className="text-[#1e3a5f]">{selectedTenant?.contactNumber
                                        }</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email Address</p>
                                        <p className="text-[#1e3a5f]">{selectedTenant?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tenant ID</p>
                                        <p className="text-[#1e3a5f]">
                                            TN{selectedTenant?._id.toString().padStart(4, "0")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Property Info */}
                            <div>
                                <h3 className="text-lg text-[#1e3a5f] mb-4">
                                    Property Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Property Name</p>
                                        <p className="text-[#1e3a5f]">{selectedTenant?.property}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Room Number</p>
                                        <p className="text-[#1e3a5f]">
                                            Room {selectedTenant?.roomNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Floor</p>
                                        <p className="text-[#1e3a5f]">
                                            Floor {selectedTenant?.floor}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Check-In Date</p>
                                        <p className="text-[#1e3a5f]">
                                            {new Date(selectedTenant?.createdAt).toLocaleDateString(
                                                "en-IN"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Monthly Rent</p>
                                        <p className="text-[#ff6b35] text-lg">
                                            ₹{selectedTenant?.Rent}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-sm ${selectedTenant?.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {selectedTenant?.status === "Active"
                                                ? "Active"
                                                : "Notice Period"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* complain */}

                            {/* Documents */}
                            {/* <div>
                                <h3 className="text-lg text-[#1e3a5f] mb-4">
                                    Uploaded Documents
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedTenant.documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} className="text-gray-600" />
                                                <span className="text-sm text-gray-700">{doc}</span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    console.log(
                                                        `⬇️ Downloading ${doc} for ${selectedTenant.name}`
                                                    )
                                                }
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Download size={16} className="text-gray-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>

                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                            <button
                                onClick={() => {
                                    navigate(-1)
                                }}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleEditTenant(id)}
                                className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </> : <>
                <p>Not have any details</p>

            </>


        }



        </>
    )
}