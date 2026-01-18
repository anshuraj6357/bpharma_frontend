import { CheckCircle, Gift, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function SignupSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle resize (important for mobile)
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
      bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
      px-4 overflow-hidden">

      {/* 🎉 CONTINUOUS CONFETTI */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={180}
        gravity={0.15}
        wind={0.01}
        recycle={true}
        tweenDuration={8000}
      />

      {/* Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/90
        max-w-md w-full rounded-3xl shadow-2xl
        p-8 text-center animate-fadeInUp">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full shadow-md animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          🎉 Congratulations!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-base mb-6 leading-relaxed">
          Welcome to <span className="font-bold text-indigo-600">Roomgi</span> —  
          India’s smarter way to book PGs & rooms.
        </p>

        {/* Bonus Card */}
        <div className="flex items-center justify-center gap-4
          bg-gradient-to-r from-yellow-400 to-orange-500
          text-white rounded-2xl p-5 mb-6 shadow-xl animate-pulse">

          <Gift className="w-12 h-12" />
          <div className="text-left">
            <p className="text-sm font-medium">Signup Bonus</p>
            <p className="text-3xl font-extrabold">₹100 Wallet Credit</p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2
          text-sm text-gray-600 mb-6">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          100% Secure • Verified Properties
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-xl text-lg font-semibold text-white
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          transition transform hover:scale-[1.05] shadow-lg"
        >
          Explore Rooms 🚀
        </button>

        {/* Auto redirect text */}
        <p className="text-xs text-gray-500 mt-4">
          Redirecting in {seconds} seconds…
        </p>
      </div>
    </div>
  );
}
