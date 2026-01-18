import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import Lottie from "lottie-react";

import companyLogo from "../assets/logo.png";
import successAnim from "../assets/success.json";
import { downloadInvoice } from "../user/utils/downloadinvoice";

const REDIRECT_TIME = 15;

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Fallback booking data using optional chaining
  const bookingData = {
    branchName: state?.branchName ?? "Green Valley PG",
    roomNumber: state?.roomNumber ?? "A-101",
    amount: state?.amount ?? 8500,
    bookingId: state?.bookingId ?? "BK2025XYZ123",
  };

  const { branchName, roomNumber, amount, bookingId } = bookingData;

  const [countdown, setCountdown] = useState(REDIRECT_TIME);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* ---------------- WINDOW SIZE ---------------- */
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- AUTO REDIRECT ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/mybooking", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-black"
    >
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-indigo-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-600/30 rounded-full blur-[120px]" />

      {/* Confetti */}
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={220} />

      {/* Success Card */}
      <div className="relative max-w-md w-full text-center p-8 rounded-3xl
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        {/* Logo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative w-24 h-24 rounded-3xl bg-white dark:bg-gray-900
            shadow-[0_10px_30px_rgba(0,0,0,0.3)]
            flex items-center justify-center border border-gray-200 dark:border-gray-700
            transition-transform hover:scale-105">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr
              from-[#ff416c]/40 to-[#ff4b2b]/40 blur-xl animate-pulse" />
            <img src={companyLogo} alt="Company Logo" className="relative w-16 h-16 object-contain" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Powered by <span className="font-semibold text-gray-800 dark:text-white">Roomgi</span>
          </p>
        </div>

        {/* Success Animation */}
        <Lottie animationData={successAnim} loop={false} className="w-36 mx-auto mt-8" />

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Booking Confirmed</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-6">
          Payment received successfully. Enjoy your stay 🏡
        </p>

        {/* Booking Details */}
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl space-y-3 text-sm text-left">
          <InfoRow label="PG Name" value={branchName} />
          <InfoRow label="Room Number" value={roomNumber} />
          <InfoRow label="Amount Paid" value={`₹${amount}`} />
          <InfoRow label="Booking ID" value={bookingId} />
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/mybooking", { replace: true })}
            className="w-full py-3 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] hover:scale-[1.02] transition shadow-lg flex items-center justify-center space-x-2"
          >
            <span>🏠</span>
            <span>View My Bookings</span>
          </button>

          <button
            onClick={() => downloadInvoice({ branchName, roomNumber, amount, bookingId })}
            className="w-full py-3 rounded-2xl font-semibold text-gray-900 dark:text-gray-100
              bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
              transition shadow-lg flex items-center justify-center space-x-2"
          >
            <span>📄</span>
            <span>Download Invoice</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Redirecting in <b>{countdown}s</b>
        </p>
      </div>
    </div>
  );
}

/* ---------------- INFO ROW ---------------- */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-gray-800 dark:text-gray-200">{value}</span>
    </div>
  );
}
