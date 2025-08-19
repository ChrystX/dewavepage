import React from 'react';
import LocationMap from '../components/map.jsx'; // your reusable component

const LocationSection = ({ lat, lng }) => {
    return (
        <section className="h-[500px] flex dm-serif-text-regular max-w-6xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="w-2/5 bg-white flex flex-col">
                <div className="flex-1 px-12 py-8 flex flex-col justify-center">
                    <div className="max-w-sm">
                        <h2 className="text-3xl font-light mb-6 leading-tight" style={{ color: '#836953' }}>
                            Visit Our Academy
                        </h2>

                        <div className="space-y-6 text-gray-700">
                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#836953' }}>
                                    Location
                                </h3>
                                <div className="text-sm leading-relaxed">
                                    Jl. Mangkuyudan No.45, Mantrijeron<br />
                                    Kec. Mantrijeron, Kota Yogyakarta<br />
                                    Daerah Istimewa Yogyakarta 55143<br />
                                    Indonesia
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#836953' }}>
                                    Hours
                                </h3>
                                <div className="text-sm leading-relaxed">
                                    <div>Monday – Sunday: 8:30 AM – 5:00 PM</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#836953' }}>
                                    Contact
                                </h3>
                                <div className="text-sm leading-relaxed space-y-1">
                                    <div>+62 822-4275-2668</div>
                                    <div>dewave.id</div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                    Located in the heart of Mantrijeron, our academy provides a modern learning environment in one of Yogyakarta's vibrant districts.
                                </p>

                                <button
                                    className="inline-flex items-center text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:opacity-70"
                                    style={{ color: '#836953' }}
                                    onClick={() => window.open(`https://maps.google.com?q=${lat},${lng}`, '_blank')}
                                >
                                    Get Directions
                                    <svg
                                        className="w-3 h-3 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Map */}
            <div className="w-3/5 relative">
                <LocationMap width="100%" height="500px" zoom={16} />
                {/* Overlay for mobile responsiveness indicator */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg lg:hidden">
                    <p className="text-xs text-gray-600">Scroll to interact with map</p>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
