import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import UsersList from "./pages/UsersList.tsx";
import PrivateRoute from "./components/layout/PrivateRoute.tsx";
import PublicRoute from "./components/layout/PublicRoute.tsx";
import ScreenLoader from "./components/common/ScreenLoader.tsx";
import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <ScreenLoader />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersList />} />
        </Route>

        {/* Redirect any unknown path */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
