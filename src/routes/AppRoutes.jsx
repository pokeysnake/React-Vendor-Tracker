import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Reports from "../pages/Reports";
import Vendors from "../pages/Vendors";
import VendorDetail from "../pages/VendorDetail";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/vendors", element: <Vendors /> },
  { path: "/vendors/:vendorId", element: <VendorDetail /> },
  { path: "/reports", element: <Reports /> },
]);


