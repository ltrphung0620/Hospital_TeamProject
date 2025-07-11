import React, { useState, useEffect } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import UserManagementPage from '../../pages/admin/UserManagementPage';
import DoctorManagementPage from '../../pages/admin/DoctorManagementPage';
import PatientManagementPage from '../../pages/admin/PatientManagementPage';
import AppointmentManagementPage from '../../pages/admin/AppointmentManagementPage';
import MedicineManagementPage from '../../pages/admin/MedicineManagementPage';
import MedicalRecordManagementPage from '../../pages/admin/MedicalRecordManagementPage';
import MedicalServiceManagementPage from '../../pages/admin/MedicalServiceManagementPage';
import LabTestManagementPage from '../../pages/admin/LabTestManagementPage';
import TestRequestManagementPage from '../../pages/admin/TestRequestManagementPage';
import TestResultManagementPage from '../../pages/admin/TestResultManagementPage';
import WaitingListManagementPage from '../../pages/admin/WaitingListManagementPage';
import PrescriptionPaymentPage from '../../pages/admin/PrescriptionPaymentPage';
import LabTestPaymentPage from '../../pages/admin/LabTestPaymentPage';
import ServicePaymentManagementPage from '../../pages/admin/ServicePaymentManagementPage';
import DoctorSchedulesPage from '../../pages/admin/DoctorSchedulesPage';
import BlogManagementPage from '../../pages/admin/BlogManagementPage';
import './AdminStyles.css';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 992);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="admin-layout">
            <Sidebar isOpen={isSidebarOpen} />
            <button className="admin-sidebar-toggle-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <main className={`admin-main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/doctors" element={<DoctorManagementPage />} />
                    <Route path="/doctor-schedules" element={<DoctorSchedulesPage />} />
                    <Route path="/patients" element={<PatientManagementPage />} />
                    <Route path="/appointments" element={<AppointmentManagementPage />} />
                    <Route path="/medicines" element={<MedicineManagementPage />} />
                    <Route path="/medical-records" element={<MedicalRecordManagementPage />} />
                    <Route path="/medical-services" element={<MedicalServiceManagementPage />} />
                    <Route path="/lab-tests" element={<LabTestManagementPage />} />
                    <Route path="/test-requests" element={<TestRequestManagementPage />} />
                    <Route path="/test-results" element={<TestResultManagementPage />} />
                    <Route path="/waiting-list" element={<WaitingListManagementPage />} />
                    <Route path="/prescription-payments" element={<PrescriptionPaymentPage />} />
                    <Route path="/lab-test-payments" element={<LabTestPaymentPage />} />
                    <Route path="/service-payments" element={<ServicePaymentManagementPage />} />
                    <Route path="/blog" element={<BlogManagementPage />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout; 