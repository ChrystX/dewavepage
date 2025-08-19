import { useState, useEffect } from 'react';
import CourseCard from "../components/course-card.jsx";

const CoursesSection = () => {
    const [courses, setCourses] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
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
        setVisibleCount(prev => prev + 3);
    };

    const visibleCourses = courses.slice(0, visibleCount);

    if (loading) {
        return (
            <section className="courses-section">
                <div className="container">
                    <h2 className="section-title">Featured Courses</h2>
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading courses...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="courses-section">
                <div className="container">
                    <h2 className="section-title">Featured Courses</h2>
                    <div className="error-container">
                        <p>Error loading courses: {error}</p>
                        <button onClick={fetchCourses} className="retry-button">Try Again</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="courses-section">
            <div className="container">
                <h2 className="section-title">Featured Courses</h2>
                {courses.length === 0 ? (
                    <div className="no-courses">
                        <p>No courses available at the moment.</p>
                    </div>
                ) : (
                    <>
                        <div className="courses-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {visibleCourses.map(course => (
                                <CourseCard key={course.Id} course={course} />
                            ))}
                        </div>
                        {visibleCount < courses.length && (
                            <div className="text-center mt-6">
                                <button onClick={handleLoadMore} className="button-load px-4 py-2 bg-black text-white  hover:bg-gray-800 transition">
                                    Load More
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
