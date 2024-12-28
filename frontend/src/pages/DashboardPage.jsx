import React from 'react';
import StudentDashboard from '../components/StudentDashboard';
import AdminDashboard from '../components/AdminDashboard';

const DashboardPage = ({ role }) => {
  return role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

export default DashboardPage;
