import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = ["branch-manager", "owner"] }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);



  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If allowed, render the child routes
  return <Outlet />;
}
