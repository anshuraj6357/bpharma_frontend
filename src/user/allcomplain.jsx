// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux"
// import {
//     useGetAllComplainQuery,
//     useUpdateComplainMutation,
//     useDeleteComplainMutation,
// } from "../Bothfeatures/features2/api/complainapi";

// export  function ComplaintsPage() {
 
//     const { user } = useSelector(state => state.auth);

//     const { data: complaints = [], isLoading: listLoading } =
//         useGetAllComplainQuery(user._id);


//     const [updateComplain] = useUpdateComplainMutation();
//     const [deleteComplain] = useDeleteComplainMutation();

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         category: "Other",
//     });

//     useEffect(()=>{
//         if(user){
//             console.log(user)
//         }
//     },[user

//     ])

//     const [editId, setEditId] = useState(null);
//     const [message, setMessage] = useState({ text: "", type: "" });

//     // ----------------------------- HANDLERS ------------------------------
//     const handleChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (editId) {
//                 await updateComplain({ id: editId, body: formData }).unwrap();
//                 showMsg("Complaint updated successfully", "success");
//                 setEditId(null);
//             } else {
//                 await createComplain({ ...formData, branchId }).unwrap();
//                 showMsg("Complaint created successfully", "success");
//             }

//             setFormData({ title: "", description: "", category: "Other" });

//         } catch (err) {
//             showMsg("Something went wrong!", "error");
//         }
//     };

//     const handleEdit = (comp) => {
//         setEditId(comp._id);
//         setFormData({
//             title: comp.title,
//             description: comp.description,
//             category: comp.category,
//         });
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this complaint?")) return;
//         try {
//             await deleteComplain(id).unwrap();
//             showMsg("Complaint deleted", "success");
//         } catch {
//             showMsg("Delete failed", "error");
//         }
//     };

//     const showMsg = (text, type) => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//     };

//     // -------------------------------------------------------------------

//     return (
//         <div className="max-w-4xl mx-auto p-4 md:p-8">

//             {/* Page Title */}
//             <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//                 Complaint Management
//             </h1>

//             {/* Notification */}
//             {message.text && (
//                 <p
//                     className={`mb-4 text-center font-semibold p-3 rounded-lg ${message.type === "success"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                 >
//                     {message.text}
//                 </p>
//             )}



//             {/* --------------------- LIST SECTION --------------------- */}
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 All Complaints
//             </h2>

//             {listLoading ? (
//                 <p className="text-center">Loading...</p>
//             ) : complaints.length === 0 ? (
//                 <p className="text-center text-gray-500">No complaints found</p>
//             ) : (
//                 <div className="space-y-4">
//                     {complaints.map((comp) => (
//                         <div
//                             key={comp._id}
//                             className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 md:flex-row md:justify-between"
//                         >
//                             <div>
//                                 <h3 className="text-lg font-bold">{comp.title}</h3>
//                                 <p className="text-gray-700 text-sm">{comp.description}</p>
//                                 <p className="text-blue-600 font-semibold text-sm mt-1">
//                                     Category: {comp.category}
//                                 </p>
//                             </div>

//                             {/* buttons */}
//                             <div className="flex gap-2 mt-2 md:mt-0">
//                                 <button
//                                     className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
//                                     onClick={() => handleEdit(comp)}
//                                 >
//                                     Edit
//                                 </button>

//                                 <button
//                                     className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                                     onClick={() => handleDelete(comp._id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
