import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  const [redirectCountdown, setRedirectCountdown] = useState(30);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const { branchName = "-", roomNumber = "-", amount = 0, bookingId = "-" } = bookingData || {};

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic redirect after countdown
  useEffect(() => {
    if (!bookingData) {
      navigate("/"); // fallback if no booking data
      return;
    }

    const timer = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/mybooking", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingData, navigate]);

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold">Booking data not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />

      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your room has been successfully booked.</p>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-left">
          <p className="font-semibold text-gray-800">PG Name: <span className="font-normal">{branchName}</span></p>
          <p className="font-semibold text-gray-800">Room Number: <span className="font-normal">{roomNumber}</span></p>
          <p className="font-semibold text-gray-800">Amount Paid: <span className="font-normal">₹{amount}</span></p>
          <p className="font-semibold text-gray-800">Booking ID: <span className="font-normal">{bookingId}</span></p>
        </div>

        <button
          onClick={() => navigate("/mybooking", { replace: true })}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
        >
          Go to My Bookings Now
        </button>

        <p className="text-gray-500 mt-2">Redirecting to My Bookings in {redirectCountdown} seconds...</p>
      </div>
    </div>
  );
}
