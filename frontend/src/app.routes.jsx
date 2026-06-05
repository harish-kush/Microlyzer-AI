import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import DashBoard from "./features/auth/pages/DashBoard";

export const router = createBrowserRouter([
   {
    path: "/dashboard",
    element: <DashBoard />,
   },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);
