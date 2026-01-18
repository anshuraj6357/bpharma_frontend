import { useState } from "react";
import { useCreateComplainMutation } from "../backend-routes/userroutes/complaints";
import { useParams } from "react-router-dom"

export default function CreateComplaint() {
    const [createComplain, { isLoading }] = useCreateComplainMutation();
    const { branchId } = useParams();
    console.log(branchId)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Other",
        branchId: branchId,

    });

    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createComplain(formData);

            setMessage({
                text: "Complaint created successfully!",
                type: "success",
            });

            // ❗ Reset WITHOUT removing branchId
            setFormData({
                title: "",
                description: "",
                category: "Other",
                branchId: branchId,
            });

        } catch (err) {
            setMessage({
                text: "Failed to create complaint. Try again!",
                type: "error",
            });
        }

        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    };


    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-6 border">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Create Complaint
            </h1>

            {/* Alert Message */}
            {message.text && (
                <p
                    className={`mb-4 text-center font-semibold p-2 rounded-lg ${message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    {message.text}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1 text-gray-700">
                        Title
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter complaint title"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1 text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg h-28 focus:ring focus:ring-blue-300"
                        placeholder="Describe the issue..."
                        required
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1 text-gray-700">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
                    >
                        <option value="Electrical">⚡ Electrical</option>
                        <option value="Plumbing">🚰 Plumbing</option>
                        <option value="Cleaning">🧹 Cleaning</option>
                        <option value="Other">📌 Other</option>
                    </select>
                </div>



                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Create Complaint"}
                </button>
            </form>
        </div>
    );
}
