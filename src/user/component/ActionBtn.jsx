import clsx from "clsx";

function ActionBtn({
  icon,
  label,
  primary = false,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      className={clsx(
        `
        group relative overflow-hidden flex items-center justify-center gap-4
        py-4 px-8 lg:px-10 rounded-3xl w-full
        font-black text-sm uppercase tracking-wider
        transition-all duration-300 active:scale-[0.97]
        focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50
        `,
        
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-100 border border-gray-200 text-gray-400 shadow-none"
          : primary
          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 border-2 border-orange-400/50 shadow-xl hover:shadow-2xl shadow-orange-500/20"
          : "bg-white border-2 border-orange-100 text-gray-800 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 shadow-md hover:shadow-lg",

        className
      )}
    >
      {/* Shine Effect */}
      {!isDisabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}

      {/* Loader */}
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {/* Icon */}
          {icon && (
            <span
              className={clsx(
                "flex items-center justify-center transition-all duration-300",
                primary
                  ? "text-white/90 group-hover:text-white"
                  : "text-orange-500 group-hover:scale-110"
              )}
            >
              {icon}
            </span>
          )}

          {/* Label */}
          <span className="relative z-10 font-bold leading-tight">
            {label}
          </span>
        </>
      )}
    </button>
  );
}

export default ActionBtn;