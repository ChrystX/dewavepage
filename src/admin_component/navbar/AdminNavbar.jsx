import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {
    Users,
    BookOpen,
    FileText,
    FolderOpen,
    Menu,
    X,
    ChevronRight,
    Settings,
    LayoutDashboard,
    LogOut,
    User,
    Home
} from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext.jsx";

const AdminNavbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin/home',
            description: 'Overview and analytics'
        },
        {
            id: 'applications',
            label: 'Applications',
            icon: Users,
            path: '/admin/application',
            description: 'Manage student applications'
        },
        {
            id: 'categories',
            label: 'Categories',
            icon: FolderOpen,
            path: '/admin/categories',
            description: 'Course categories'
        },
        {
            id: 'courses',
            label: 'Courses',
            icon: BookOpen,
            path: '/admin/courses',
            description: 'Course management'
        },
        {
            id: 'blogs',
            label: 'Blogs',
            icon: FileText,
            path: '/admin/blogs',
            description: 'Blog content management'
        }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const goToHome = () => {
        navigate('/');
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* User Info */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <nav className="mt-6 px-3 space-y-2 flex-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-lg transition-colors group ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                    <div className="flex-1">
                                        <div className="font-medium">{item.label}</div>
                                        <div className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {item.description}
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Section with Home, Settings, and Logout */}
                <div className="px-3 pb-4 border-t border-gray-200 space-y-2">
                    {/* Back to Home */}
                    <button
                        onClick={goToHome}
                        className="w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-lg transition-colors group text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Home className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                        <div>
                            <div className="font-medium">Back to Home</div>
                            <div className="text-xs text-gray-500">Go to public main page</div>
                        </div>
                    </button>

                    <NavLink
                        to="/admin/settings"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-lg transition-colors group ${
                                isActive
                                    ? 'bg-gray-50 text-gray-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <Settings className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                        <div>
                            <div className="font-medium">Settings</div>
                            <div className="text-xs text-gray-500">System configuration</div>
                        </div>
                    </NavLink>

                    {/* Logout Button */}
                    <button
                        onClick={confirmLogout}
                        className="w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-lg transition-colors group text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-700" />
                        <div>
                            <div className="font-medium">Logout</div>
                            <div className="text-xs text-red-500">Sign out of admin panel</div>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Confirm Logout
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to logout? You'll need to sign in again to access the admin panel.
                        </p>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer for main content (only on desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0" />
        </>
    );
};

export default AdminNavbar;
