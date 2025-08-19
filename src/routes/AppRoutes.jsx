import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Reports from "../pages/Reports";
import Vendors from "../pages/Vendors";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/vendors", element: <Vendors /> },
  { path: "/reports", element: <Reports /> }, 
]);