// FILE: src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingQuickQuote from "./components/FloatingQuickQuote";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";

import { PrivateRoute, RoleRoute } from "./components/RouteGuards";

// Core pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Payments from "./pages/Payments";
import Marketplace from "./pages/Marketplace";
import CustomQuoteStep1 from "./pages/CustomQuoteStep1";
import CustomQuoteStep2 from "./pages/CustomQuoteStep2";
import CustomQuoteStep3 from "./pages/CustomQuoteStep3";
import Cart from "./pages/Cart";

// Auth
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Existing dashboards (kept)
import DashboardUser from "./pages/DashboardUser";
import DashboardEmployee from "./pages/DashboardEmployee";
import DashboardAdmin from "./pages/DashboardAdmin";

// Admin screens
import AdminUsers from "./pages/AdminUsers";

// NEW: Dashboard with nested tabs
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardAccount from "./pages/dashboard/Account";
import DashboardOrders from "./pages/dashboard/Orders";
import DashboardQuotes from "./pages/dashboard/Quotes";
import AdminOrders from "./pages/AdminOrders";
import AdminQuotes from "./pages/AdminQuotes";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminTickets from "./pages/AdminTickets";

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/quote" element={<CustomQuoteStep1 />} />
                <Route path="/quote/step2" element={<CustomQuoteStep2 />} />
                <Route path="/quote/step3" element={<CustomQuoteStep3 />} />
                <Route path="/cart" element={<Cart />} />

                {/* Employee/Admin operational pages */}
                <Route
                  path="/admin/orders"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminOrders />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/quotes"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminQuotes />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/requests"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminTickets />
                    </RoleRoute>
                  }
                />

                {/* Admin (role-protected) */}
                <Route
                  path="/admin/users"
                  element={
                    <RoleRoute allow={["admin"]}>
                      <AdminUsers />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RoleRoute allow={["admin"]}>
                      <DashboardAdmin />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/blog"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminBlog />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/blog/:id"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminBlogEditor />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/blog/new"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminBlogEditor />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <AdminTestimonials />
                    </RoleRoute>
                  }
                />

                {/* Employee (role-protected) */}
                <Route
                  path="/employee"
                  element={
                    <RoleRoute allow={["employee", "admin"]}>
                      <DashboardEmployee />
                    </RoleRoute>
                  }
                />

                {/* Auth */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* User Dashboard with nested tabs */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardLayout />
                    </PrivateRoute>
                  }
                >
                  {/* Redirect /dashboard → /dashboard/account */}
                  <Route index element={<Navigate to="account" replace />} />
                  <Route path="account" element={<DashboardAccount />} />
                  <Route path="orders" element={<DashboardOrders />} />
                  <Route path="quotes" element={<DashboardQuotes />} />
                </Route>

                {/* Legacy single-page user dashboard (kept, optional) */}
                <Route
                  path="/dashboard-legacy"
                  element={
                    <PrivateRoute>
                      <DashboardUser />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>

            <FloatingQuickQuote />
            <Footer />
          </div>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
