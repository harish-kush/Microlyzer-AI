import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import DashBoard from "./features/auth/pages/DashBoard";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Signup />
      </GuestRoute>
    ),
  },
]);