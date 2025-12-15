import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { useChangemanagerpassMutation } from "../../Bothfeatures/features2/api/propertyapi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // manager data

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [updatingPassword, setUpdatingPassword] = useState(false);

    const [
        changemanagerpass,
        { isLoading, isSuccess }
    ] = useChangemanagerpassMutation();

    // handle input change
    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    // update password API
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setUpdatingPassword(true);

            const payload = {
                id: user?._id, // manager ID from redux
                password: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword,
            };

            await changemanagerpass(payload).unwrap();

            toast.success("Password updated successfully!");

        } catch (err) {
            toast.error(err?.data?.message || "Failed to update password");
            console.log(err);
        } finally {
            setUpdatingPassword(false);
        }
    };

    // redirect after success
    useEffect(() => {
        if (isSuccess) {
            navigate("/admin/properties");
        }
    }, [isSuccess, navigate]);

    return (
        <>
            <div className="flex justify-center items-center min-h-[60vh] px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">

                    <h2 className="text-2xl font-bold text-center text-[#1e3a5f] mb-6">
                        Set Your New Password
                    </h2>

                    <form onSubmit={handlePasswordUpdate} className="space-y-5">

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={updatingPassword}
                            className={`w-full bg-[#1e3a5f] text-white p-3 rounded-xl font-medium transition-all flex items-center justify-center
                            ${updatingPassword ? "opacity-70 cursor-not-allowed" : "hover:bg-[#162f4b]"}`}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>

                </div>
            </div>

            <Footer />
        </>
    );
}
