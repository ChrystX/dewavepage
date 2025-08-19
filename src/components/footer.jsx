import React from "react";
import Logo from "../assets/deWave-logo.svg";
import LocationMap from "./map.jsx"; // keep this local, or replace with URL if desired

export default function Footer() {
    const googleMapsApiKey = import.meta.VITE_GOOGLE_MAPS_API_KEY;
    const mapLat = -7.8213449;  // Updated coordinates from your Google Maps link
    const mapLng = 110.3656522;

    const mapUrl = googleMapsApiKey
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${mapLat},${mapLng}&zoom=15&size=300x150&maptype=roadmap&markers=color:red|${mapLat},${mapLng}&key=${googleMapsApiKey}`
        : null;

    return (
        <footer className="text-white py-8 md:py-12" style={{ backgroundColor: '#836953' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

                    {/* Company Info - Full width on mobile, spans 2 cols on tablet */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <img src={Logo} alt="deWave Logo" className="h-8 md:h-10 mb-4" />
                        <p className="text-sm text-gray-100 dm-serif-text-regular leading-relaxed mb-3">
                            Jl. Mangkuyudan No.45, Mantrijeron,<br />
                            Kota Yogyakarta, Daerah Istimewa Yogyakarta 55143, Indonesia
                        </p>
                        <p className="text-sm text-gray-100 dm-serif-text-regular">
                            Phone: <a href="tel:+6282242752668" className="hover:text-yellow-200 transition-colors">+62 822-4275-2668</a>
                        </p>
                    </div>

                    {/* Navigation Menu */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 playfair-display-text-regular">Quick Links</h3>
                        <div className="flex flex-col space-y-3 playfair-display-text-regular">
                            <a href="#" className="text-gray-100 hover:text-yellow-200 transition-colors text-sm">Home</a>
                            <a href="#" className="text-gray-100 hover:text-yellow-200 transition-colors text-sm">About</a>
                            <a href="#" className="text-gray-100 hover:text-yellow-200 transition-colors text-sm">Services</a>
                            <a href="#" className="text-gray-100 hover:text-yellow-200 transition-colors text-sm">Contact</a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 playfair-display-text-regular">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-yellow-200 hover:bg-opacity-20 transition-colors group"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                aria-label="Facebook"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                                    alt="Facebook"
                                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                                />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-yellow-200 hover:bg-opacity-20 transition-colors group"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                aria-label="Instagram"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                    alt="Instagram"
                                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                                />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full hover:bg-yellow-200 hover:bg-opacity-20 transition-colors group"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                aria-label="LinkedIn"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                                    alt="LinkedIn"
                                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Map Location */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 playfair-display-text-regular">Location</h3>
                        <LocationMap height="300px" zoom={15} />
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 pt-6" style={{ borderTopColor: 'rgba(255, 255, 255, 0.2)', borderTopWidth: '1px' }}>
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <p className="text-sm text-gray-100 playfair-display-text-regular text-center sm:text-left">
                            © {new Date().getFullYear()} deWave Academy. All rights reserved.
                        </p>
                        <div className="flex space-x-4 text-xs text-gray-100">
                            <a href="#" className="hover:text-yellow-200 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-yellow-200 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}