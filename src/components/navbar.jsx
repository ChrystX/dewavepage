import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // <-- import useLocation

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const location = useLocation(); // gives current pathname

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const maxLogoScroll = 100;
    const logoOpacity = Math.max(0, 1 - scrollY / maxLogoScroll);
    const logoHeight = Math.max(0, 48 - scrollY / 2);

    const maxScroll = 200;
    const navOpacity = Math.min(scrollY / maxScroll, 1);

    // Helper to check if link is active
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div
                className="w-full bg-white z-50 flex justify-center items-center fixed top-0 left-0 transition-all duration-300 ease-in-out"
                style={{
                    height: `${logoHeight}px`,
                    opacity: logoOpacity,
                    pointerEvents: logoOpacity === 0 ? 'none' : 'auto',
                }}
            >
                <img
                    src="src/assets/deWave-logo.svg"
                    alt="deWave Logo"
                    className="h-6 opacity-80 transition-opacity duration-300"
                />
            </div>

            <nav
                className="fixed top-0 left-0 w-full z-40 backdrop-blur-md transition-colors duration-300"
                style={{
                    backgroundColor: `rgba(163, 118, 80, ${navOpacity})`,
                    marginTop: `${logoHeight}px`,
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="space-x-8 text-white hidden md:flex">
                            <Link
                                to="/"
                                className={`hover:text-gray-300 nav-text ${isActive('/') ? 'underline' : ''}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`hover:text-gray-300 nav-text ${isActive('/about') ? 'underline' : ''}`}
                            >
                                About
                            </Link>
                            <Link
                                to="/course"
                                className={`hover:text-gray-300 nav-text ${isActive('/course') ? 'underline' : ''}`}
                            >
                                Courses
                            </Link>
                            <Link
                                to="/blog"
                                className={`hover:text-gray-300 nav-text ${isActive('/blog') ? 'underline' : ''}`}
                            >
                                Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
