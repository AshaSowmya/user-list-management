import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import UsersList from "../pages/UsersList";
// import AddUser from "../pages/AddUser";
// import EditUser from "../pages/EditUser";
// import PrivateRoute from "../components/layout/PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
        </Route> */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
