import React, { useEffect, useRef } from 'react';

const Affiliates = () => {
    // Combined all unique awards from both arrays with proper company names
    const logos = [
        { id: 1, name: 'TOP Best Choice Award', url: "/TOP Best Choice.png" },
        { id: 2, name: 'Indonesia Creativity & Best Leader', url: "/INDONESIA CREATIVITY & BEST LEADER AWARD 2023.png" },
        { id: 3, name: 'Business Opportunity 2023', url: "/BUSINESS OPPORTUNITY 2023.png" },
        { id: 4, name: 'Best Franchise 2022', url: "/BEST FRANCHISE 2022.png" },
        { id: 5, name: '20 Best Choice Business', url: "/20 BEST CHOICE BUSINESS 2024.png" },
        { id: 6, name: 'TOP 20 Business Opportunity', url: "/TOP 20 BUSINESS OPPORTUNITY 2023.png" },
        { id: 7, name: 'Top Franchise 2021', url: "/TOP FRANCHISE 2021.png" },
        { id: 8, name: 'Most Innovative BO', url: "/LOGO MOST INNOVATIVE BO 2024.png" },
        { id: 9, name: 'Best Choice Business 2024', url: "/BEST CHOICE BUSINESS 2024.png" },
        { id: 10, name: 'Business Opportunity 2022', url: "/BUSINESS OPPORTUNITY 2022.jpg" },
        { id: 11, name: 'Most Promising Brand', url: "/MOST PROMISING BRAND 2019.png" },
    ];

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    Awards & Recognition
                </h2>
                <GSAPZigzagLogos logos={logos} />
            </div>
        </div>
    );
};

const GSAPZigzagLogos = ({ logos }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            const container = containerRef.current;
            if (!container) return;

            const scrollContainer = container.querySelector('.scroll-container');
            const logoItems = container.querySelectorAll('.zigzag-logo');

            if (!scrollContainer || logoItems.length === 0) return;

            // Use GSAP's built-in seamless looping with xPercent
            // This moves exactly 33.333% (one set out of three) continuously
            timelineRef.current = window.gsap.timeline({
                repeat: -1,
            });

            timelineRef.current.fromTo(scrollContainer,
                { xPercent: 0 },
                {
                    xPercent: -33.333,
                    duration: 20,
                    ease: 'none',
                    // Use modifiers for true seamless infinite scroll
                    modifiers: {
                        xPercent: window.gsap.utils.unitize(window.gsap.utils.wrap(-33.333, 0))
                    }
                }
            );
        };

        document.head.appendChild(script);

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [logos.length]);

    return (
        <div ref={containerRef} className="relative h-32 overflow-hidden">
            <div className="scroll-container flex items-start absolute whitespace-nowrap">
                {/* Render logos three times for seamless looping */}
                {[0, 1, 2].map((setIndex) => (
                    <React.Fragment key={setIndex}>
                        {logos.map((logo, index) => {
                            // Calculate global index across all sets for continuous zigzag
                            const globalIndex = (setIndex * logos.length) + index;
                            const isTop = globalIndex % 2 === 0;

                            return (
                                <div
                                    key={`${logo.id}-${setIndex}`}
                                    className="zigzag-logo flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        alignSelf: isTop ? 'flex-start' : 'flex-end',
                                        marginTop: isTop ? '0' : '60px',
                                        marginLeft: '10px',
                                        marginRight: '10px',
                                        width: '100px' // Fixed width for consistent calculations
                                    }}
                                >
                                    <img
                                        src={logo.url}
                                        alt={logo.name}
                                        className="h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>

            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

export default Affiliates;