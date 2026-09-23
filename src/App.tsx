import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Providers from "./pages/Providers";
import BookingDetails from "./pages/BookingDetails";
import Bookings from "./pages/Bookings";
import ProviderDashboard from "./pages/ProviderDashboard";
import OfferService from "./pages/OfferService";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/useAuth";
import { Role } from "./types";

interface RequireAuthProps {
  role?: Role;
  children: React.ReactElement;
}

function RequireAuth({ role, children }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/offer-service" element={<OfferService />} />
      <Route path="/community" element={<Community />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth role="customer">
            <CustomerDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/provider"
        element={
          <RequireAuth role="provider">
            <ProviderDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <AdminDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/bookings"
        element={
          <RequireAuth>
            <Bookings />
          </RequireAuth>
        }
      />
      <Route
        path="/bookings/:id"
        element={
          <RequireAuth>
            <BookingDetails />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
