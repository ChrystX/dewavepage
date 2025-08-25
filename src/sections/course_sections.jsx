import { useState, useEffect } from 'react';
import CourseCard from "../components/course-card.jsx";

const CoursesSection = () => {
    const [courses, setCourses] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://dewavefreeapiapi.azure-api.net/api/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            console.log("Course API data:", data);
            setCourses(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6); // Load 6 more at a time for better UX
    };

    const visibleCourses = courses.slice(0, visibleCount);

    if (loading) {
        return (
            <section className="px-4 py-6 sm:py-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
                        Featured Courses
                    </h2>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 text-sm sm:text-base">Loading courses...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-4 py-6 sm:py-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
                        Featured Courses
                    </h2>
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-red-700 mb-4 text-sm sm:text-base">
                                Error loading courses: {error}
                            </p>
                            <button
                                onClick={fetchCourses}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors active:scale-95"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="px-4 py-6 sm:py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
                    Featured Courses
                </h2>

                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
                            <p className="text-gray-600 text-sm sm:text-base">
                                No courses available at the moment.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 2-column grid for mobile, 3 for larger screens */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {visibleCourses.map(course => (
                                <CourseCard key={course.Id} course={course} />
                            ))}
                        </div>

                        {visibleCount < courses.length && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-6 py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 min-w-[120px]"
                                >
                                    Load More ({courses.length - visibleCount} remaining)
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;