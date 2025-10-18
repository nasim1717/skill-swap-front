import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
