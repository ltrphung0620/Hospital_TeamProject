import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogPage from './pages/BlogPage';
import BlogSinglePage from './pages/BlogSinglePage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ReviewPage from './pages/ReviewPage';
import PricingPage from './pages/PricingPage';
import GalleryPage from './pages/GalleryPage';
import AppointmentsPage from './pages/AppointmentsPage';
import UserInfoPage from './pages/UserInfoPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import AppointmentManagementPage from './pages/admin/AppointmentManagementPage';
import MedicineManagementPage from './pages/admin/MedicineManagementPage';
import DoctorManagementPage from './pages/admin/DoctorManagementPage';
import DoctorScheduleManagementPage from './pages/admin/DoctorScheduleManagementPage';
import PatientManagementPage from './pages/admin/PatientManagementPage';
import MedicalRecordManagementPage from './pages/admin/MedicalRecordManagementPage';
import WaitingListManagementPage from './pages/admin/WaitingListManagementPage';
import MedicalServiceManagementPage from './pages/admin/MedicalServiceManagementPage';
import LabTestManagementPage from './pages/admin/LabTestManagementPage';
import TestRequestManagementPage from './pages/admin/TestRequestManagementPage';
import TestResultManagementPage from './pages/admin/TestResultManagementPage';
import PrescriptionPaymentPage from './pages/admin/PrescriptionPaymentPage';
import LabTestPaymentPage from './pages/admin/LabTestPaymentPage';
import ServicePaymentManagementPage from './pages/admin/ServicePaymentManagementPage';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogSinglePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="user-info" element={<UserInfoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="doctors" element={<DoctorManagementPage />} />
          <Route path="doctor-schedules" element={<DoctorScheduleManagementPage />} />
          <Route path="patients" element={<PatientManagementPage />} />
          <Route path="appointments" element={<AppointmentManagementPage />} />
          <Route path="medical-records" element={<MedicalRecordManagementPage />} />
          <Route path="waiting-list" element={<WaitingListManagementPage />} />
          <Route path="medical-services" element={<MedicalServiceManagementPage />} />
          <Route path="lab-tests" element={<LabTestManagementPage />} />
          <Route path="test-requests" element={<TestRequestManagementPage />} />
          <Route path="test-results" element={<TestResultManagementPage />} />
          <Route path="medicines" element={<MedicineManagementPage />} />
          <Route path="prescription-payments" element={<PrescriptionPaymentPage />} />
          <Route path="lab-test-payments" element={<LabTestPaymentPage />} />
          <Route path="service-payments" element={<ServicePaymentManagementPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 