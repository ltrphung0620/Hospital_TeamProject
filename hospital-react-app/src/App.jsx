import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import ReviewPage from "./pages/ReviewPage";
import PricingPage from "./pages/PricingPage";
import GalleryPage from "./pages/GalleryPage";

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import AppointmentManagementPage from './pages/admin/AppointmentManagementPage';
import MedicineManagementPage from './pages/admin/MedicineManagementPage';

function App() {
  return (
    <Routes>
      {/* Frontend Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
      <Route path="/departments" element={<Layout><DepartmentsPage /></Layout>} />
      <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:id" element={<Layout><BlogSinglePage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/team" element={<Layout><TeamPage /></Layout>} />
      <Route path="/review" element={<Layout><ReviewPage /></Layout>} />
      <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
      <Route path="/gallery"element={<Layout><GalleryPage/></Layout>}/>

      {/* Auth routes that shouldn't have the main layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="appointments" element={<AppointmentManagementPage />} />
        <Route path="medicines" element={<MedicineManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App;
