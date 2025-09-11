import React, { useState, useEffect, useRef } from 'react';
import CategoryCard from '../components/category-card.jsx';
import CourseCard from '../components/course-card.jsx';
import useCourseData from "../hooks/useCourseData.js";

const categories = [
    { id: 1, name: 'Massage', description: 'Pelatihan Pijat', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop' },
    { id: 2, name: 'Lashes', description: 'Pelatihan Kecantikan Bulu Mata', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop' },
    { id: 3, name: 'Waxing', description: 'Pelatihan Waxing', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop' },
    { id: 4, name: 'Nails', description: 'Pelatihan Kecantikan Kuku', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop' },
    { id: 5, name: 'Make Up', description: 'Pelatihan Kecantikan Wajah', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' }
];

const CategoryCourseSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isMobile, setIsMobile] = useState(false);
    const { courses, loading, error } = useCourseData();

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
    const [momentum, setMomentum] = useState({ velocity: 0, timestamp: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = isMobile ? 200 : 320; // Smaller scroll amount on mobile
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const applyMomentum = () => {
        if (!scrollRef.current || Math.abs(momentum.velocity) < 0.1) {
            setMomentum({ velocity: 0, timestamp: 0 });
            return;
        }

        scrollRef.current.scrollLeft -= momentum.velocity;

        const friction = 0.95;
        setMomentum(prev => ({
            ...prev,
            velocity: prev.velocity * friction
        }));

        animationRef.current = requestAnimationFrame(applyMomentum);
    };

    const handleMouseDown = (e) => {
        if (!scrollRef.current) return;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        setIsDragging(true);
        setDragStart({
            x: e.clientX,
            scrollLeft: scrollRef.current.scrollLeft
        });
        setMomentum({ velocity: 0, timestamp: Date.now() });

        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !scrollRef.current) return;

        e.preventDefault();

        const currentTime = Date.now();
        const deltaX = e.clientX - dragStart.x;
        const newScrollLeft = dragStart.scrollLeft - deltaX;

        const timeDelta = currentTime - momentum.timestamp;
        if (timeDelta > 0) {
            const velocity = (scrollRef.current.scrollLeft - newScrollLeft) / timeDelta * 16;
            setMomentum({ velocity, timestamp: currentTime });
        }

        scrollRef.current.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (Math.abs(momentum.velocity) > 0.5) {
            animationRef.current = requestAnimationFrame(applyMomentum);
        }
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
        if (!scrollRef.current) return;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({
            x: touch.clientX,
            scrollLeft: scrollRef.current.scrollLeft
        });
        setMomentum({ velocity: 0, timestamp: Date.now() });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !scrollRef.current) return;

        const touch = e.touches[0];
        const currentTime = Date.now();
        const deltaX = touch.clientX - dragStart.x;
        const newScrollLeft = dragStart.scrollLeft - deltaX;

        const timeDelta = currentTime - momentum.timestamp;
        if (timeDelta > 0) {
            const velocity = (scrollRef.current.scrollLeft - newScrollLeft) / timeDelta * 16;
            setMomentum({ velocity, timestamp: currentTime });
        }

        scrollRef.current.scrollLeft = newScrollLeft;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        if (Math.abs(momentum.velocity) > 0.5) {
            animationRef.current = requestAnimationFrame(applyMomentum);
        }
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => handleMouseMove(e);
        const handleGlobalMouseUp = () => handleMouseUp();

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, dragStart, momentum]);

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-600">Error: {error}</p>;

    const filteredCourses = courses.filter(c => c.categoryId === selectedCategory.id);

    return (
        <div className="w-full overflow-hidden"> {/* Add overflow-hidden wrapper */}
            <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6">
                {/* Categories */}
                <div className="mb-6 md:mb-10">
                    {/* Centered heading */}
                    <div className="text-center mb-6 md:mb-8">
                        <h1 className="font-poppins text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900">
                            Training Categories
                        </h1>
                    </div>

                    {/* Desktop Categories */}
                    <div className="hidden md:flex gap-4 lg:gap-6">
                        {categories.map(cat => (
                            <div key={cat.id} className="flex-1">
                                <CategoryCard
                                    category={cat}
                                    isSelected={selectedCategory.id === cat.id}
                                    onClick={setSelectedCategory}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Categories - Centered horizontal menu */}
                    <div className="md:hidden">
                        <div className="flex justify-center">
                            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 pb-2 max-w-full">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap relative ${
                                            selectedCategory.id === cat.id
                                                ? 'text-[#e91e63]'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        {cat.name}
                                        {selectedCategory.id === cat.id && (
                                            <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#e91e63] rounded"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses */}
                <div className="border border-gray-200 rounded-lg p-3 md:p-6 bg-white shadow-sm overflow-hidden"> {/* Add overflow-hidden and reduce mobile padding */}
                    <div className="flex flex-col lg:flex-row lg:gap-8">
                        {/* Left side - Category Info */}
                        <div className="lg:w-80 lg:flex-shrink-0 mb-6 lg:mb-0">
                            <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                                {selectedCategory.name}
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                                {selectedCategory.description}
                            </p>
                            <div className="space-y-1 text-sm text-gray-500">
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#e91e63] rounded-full"></span>
                                    {filteredCourses.length} Course{filteredCourses.length > 1 ? 's' : ''}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#e91e63] rounded-full"></span>
                                    Professional Training
                                </p>
                            </div>
                        </div>

                        {/* Right side - Courses */}
                        <div className="flex-1 min-w-0 overflow-hidden"> {/* Add overflow-hidden */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base md:text-lg font-medium text-gray-800">Available Courses</h3>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => scroll('left')}
                                        className="p-2 hover:bg-[#e91e63]/10 rounded-lg transition-colors duration-200 text-lg font-bold text-[#e91e63] hover:text-[#c2185b]"
                                        aria-label="Scroll left"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={() => scroll('right')}
                                        className="p-2 hover:bg-[#e91e63]/10 rounded-lg transition-colors duration-200 text-lg font-bold text-[#e91e63] hover:text-[#c2185b]"
                                        aria-label="Scroll right"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>

                            {/* Mobile: Single column layout */}
                            <div className="md:hidden">
                                {filteredCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredCourses.slice(0, 3).map(course => ( // Show only first 3 on mobile
                                            <div key={course.Id} className="w-full">
                                                <CourseCard course={course} />
                                            </div>
                                        ))}
                                        {filteredCourses.length > 3 && (
                                            <div className="text-center pt-2">
                                                <button className="text-[#e91e63] text-sm font-medium hover:text-[#c2185b] transition-colors">
                                                    View All {filteredCourses.length} Courses →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full text-center py-8">
                                        <div className="text-gray-400 mb-2">
                                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-sm">No courses available in this category</p>
                                    </div>
                                )}
                            </div>

                            {/* Desktop: Horizontal scroll layout */}
                            <div className="hidden md:block">
                                <div
                                    ref={scrollRef}
                                    className={`flex gap-4 overflow-x-auto scrollbar-hide pb-2 select-none ${
                                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                                    }`}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        userSelect: 'none',
                                        WebkitUserSelect: 'none'
                                    }}
                                >
                                    {filteredCourses.length > 0 ? (
                                        filteredCourses.map(course => (
                                            <div
                                                key={course.Id}
                                                className="flex-none w-80" // Fixed width for desktop
                                            >
                                                <CourseCard course={course} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full text-center py-8">
                                            <div className="text-gray-400 mb-2">
                                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 text-sm">No courses available in this category</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Styles */}
                <style jsx>{`
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .cursor-grab {
                        cursor: grab;
                    }
                    .cursor-grabbing {
                        cursor: grabbing;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default CategoryCourseSection;