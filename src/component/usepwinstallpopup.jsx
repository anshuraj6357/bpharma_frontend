import { X, Download } from "lucide-react";
import { motion } from "framer-motion";
import  usePWAInstall  from "../hooks/usepwinstall";

const PWAInstallPopup = () => {
  const { isInstallable, installApp } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999]
      w-[95%] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-4"
    >
      <div className="flex items-center gap-4">
        <img
          src="/icons/icon-192.png"
          alt="Roomgi"
          className="w-12 h-12 rounded-xl"
        />

        <div className="flex-1">
          <h3 className="font-extrabold text-slate-900">
            Install Roomgi App
          </h3>
          <p className="text-xs text-slate-500">
            Faster • Offline access • No browser needed
          </p>
        </div>

        <button
          onClick={() => installApp()}
          className="bg-green-600 text-white px-4 py-2 rounded-xl
          font-bold flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Download size={16} /> Install
        </button>
      </div>
    </motion.div>
  );
};

export default PWAInstallPopup;
