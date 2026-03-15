import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteAgent() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!token || user?.role !== "agent") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
