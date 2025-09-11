import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogIn } from 'lucide-react';

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user, logout, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserMenu]);

    const maxLogoScroll = 100;
    const logoOpacity = Math.max(0, 1 - scrollY / maxLogoScroll);
    const logoHeight = Math.max(0, 48 - scrollY / 2);

    const maxScroll = 200;
    const navOpacity = Math.min(scrollY / maxScroll, 1);

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = async () => {
        try {
            await logout();
            setShowUserMenu(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/course', label: 'Courses' },
        { path: '/blog', label: 'Blog' },
    ];

    return (
        <>
            {/* Logo (Desktop Only - Hidden on Mobile) */}
            <div
                className="hidden md:flex w-full z-50 justify-center items-center fixed top-0 left-0 transition-all duration-300 ease-in-out bg-white"
                style={{
                    height: `${logoHeight}px`,
                    opacity: logoOpacity,
                    pointerEvents: logoOpacity === 0 ? 'none' : 'auto',
                }}
            >
                <img
                    src="/deWave-logo.svg"
                    alt="deWave Logo"
                    className="h-6 opacity-80 transition-opacity duration-300"
                />
            </div>

            {/* Navigation */}
            <nav
                className="fixed top-0 left-0 w-full z-40 transition-colors duration-300 flex items-center"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    marginTop: window.innerWidth >= 768 ? `${logoHeight}px` : '0px',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between w-full">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center">
                        <Link
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="cursor-pointer"
                        >
                            <img
                                src="/deWave-logo.svg"
                                alt="Logo"
                                className="h-6 transition-opacity duration-300 hover:opacity-80"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-gray-900">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`hover:text-gray-600 nav-text transition-colors duration-200 ${
                                    isActive(item.path) ? 'underline' : ''
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    {/* Desktop Admin Login - right aligned */}
                    <div className="hidden md:flex items-center ml-auto">
                        {!isAuthenticated ? (
                            <div className="user-menu-container relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Admin Login"
                                >
                                    <User className="w-5 h-5" />
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                        <Link
                                            to="/admin/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Admin Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            isAdmin() && (
                                <div className="user-menu-container relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium">{user?.username}</span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                                                Signed in as <strong>{user?.username}</strong>
                                            </div>
                                            <Link
                                                to="/admin/home"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Admin Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>



                    {/* Mobile Hamburger */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                            <span
                                className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${
                                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                            />
                            <span
                                className={`block h-0.5 bg-current transition duration-300 ease-in-out ${
                                    isMobileMenuOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${
                                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <div className="md:hidden">
                <div
                    className={`fixed top-0 right-0 h-full w-80 max-w-sm shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ backgroundColor: '#E4007C' }}
                >
                    <div className="flex flex-col h-full p-6 space-y-6 text-white">
                        {/* Mobile Navigation Items */}
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`block text-lg font-semibold px-4 py-3 rounded-md transition-colors duration-200 hover:bg-pink-700 ${
                                    isActive(item.path) ? 'bg-pink-800' : ''
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Mobile Auth Section */}
                        <div className="border-t border-pink-400 pt-6 mt-8">
                            {isAuthenticated ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 px-4 py-2">
                                        <div className="w-10 h-10 bg-pink-700 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{user?.username}</p>
                                            <p className="text-sm text-pink-200">{user?.role}</p>
                                        </div>
                                    </div>
                                    {isAdmin() && (
                                        <Link
                                            to="/admin/home"
                                            className="block text-lg font-semibold px-4 py-3 rounded-md transition-colors duration-200 hover:bg-pink-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left text-lg font-semibold px-4 py-3 rounded-md transition-colors duration-200 hover:bg-pink-700 text-pink-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    className="flex items-center space-x-3 text-lg font-semibold px-4 py-3 rounded-md transition-colors duration-200 hover:bg-pink-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}