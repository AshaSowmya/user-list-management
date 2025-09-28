import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const isAuthenticated = !!localStorage.getItem("token");

  // If logged in, redirect to /users
  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}
