import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SweeperContainer from "../components/sweeper-container.jsx";
import useCourseData from "../hooks/useCourseData.js";

const SweeperSection = () => {
    const { courses, loading, error, refetch} = useCourseData();
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    if (loading) {
        return (
            <section className="px-4 py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-[#e91e63] border-t-transparent rounded-full animate-spin"></div>
                    <p className="ml-3 text-gray-600 text-sm sm:text-base">
                        Loading courses...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-4 py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-red-600">Error: {error}</p>
                    <button
                        onClick={refetch}
                        className="mt-4 px-4 py-2 bg-[#e91e63] text-white text-sm rounded-lg hover:bg-[#c2185b] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="px-4 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Explore Our Courses
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed max-w-md">
                        Discover curated courses designed to help you grow your skills and
                        expand your knowledge. Stay ahead with practical learning
                        experiences across multiple fields.
                    </p>
                    <button
                        onClick={() => navigate("/course")}
                        className="px-6 py-3 bg-[#e91e63] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#c2185b] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    >
                        Browse All Courses
                    </button>
                </div>

                {/* Right Sweeper */}
                <div className="relative">
                    {courses.length > 0 ? (
                        <SweeperContainer courses={courses} />
                    ) : (
                        <p className="text-gray-500 text-center">No courses available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SweeperSection;