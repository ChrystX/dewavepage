import React, { useState, useEffect, useRef } from 'react';
import CategoryCard from '../components/category-card.jsx';
import CourseCard from '../components/course-card.jsx';

const categories = [
    { id: 1, name: 'Massage', description: 'Pelatihan Pijat', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop' },
    { id: 2, name: 'Lashes', description: 'Pelatihan Kecantikan Bulu Mata', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop' },
    { id: 3, name: 'Waxing', description: 'Pelatihan Waxing', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop' },
    { id: 4, name: 'Nails', description: 'Pelatihan Kecantikan Kuku', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop' },
    { id: 5, name: 'Make Up', description: 'Pelatihan Kecantikan Wajah', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' }
];

const CategoryCourseSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
    const [momentum, setMomentum] = useState({ velocity: 0, timestamp: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        fetchCourses();
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://dewavefreeapiapi.azure-api.net/api/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = isMobile ? 280 : 320; // Smaller scroll amount on mobile
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
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Categories */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Training Categories</h1>

                {/* Desktop Categories */}
                <div className="hidden md:flex gap-6">
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

                {/* Mobile Categories - Horizontal menu with bottom line indicators */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 pb-1">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-3 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap relative ${
                                    selectedCategory.id === cat.id
                                        ? 'text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {cat.name}
                                {selectedCategory.id === cat.id && (
                                    <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courses */}
            <div className="border border-gray-200 rounded-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Left side - Category Info */}
                    <div className="md:w-80 md:flex-shrink-0 mb-6 md:mb-0">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                            {selectedCategory.name}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 md:mb-4">
                            {selectedCategory.description}
                        </p>
                        <div className="space-y-1 text-sm text-gray-500">
                            <p>{filteredCourses.length} Course{filteredCourses.length > 1 ? 's' : ''}</p>
                            <p>Professional Training</p>
                        </div>
                    </div>

                    {/* Right side - Courses */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base md:text-lg font-medium text-gray-800">Courses</h3>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => scroll('left')}
                                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors duration-200 text-xl font-bold text-gray-600 hover:text-gray-800"
                                    aria-label="Scroll left"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors duration-200 text-xl font-bold text-gray-600 hover:text-gray-800"
                                    aria-label="Scroll right"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            className={`flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 select-none ${
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
                            {filteredCourses.map(course => (
                                <div
                                    key={course.Id}
                                    className="flex-none w-72 md:w-80"
                                >
                                    <CourseCard course={course} />
                                </div>
                            ))}
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
    );
};

export default CategoryCourseSection;