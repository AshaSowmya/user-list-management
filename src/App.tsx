import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/AddUser.tsx";
import UsersList from "./pages/UsersList.tsx";
// import AddUser from "../pages/AddUser";
// import EditUser from "../pages/EditUser";
import PrivateRoute from "./components/layout/PrivateRoute.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersList />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
