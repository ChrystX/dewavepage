import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const maxLogoScroll = 100;
    const logoOpacity = Math.max(0, 1 - scrollY / maxLogoScroll);
    const logoHeight = Math.max(0, 48 - scrollY / 2);

    const maxScroll = 200;
    const navOpacity = Math.min(scrollY / maxScroll, 1);

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/course', label: 'Courses' },
        { path: '/blog', label: 'Blog' },
    ];

    return (
        <>
            {/* Logo */}
            <div
                className="w-full bg-white z-50 flex justify-center items-center fixed top-0 left-0 transition-all duration-300 ease-in-out"
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
                className="fixed top-0 left-0 w-full z-40 backdrop-blur-md transition-colors duration-300"
                style={{
                    backgroundColor: `rgba(184, 59, 112, ${navOpacity})`,
                    marginTop: `${logoHeight}px`,
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Desktop Menu */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="space-x-8 text-white hidden md:flex">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`hover:text-gray-300 nav-text transition-colors duration-200 ${
                                        isActive(item.path) ? 'underline' : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden ml-auto p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
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

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={toggleMobileMenu}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-80 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ marginTop: `${logoHeight}px` }}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
                                aria-label="Close menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 px-6 py-4">
                            <nav className="space-y-4">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                                            isActive(item.path)
                                                ? 'bg-amber-100 text-amber-900 border-l-4 border-amber-600'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}