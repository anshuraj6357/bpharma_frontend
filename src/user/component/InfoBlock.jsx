import { Sparkles } from "lucide-react";
import clsx from "clsx";

function InfoBlock({ title, children, className = "" }) {
  const safeTitle = title || "section";
  const sectionId = `section-${safeTitle
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <section
      aria-labelledby={sectionId}
      className={clsx(
        `
        group relative overflow-hidden
        bg-white/90 backdrop-blur-xl
        rounded-3xl border border-orange-100/50
        shadow-xl hover:shadow-2xl
        transition-all duration-500 hover:-translate-y-1
        before:absolute before:inset-0
        before:bg-gradient-to-r before:from-orange-500/5 before:to-amber-500/5
        before:opacity-0 before:group-hover:opacity-100
        before:transition-all before:duration-700
        `,
        className
      )}
    >
      {/* Top Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400" />

      <div className="p-8 lg:p-10 relative z-10">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-orange-100/50">

          <div className="flex items-center gap-3">
            
            {/* Dot */}
            <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse hidden lg:block" />

            {/* Title */}
            <div className="relative">
              <h3
                id={sectionId}
                className="text-xl lg:text-2xl font-black bg-gradient-to-r from-gray-900 to-orange-500 bg-clip-text text-transparent"
              >
                {safeTitle}
              </h3>

              {/* Underline */}
              <div className="absolute -bottom-1 left-0 w-6 h-1 bg-orange-400 rounded-full group-hover:w-20 transition-all duration-500" />
            </div>
          </div>

          {/* Icon */}
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 shadow group-hover:scale-110 transition">
            <Sparkles size={16} />
          </div>
        </header>

        {/* Content */}
        <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-50/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

export default InfoBlock;