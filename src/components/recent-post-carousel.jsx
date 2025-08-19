import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BlogCard from "./blog-card.jsx";

const RecentPostsCarousel = ({ blogs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const visibleCount = 5;

    // Auto-rotate functionality
    useEffect(() => {
        if (blogs.length <= visibleCount) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + 1 >= blogs.length - visibleCount + 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [blogs.length, visibleCount]);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + 1 >= blogs.length - visibleCount + 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.max(0, blogs.length - visibleCount) : prev - 1
        );
    };

    const handleBlogClick = (blog) => {
        // Navigate to the blog detail page
        navigate(`/blog/${blog.id}`);
    };

    if (blogs.length === 0) return null;

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Latest Stories</h2>
                    <p className="text-gray-600 text-sm">Fresh content just published</p>
                </div>
                {blogs.length > visibleCount && (
                    <div className="flex gap-1">
                        <button
                            onClick={prevSlide}
                            className="p-1.5 rounded-full border border-gray-200 hover:bg-[#836953] hover:text-white transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-3 h-3" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-1.5 rounded-full border border-gray-200 hover:bg-[#836953] hover:text-white transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex gap-3 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (200 + 12)}px)` }}
                >
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            index={index}
                            size="small"
                            onClick={handleBlogClick}
                        />
                    ))}
                </div>
            </div>

            {/* Optional: Dots indicator */}
            {blogs.length > visibleCount && (
                <div className="flex justify-center gap-1 mt-4">
                    {Array.from({ length: Math.ceil(blogs.length - visibleCount + 1) }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentIndex === i ? 'bg-[#836953]' : 'bg-gray-300 hover:bg-gray-400'
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