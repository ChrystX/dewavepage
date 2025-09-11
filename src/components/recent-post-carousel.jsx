import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import CarouselBlogCard from "./carousel-blog-card.jsx";

const RecentPostsCarousel = ({ blogs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(5);
    const [containerWidth, setContainerWidth] = useState(0);
    const navigate = useNavigate();

    // Responsive configuration
    const getResponsiveConfig = useCallback(() => {
        const width = window.innerWidth;

        if (width < 480) {
            return { visibleCount: 1.2, cardWidth: Math.min(280, width - 32), gap: 16 };
        } else if (width < 640) {
            return { visibleCount: 1.5, cardWidth: 260, gap: 16 };
        } else if (width < 768) {
            return { visibleCount: 2.3, cardWidth: 240, gap: 16 };
        } else if (width < 1024) {
            return { visibleCount: 3, cardWidth: 280, gap: 20 };
        } else if (width < 1280) {
            return { visibleCount: 4, cardWidth: 300, gap: 20 };
        } else {
            return { visibleCount: 4.5, cardWidth: 320, gap: 24 };
        }
    }, []);

    const updateLayout = useCallback(() => {
        const config = getResponsiveConfig();
        setVisibleCount(config.visibleCount);
        const width = window.innerWidth;
        setContainerWidth(width < 640 ? width - 32 : width - 64);
    }, [getResponsiveConfig]);

    useEffect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, [updateLayout]);

    const config = getResponsiveConfig();
    const cardWidth = Math.floor((containerWidth - (config.gap * (Math.floor(config.visibleCount) - 1))) / config.visibleCount);
    const maxIndex = Math.max(0, blogs.length - Math.floor(config.visibleCount));

    useEffect(() => {
        if (blogs.length <= Math.floor(config.visibleCount)) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [blogs.length, config.visibleCount, maxIndex]);

    const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    const goToSlide = (index) => setCurrentIndex(Math.min(index, maxIndex));
    const handleBlogClick = (blog) => navigate(`/blog/${blog.id}`);

    if (blogs.length === 0) return null;

    const showControls = blogs.length > Math.floor(config.visibleCount);
    const slideDistance = currentIndex * (cardWidth + config.gap);

    return (
        <section className="mb-8 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4 sm:px-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Latest Stories</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Fresh content just published</p>
                </div>

                {/* Navigation controls */}
                {showControls && (
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className="p-2.5 rounded-full border border-gray-200 hover:bg-[#E91E63] hover:text-white hover:border-[#E91E63] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            className="p-2.5 rounded-full border border-gray-200 hover:bg-[#E91E63] hover:text-white hover:border-[#E91E63] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Carousel container */}
            <div className="relative">
                <div className="overflow-hidden px-4 sm:px-8">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${slideDistance}px)`,
                            gap: `${config.gap}px`
                        }}
                    >
                        {blogs.map((blog, index) => (
                            <div
                                key={blog.id}
                                style={{
                                    minWidth: `${cardWidth}px`,
                                    width: `${cardWidth}px`
                                }}
                            >
                                <CarouselBlogCard
                                    blog={blog}
                                    index={index}
                                    onClick={handleBlogClick}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile navigation controls */}
                {showControls && (
                    <div className="flex sm:hidden justify-center gap-3 mt-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-[#E91E63] hover:text-white transition-all duration-300 touch-manipulation"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-[#E91E63] hover:text-white transition-all duration-300 touch-manipulation"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Progress indicators */}
            {showControls && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                                currentIndex === i
                                    ? 'bg-[#E91E63] scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecentPostsCarousel;
