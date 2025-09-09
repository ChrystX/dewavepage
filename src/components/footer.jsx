import React from "react";
import LocationMap from "./map.jsx";

export default function Footer() {
    return (
        <footer className="bg-white text-black font-sans py-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mobile Layout */}
                <div className="block md:hidden text-center">
                    {/* Centered Logo */}
                    <div className="mb-4">
                        <img src="/deWave-logo.svg" alt="deWave Logo" className="h-10 mx-auto mb-4" />
                    </div>

                    {/* Address */}
                    <div className="text-xs text-gray-700 mb-2">
                        Jl. Mangkuyudan No.45, Mantrijeron,<br />
                        Kota Yogyakarta, DIY 55143, Indonesia
                    </div>

                    {/* Contact */}
                    <div className="text-xs text-gray-900 mb-4">
                        <a href="tel:+6282242752668" className="hover:text-yellow-600">
                            +62 822-4275-2668
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="flex justify-center space-x-3 mb-4">
                        {[
                            { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg", label: "Facebook" },
                            { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", label: "Instagram" },
                            { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", label: "LinkedIn" },
                        ].map((icon, i) => (
                            <a
                                key={i}
                                href={icon.href}
                                className="p-1.5 rounded-full hover:bg-yellow-600 hover:bg-opacity-20 transition-colors bg-black/5"
                                aria-label={icon.label}
                            >
                                <img src={icon.src} alt={icon.label} className="h-4 w-4" />
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="pt-3 border-t border-black/20">
                        <p className="text-xs text-gray-700">
                            © {new Date().getFullYear()} deWave Academy
                        </p>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Company Info */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <img src="/deWave-logo.svg" alt="deWave Logo" className="h-10 mb-4" />
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                Jl. Mangkuyudan No.45, Mantrijeron,<br />
                                Kota Yogyakarta, DIY 55143, Indonesia
                            </p>
                            <p className="text-sm text-gray-700 mb-4">
                                Phone: <a href="tel:+6282242752668" className="hover:text-yellow-600 transition-colors">+62 822-4275-2668</a>
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="flex flex-col space-y-2 sm:space-y-3">
                                <a href="#" className="text-gray-700 hover:text-yellow-600 text-sm">Home</a>
                                <a href="#" className="text-gray-700 hover:text-yellow-600 text-sm">About</a>
                                <a href="#" className="text-gray-700 hover:text-yellow-600 text-sm">Services</a>
                                <a href="#" className="text-gray-700 hover:text-yellow-600 text-sm">Contact</a>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {[
                                    { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg", label: "Facebook" },
                                    { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", label: "Instagram" },
                                    { href: "#", src: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", label: "LinkedIn" },
                                ].map((icon, i) => (
                                    <a
                                        key={i}
                                        href={icon.href}
                                        className="p-2 rounded-full hover:bg-yellow-600 hover:bg-opacity-20 transition-colors group bg-black/5"
                                        aria-label={icon.label}
                                    >
                                        <img src={icon.src} alt={icon.label} className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4">Location</h3>
                            <LocationMap height="200px" width="100%" zoom={15} />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-black/20">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                            <p className="text-sm text-gray-700 text-center sm:text-left">
                                © {new Date().getFullYear()} deWave Academy. All rights reserved.
                            </p>
                            <div className="flex space-x-4 text-xs text-gray-700">
                                <a href="#" className="hover:text-yellow-600 transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-yellow-600 transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
