import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CourseSectionsComponent from "../components/course-syllabus.jsx";
import CourseOverview from "../components/detail-component.jsx";
import { useParams } from "react-router-dom";
import FaqSection from "../components/course-faq.jsx";
import CourseDescription from "../components/course-description.jsx";
import CourseBenefits from "../components/course-benefit.jsx";
import Collaborators from "../components/collaborators-section.jsx";

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const [courseSections, setCourseSections] = useState([]);
    const [courseFaqs, setCourseFaqs] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    const API_BASE = "https://dewavefreeapi20250731173800.azurewebsites.net/api";

    // Track scroll for navbar compatibility
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                const [detailsResponse, sectionsResponse, faqsResponse, coursesResponse, collaboratorsResponse] = await Promise.all([
                    fetch(`${API_BASE}/CourseDetails`),
                    fetch(`${API_BASE}/CourseSections`),
                    fetch(`${API_BASE}/CourseFaqs`),
                    fetch(`${API_BASE}/Courses`),
                    fetch(`${API_BASE}/CourseInstructors/course/${courseId}`), // Changed endpoint
                ]);

                if (!detailsResponse.ok || !sectionsResponse.ok || !faqsResponse.ok) {
                    throw new Error("Failed to fetch course data");
                }

                const [allDetails, allSections, allFaqs, allCourses, allCollaborators] = await Promise.all([
                    detailsResponse.json(),
                    sectionsResponse.json(),
                    faqsResponse.json(),
                    coursesResponse.json(),
                    collaboratorsResponse.ok ? collaboratorsResponse.json() : Promise.resolve([]),
                ]);

                const courseDetails = allDetails.find((detail) => detail.courseId === parseInt(courseId));
                const courseInfo = allCourses.find((c) => c.id === parseInt(courseId));
                const filteredSections = allSections
                    .filter((section) => section.courseId === parseInt(courseId))
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                const filteredFaqs = allFaqs
                    .filter((faq) => faq.courseId === parseInt(courseId))
                    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

                setCourseDetail(courseDetails);
                setCourse(courseInfo);
                setCourseSections(filteredSections);
                setCourseFaqs(filteredFaqs);
                setCollaborators(allCollaborators); // Set collaborators instead of instructors
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (courseId && courseId !== "undefined") {
            fetchCourseData();
        } else {
            setError("Invalid course ID");
            setLoading(false);
        }
    }, [courseId]);

    // Calculate navbar height based on scroll position (matching Navbar component logic)
    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const navbarHeight = 80; // h-20 in Tailwind
    const totalNavbarHeight = logoHeight + navbarHeight;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div
                    className="fixed top-0 left-0 w-full transition-all duration-300 ease-in-out"
                    style={{ height: `${totalNavbarHeight}px` }}
                />
                <div className="text-gray-400 text-lg font-medium animate-pulse">Loading course details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <div
                    className="w-full transition-all duration-300 ease-in-out"
                    style={{ height: `${totalNavbarHeight}px` }}
                />
                <div className="flex flex-col items-center justify-center px-4 text-center py-20">
                    <p className="text-red-500 text-xl font-semibold mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                        aria-label="Back to Courses"
                    >
                        <ArrowLeft size={20} />
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Spacer for fixed navbar */}
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />

            {/* Header Bar */}
            <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-20 shadow-sm"
                    style={{ top: `${totalNavbarHeight}px` }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                        aria-label="Back to courses"
                    >
                        <ArrowLeft size={18} className="sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="font-semibold text-sm sm:text-base">Back to Courses</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative">
                {/* Hero Section */}
                <section className="w-full">
                    <CourseOverview courseDetail={courseDetail} courseSections={courseSections} course={course} />
                </section>

                {/* Course Benefits */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
                    <CourseBenefits />
                </section>

                {/* Course Description */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
                    <div className="border-b border-gray-200 pb-3 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Description</h2>
                    </div>
                    <CourseDescription
                        fullDescriptionHtml={courseDetail?.fullDescriptionHtml}
                        toolsRequired={courseDetail?.toolsRequired}
                    />
                </section>

                {/* Syllabus / Sections */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
                    <div className="border-b border-gray-200 pb-3 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Course Syllabus</h2>
                        <p className="text-sm text-gray-600 mt-1">Detailed breakdown of course content and structure</p>
                    </div>
                    <CourseSectionsComponent sections={courseSections} />
                </section>

                {/* FAQ */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
                    <div className="border-b border-gray-200 pb-3 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        <p className="text-sm text-gray-600 mt-1">Common questions and answers about this course</p>
                    </div>
                    <FaqSection faqs={courseFaqs} />
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
                    <div className="border-b border-gray-200 pb-3 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Collaborators</h2>
                        <p className="text-sm text-gray-600 mt-1">Meet your course collaborators</p>
                    </div>
                    <Collaborators collaborators={collaborators} loading={loading} />
                </section>
            </div>
        </main>
    );
};

export default CourseDetailPage;
