import React, { useEffect, useState, useRef } from 'react';
import TestimonialCard from "../components/testimonial-card.jsx";
import { gsap } from 'gsap';

const SLIDE_DURATION = 6000; // 6 seconds

export default function TestimonialSection() {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState(0);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/review');
                const data = await response.json();
                if (Array.isArray(data)) setReviews(data);
                else console.error('No reviews found.');
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    // Handle auto-slide
    useEffect(() => {
        if (reviews.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length);
            }, SLIDE_DURATION);

            return () => clearInterval(interval);
        }
    }, [reviews]);

    // Set slide width based on visible wrapper size (responsive)
    useEffect(() => {
        const updateSlideWidth = () => {
            if (wrapperRef.current) {
                setSlideWidth(wrapperRef.current.offsetWidth);
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
        return () => window.removeEventListener('resize', updateSlideWidth);
    }, [reviews.length]); // re-check after reviews load

    // Animate slide with GSAP
    useEffect(() => {
        if (containerRef.current && slideWidth > 0) {
            const targetX = -currentIndex * slideWidth;
            gsap.to(containerRef.current, {
                x: targetX,
                duration: 0.8,
                ease: 'power2.inOut'
            });
        }
    }, [currentIndex, slideWidth]);

    if (reviews.length === 0) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                        What Our Students Say
                    </h2>
                    <div className="flex justify-center">
                        <div className="w-full max-w-[720px] h-[320px] bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Loading testimonials...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-[760px] mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                    What Our Students Say
                </h2>

                <div className="flex justify-center">
                    <div ref={wrapperRef} className="overflow-hidden w-full">
                        <div
                            ref={containerRef}
                            className="flex"
                            style={{ width: `${reviews.length * slideWidth}px` }}
                        >
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0"
                                    style={{ width: slideWidth }}
                                >
                                    <TestimonialCard
                                        name={review.author_name}
                                        role={review.role || "Student"}
                                        content={review.text}
                                        rating={review.rating}
                                        imageUrl={review.profile_photo_url}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-6 gap-2">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
