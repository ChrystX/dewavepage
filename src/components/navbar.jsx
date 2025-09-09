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

    useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/course', label: 'Courses' },
        { path: '/blog', label: 'Blog' },
    ];

    return (
        <>
            {/* Logo (Desktop Hidden for Mobile) */}
            <div
                className="w-full z-50 flex justify-center items-center fixed top-0 left-0 transition-all duration-300 ease-in-out bg-white"
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
                    backgroundColor: `rgba(255, 255, 255, ${0.2 + 0.75 * navOpacity})`,
                    marginTop: `${logoHeight}px`,
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between w-full">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center">
                        <img src="/deWave-logo.svg" alt="Logo" className="h-6" />
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

            {/* Mobile Menu Panel Only */}
            <div className="md:hidden">
                <div
                    className={`fixed top-0 right-0 h-full w-80 max-w-sm shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ backgroundColor: '#E4007C', marginTop: `${logoHeight}px` }}
                >
                    <div className="flex flex-col h-full p-6 space-y-6 text-white">
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
                    </div>
                </div>
            </div>
        </>
    );
}
