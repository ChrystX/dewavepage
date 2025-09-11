import React from 'react';
import AdminNavbar from "../admin_component/navbar/AdminNavbar.jsx";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminNavbar />
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;