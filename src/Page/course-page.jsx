import React, { useState, useEffect, useRef } from 'react';
import { Clock, Star, ChevronDown, BookOpen, Users, Award } from 'lucide-react';

const CoursePage = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCourses, setVisibleCourses] = useState({});
    const [scrollY, setScrollY] = useState(0);

    // Track scroll for navbar compatibility
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [categoriesResponse, coursesResponse] = await Promise.all([
                fetch('https://dewavefreeapi20250731173800.azurewebsites.net/api/categories'),
                fetch('https://dewavefreeapi20250731173800.azurewebsites.net/api/courses')
            ]);

            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            if (!coursesResponse.ok) throw new Error('Failed to fetch courses');

            const categoriesData = await categoriesResponse.json();
            const coursesData = await coursesResponse.json();

            setCategories(categoriesData);
            setCourses(coursesData);

            // Initialize visible courses count for each category (3 per category)
            const initialVisible = {};
            categoriesData.forEach(category => {
                initialVisible[category.id] = 3;
            });
            setVisibleCourses(initialVisible);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const loadMoreCourses = (categoryId) => {
        const currentVisible = visibleCourses[categoryId] || 3;
        const newVisible = currentVisible + 3;

        setVisibleCourses(prev => ({
            ...prev,
            [categoryId]: newVisible
        }));
    };

    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0
            ? mins > 0
                ? `${hours}h ${mins}m`
                : `${hours}h`
            : `${mins}m`;
    };

    const handleCourseClick = (courseId) => {
        console.log(`Navigate to course: ${courseId}`);
        // Add your navigation logic here
        // navigate(`/course/${courseId}`);
    };

    const getCoursesByCategory = (categoryId) => {
        return courses.filter(course => course.categoryId === categoryId);
    };

    // Calculate navbar height based on scroll position (same logic as navbar)
    const maxLogoScroll = 100;
    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const navbarHeight = 80; // 20 * 4 = 80px (h-20)
    const totalNavbarHeight = logoHeight + navbarHeight;

    const CourseCard = ({ course }) => {
        return (
            <div
                className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-[#836953]/30 hover:-translate-y-2 transform"
                onClick={() => handleCourseClick(course.id)}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={course.image?.trim() || "/no-image.png"}
                        alt={course.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/no-image.png";
                        }}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#836953] transition-colors duration-300">
                        {course.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Star size={16} fill="#836953" className="text-[#836953]" />
                            <span>{course.rating ? course.rating.toFixed(1) : 'N/A'}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Clock size={16} className="text-[#836953]" />
                            <span>{formatDuration(course.duration)}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {course.description || "No description available"}
                    </p>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#836953] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading courses: {error}</p>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-[#836953] text-white rounded-lg hover:bg-[#6d5643] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Spacer for fixed navbar */}
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />

            {/* Hero Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#836953] via-[#9d7d65] to-[#836953]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fadeIn">
                            <Award size={20} />
                            <span className="text-sm font-medium">Premium Learning Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent animate-slideInUp">
                            Explore Course Categories
                        </h1>

                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                            Discover world-class courses organized by category. Start your learning journey today with expert-crafted content.
                        </p>

                        <div className="flex items-center justify-center gap-8 text-sm animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-2">
                                <BookOpen size={18} />
                                <span>{courses.length}+ Courses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={18} />
                                <span>50k+ Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={18} />
                                <span>Expert Instructors</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="rgb(249, 250, 251)"></path>
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {categories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg">No categories available</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map((category, categoryIndex) => {
                            const categoryId = category.id;
                            const categoryCourses = getCoursesByCategory(categoryId);
                            const coursesToShow = visibleCourses[categoryId] || 3;
                            const visibleCoursesList = categoryCourses.slice(0, coursesToShow);
                            const hasMoreCourses = categoryCourses.length > coursesToShow;

                            return (
                                <section
                                    key={category.id}
                                    className="space-y-8"
                                    style={{
                                        animationDelay: `${categoryIndex * 200}ms`,
                                        animation: 'fadeInUp 0.8s ease-out forwards'
                                    }}
                                >
                                    {/* Category Header */}
                                    <div className="text-center">
                                        <div className="inline-flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#836953] to-[#9d7d65] rounded-full flex items-center justify-center">
                                                <BookOpen size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                                    {category.name}
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-lg mb-2 max-w-2xl mx-auto">
                                            {category.description}
                                        </p>

                                        <p className="text-sm text-[#836953] font-medium mb-6">
                                            {categoryCourses.length} courses available
                                        </p>

                                        {/* Decorative Underline */}
                                        <div className="relative mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-[#836953] to-transparent rounded-full mb-8">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#836953] to-[#9d7d65] rounded-full animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Courses Grid */}
                                    {visibleCoursesList.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {visibleCoursesList.map((course, index) => (
                                                    <CourseCard
                                                        key={course.id}
                                                        course={course}
                                                    />
                                                ))}
                                            </div>

                                            {/* Load More Button */}
                                            {hasMoreCourses && (
                                                <div className="flex justify-center pt-8">
                                                    <button
                                                        onClick={() => loadMoreCourses(category.id)}
                                                        className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#836953] text-[#836953] rounded-full hover:text-white transition-all duration-500 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                                    >
                                                        <div className="absolute inset-0 bg-[#836953] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                                        <span className="relative z-10">Load More Courses</span>
                                                        <ChevronDown size={18} className="relative z-10 group-hover:animate-bounce" />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <BookOpen size={24} className="text-gray-400" />
                                            </div>
                                            <p className="text-gray-500 text-lg">No courses available in this category</p>
                                            <p className="text-gray-400 text-sm mt-2">Check back soon for new content!</p>
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                .animate-slideInUp {
                    animation: slideInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default CoursePage;