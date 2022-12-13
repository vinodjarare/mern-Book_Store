import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return (
      <>
        {toast.error("For access this resourse you need to login")}
        <Navigate to="/login" />
      </>
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
