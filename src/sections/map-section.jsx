import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import LocationMap from "../components/map.jsx";
// Import your existing LocationMap component
// import LocationMap from './LocationMap'; // Adjust path as needed

// Animation hook for intersection observer
const useInView = (threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);
    const [elementRef, setElementRef] = useState(null);

    useEffect(() => {
        if (!elementRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold }
        );

        observer.observe(elementRef);
        return () => observer.disconnect();
    }, [elementRef, threshold]);

    return [setElementRef, isInView];
};

const LocationSection = ({ lat, lng }) => {
    const [locationRef, locationInView] = useInView(0.3);

    return (
        <section ref={locationRef} className="py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid lg:grid-cols-5 gap-0 min-h-[300px] sm:min-h-[400px]">
                        {/* Left Column - Text Content */}
                        <div className={`lg:col-span-2 bg-gradient-to-br from-white to-gray-50 flex flex-col transform transition-all duration-1000 ${
                            locationInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                        }`}>
                            <div className="flex-1 px-6 sm:px-8 lg:px-12 py-6 sm:py-8 flex flex-col justify-center">
                                <div className="max-w-sm">
                                    <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 leading-tight" style={{ color: '#e91e63' }}>
                                        Visit Our Academy
                                    </h2>

                                    <div className="space-y-4 sm:space-y-6 text-gray-700">
                                        <div className={`transform transition-all duration-700 delay-200 ${
                                            locationInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}>
                                            <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#e91e63' }}>
                                                Location
                                            </h3>
                                            <div className="text-xs sm:text-sm leading-relaxed">
                                                Jl. Mangkuyudan No.45, Mantrijeron<br />
                                                Kec. Mantrijeron, Kota Yogyakarta<br />
                                                Daerah Istimewa Yogyakarta 55143<br />
                                                Indonesia
                                            </div>
                                        </div>

                                        <div className={`transform transition-all duration-700 delay-400 ${
                                            locationInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}>
                                            <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#e91e63' }}>
                                                Hours
                                            </h3>
                                            <div className="text-xs sm:text-sm leading-relaxed">
                                                <div>Monday – Sunday: 8:30 AM – 5:00 PM</div>
                                            </div>
                                        </div>

                                        <div className={`transform transition-all duration-700 delay-600 ${
                                            locationInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}>
                                            <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#e91e63' }}>
                                                Contact
                                            </h3>
                                            <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                                                <div className="hover:text-gray-900 transition-colors cursor-pointer">+62 822-4275-2668</div>
                                                <div className="hover:text-gray-900 transition-colors cursor-pointer">dewave.id</div>
                                            </div>
                                        </div>

                                        <div className={`pt-2 transform transition-all duration-700 delay-800 ${
                                            locationInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}>
                                            <p className="text-xs leading-relaxed mb-3 sm:mb-4 text-gray-600">
                                                Located in the heart of Mantrijeron, our academy provides a modern learning environment in one of Yogyakarta's vibrant districts.
                                            </p>

                                            <button
                                                className="inline-flex items-center text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:opacity-70 hover:transform hover:translate-x-1 bg-white border-2 border-[#e91e63] px-3 py-2 rounded-lg shadow-sm hover:shadow-md group hover:bg-[#e91e63] hover:text-white"
                                                style={{ color: '#e91e63' }}
                                                onClick={() => window.open(`https://maps.google.com?q=${lat},${lng}`, '_blank')}
                                            >
                                                Get Directions
                                                <svg
                                                    className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Your Existing Map Component */}
                        <div
                            className={`lg:col-span-3 relative overflow-hidden transform transition-all duration-1000 delay-300 min-h-[300px] sm:min-h-[400px] ${
                                locationInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}
                        >
                            <LocationMap
                                width="100%"
                                height="100%" // fills parent
                                zoom={16}
                            />

                            {/* Mobile interaction overlay */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg lg:hidden">
                                <p className="text-xs text-gray-600">Scroll to interact with map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;