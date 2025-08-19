import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CourseSectionsComponent from "../components/course-syllabus.jsx";
import CourseOverview from "../components/detail-component.jsx";
import { useParams } from "react-router-dom";
import FaqSection from "../components/course-faq.jsx";
import CourseDescription from "../components/course-description.jsx";
import CourseBenefits from "../components/course-benefit.jsx";

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const [courseSections, setCourseSections] = useState([]);
    const [courseFaqs, setCourseFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);

    const API_BASE = "https://dewavefreeapi20250731173800.azurewebsites.net/api";

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                const [detailsResponse, sectionsResponse, faqsResponse, coursesResponse] = await Promise.all([
                    fetch(`${API_BASE}/CourseDetails`),
                    fetch(`${API_BASE}/CourseSections`),
                    fetch(`${API_BASE}/CourseFaqs`),
                    fetch(`${API_BASE}/Courses`),
                ]);

                if (!detailsResponse.ok || !sectionsResponse.ok || !faqsResponse.ok) {
                    throw new Error("Failed to fetch course data");
                }

                const [allDetails, allSections, allFaqs, allCourses] = await Promise.all([
                    detailsResponse.json(),
                    sectionsResponse.json(),
                    faqsResponse.json(),
                    coursesResponse.json(),
                ]);

                const courseDetails = allDetails.find((detail) => detail.courseId === parseInt(courseId));
                const courseInfo = allCourses.find(
                    (c) => c.id === parseInt(courseId)
                );
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-gray-400 text-lg font-medium animate-pulse">Loading course details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
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
        );
    }

    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Header Bar */}
            <header className="flex items-center px-6 py-4 shadow-sm max-w-6xl mx-auto sticky top-0 bg-white z-20">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                    aria-label="Back to courses"
                >
                    <ArrowLeft size={20} />
                    <span className="font-semibold text-sm">Back</span>
                </button>
            </header>

            {/* Main Heading (Hero Section with Background Image) */}
            <section className="w-full">
                <CourseOverview courseDetail={courseDetail} courseSections={courseSections} course={course} />
            </section>

            <section className="max-w-6xl mx-auto px-6 mb-16">
                <CourseBenefits />
            </section>

            <section className="max-w-6xl mx-auto px-6 mb-14">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">Description</h2>
                <CourseDescription     fullDescriptionHtml={courseDetail.fullDescriptionHtml}
                                       toolsRequired={courseDetail.toolsRequired} />
            </section>

            {/* Syllabus / Sections */}
            <section className="max-w-6xl mx-auto px-6 mb-14">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">Syllabus</h2>
                <CourseSectionsComponent sections={courseSections} />
            </section>

            {/* FAQ */}
            <section className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">FAQ</h2>
                <FaqSection faqs={courseFaqs} />
            </section>
        </main>
    );
};

export default CourseDetailPage;
