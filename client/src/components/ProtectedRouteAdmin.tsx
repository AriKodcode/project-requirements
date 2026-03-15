import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteAdmin() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
