import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot"; // optional - if you don't have this package remove Slot usage
import { PanelLeft as PanelLeftIcon } from "lucide-react";

/**
 * Note: If you don't have @radix-ui/react-slot installed, either install it
 * or replace usages of Slot with the appropriate element (e.g., 'button' or 'span').
 *
 * This file is plain JSX (no TypeScript). Tailwind classes are used heavily
 * to preserve the original look-and-feel. Adjust classes to match your theme.
 */

/* -------------------------
   Utilities
   ------------------------- */
const cn = (...args) => args.filter(Boolean).join(" ");

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
};

/* -------------------------
   Sidebar context + Provider
   ------------------------- */
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = createContext(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  onOpenChange,
  open: openProp,
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);

  // controlled/uncontrolled wrapper
  const open = openProp !== undefined ? openProp : _open;
  const setOpen = useCallback(
    (val) => {
      const next = typeof val === "function" ? val(open) : val;
      if (onOpenChange) onOpenChange(next);
      if (openProp === undefined) _setOpen(next);
      // set cookie (basic)
      try {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${next ? "1" : "0"}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      } catch (e) {
        // ignore in SSR/no-cookie contexts
      }
    },
    [open, onOpenChange, openProp]
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile((s) => !s);
    else setOpen((s) => !s);
  }, [isMobile, setOpen]);

  useEffect(() => {
    const handle = (ev) => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT) {
        ev.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const value = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

/* -------------------------
   Simple Modal for Mobile sheet
   ------------------------- */
function MobileSheet({ open, onClose, children, side = "right", width = SIDEBAR_WIDTH_MOBILE }) {
  // basic portalless modal: position fixed full screen
  // If you want an actual portal, replace with createPortal
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className={cn(
              "relative z-50 h-full bg-white shadow-xl transition-transform",
              side === "right" ? "ml-auto" : "mr-auto"
            )}
            style={{ width }}
          >
            <div className="p-4 h-full overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

/* -------------------------
   Sidebar core components
   ------------------------- */

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  // non-collapsible simple layout
  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("bg-white text-gray-900 flex h-full flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  // mobile sheet
  if (isMobile) {
    return (
      <MobileSheet
        open={openMobile}
        onClose={() => setOpenMobile(false)}
        side={side}
        width={SIDEBAR_WIDTH_MOBILE}
      >
        <div className="flex h-full flex-col">{children}</div>
      </MobileSheet>
    );
  }

  // Desktop sidebar
  const collapsed = state !== "expanded";
  const widthStyle = collapsed ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH;
  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
      data-side={side}
      className={cn(
        "hidden md:block fixed inset-y-0 z-30 flex flex-col bg-white border-r border-gray-200 transition-all",
        side === "left" ? "left-0" : "right-0",
        className
      )}
      style={{ width: widthStyle }}
      {...props}
    >
      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
}

/* -------------------------
   Trigger & rail & inset etc.
   ------------------------- */

export function SidebarTrigger({ className, onClick, children, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-trigger"
      aria-label="Toggle Sidebar"
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelLeftIcon />}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

export function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
      className={cn(
        "hidden md:flex items-center justify-center absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-10 rounded-r-md bg-white border border-gray-200 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function SidebarInset({ className, children, ...props }) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("flex-1 min-h-screen bg-gray-50", className)}
      {...props}
    >
      {children}
    </main>
  );
}

/* -------------------------
   Small building blocks
   ------------------------- */

export function SidebarHeader({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-header" className={cn("p-3 flex items-center gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-footer" className={cn("p-3 mt-auto", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarSeparator({ className, ...props }) {
  return <div className={cn("h-px bg-gray-200 my-2", className)} {...props} />;
}

export function SidebarContent({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-content" className={cn("flex flex-col gap-2 p-2", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-group" className={cn("px-2 py-1", className)} {...props}>
      {children}
    </div>
  );
}

/* -------------------------
   Menu / Menu button components
   ------------------------- */

const sidebarMenuButtonBase = "flex items-center gap-2 w-full text-left rounded-md px-3 py-2 hover:bg-gray-100";

export function SidebarMenu({ className, children, ...props }) {
  return (
    <ul data-slot="sidebar-menu" className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ className, children, ...props }) {
  return (
    <li data-slot="sidebar-menu-item" className={cn("relative", className)} {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip = null,
  className,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        sidebarMenuButtonBase,
        isActive ? "bg-gray-100 font-medium" : "text-gray-700",
        className
      )}
      {...(asChild ? {} : { type: "button" })}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SidebarMenuAction({ className, children, ...props }) {
  return (
    <button
      data-slot="sidebar-menu-action"
      className={cn("absolute right-2 top-2 opacity-80 hover:opacity-100", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarMenuBadge({ className, children, ...props }) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn("ml-auto text-xs px-2 py-0.5 bg-gray-100 rounded-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarMenuSub({ className, children, ...props }) {
  return (
    <ul data-slot="sidebar-menu-sub" className={cn("pl-4 mt-1 space-y-1", className)} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuSubButton({ asChild = false, isActive = false, className, children, ...props }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      className={cn("flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100", isActive ? "bg-gray-100" : "", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* -------------------------
   Skeleton / Utilities (basic)
   ------------------------- */

export function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
  const width = `${Math.floor(Math.random() * 40) + 50}%`;
  return (
    <div className={cn("flex items-center gap-2 px-2 py-1", className)} {...props}>
      {showIcon && <div className="w-8 h-8 bg-gray-200 rounded" />}
      <div className="h-4 bg-gray-200 rounded" style={{ width }} />
    </div>
  );
}
