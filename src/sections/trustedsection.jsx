import React, { useEffect, useRef } from 'react';

const Affiliates = () => {
    const logos = [
        { id: 1, name: 'Company A', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
        { id: 2, name: 'Company B', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
        { id: 3, name: 'Company C', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg' },
        { id: 4, name: 'Company D', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/F1_logo.svg' },
        { id: 5, name: 'Company E', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Moto_Gp_logo.svg' },
        { id: 6, name: 'Company F', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
    ];

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    Our Trusted Partners
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
                            const isTop = index % 2 === 0;

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