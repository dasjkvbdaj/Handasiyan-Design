import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

/**
 * A wrapper component for routes that require authentication or specific roles.
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children - The component to render if authorized
 * @param {boolean} props.adminOnly - Whether the route requires admin role
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userData, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030f0a] flex flex-col items-center justify-center text-[#d4af37]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="tracking-widest uppercase text-xs">Verifying Access...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // If user is logged in but not an admin, redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
