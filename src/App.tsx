import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import UsersList from "./pages/UsersList.tsx";
import PrivateRoute from "./components/layout/PrivateRoute.tsx";
import ScreenLoader from "./components/common/ScreenLoader.tsx";

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
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersList />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
