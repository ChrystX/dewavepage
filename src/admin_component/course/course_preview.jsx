import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Clock, Star, User, BookOpen, Play, CheckCircle, Mail, Phone, Award, Users } from 'lucide-react';

const CoursePreviewModal = ({ isOpen, onClose, course, courseId }) => {
    const [courseDetail, setCourseDetail] = useState(null);
    const [courseSections, setCourseSections] = useState([]);
    const [courseFaqs, setCourseFaqs] = useState([]);
    const [courseInstructors, setCourseInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const API_BASE = "https://dewavefreeapi20250731173800.azurewebsites.net/api";

    useEffect(() => {
        if (isOpen && courseId) {
            fetchCourseData();
        }
    }, [isOpen, courseId]);

    const fetchCourseData = async () => {
        setLoading(true);
        try {
            const [detailsResponse, sectionsResponse, faqsResponse, instructorsResponse] = await Promise.all([
                fetch(`${API_BASE}/CourseDetails`),
                fetch(`${API_BASE}/CourseSections`),
                fetch(`${API_BASE}/CourseFaqs`),
                fetch(`${API_BASE}/CourseInstructors/course/${courseId}`),
            ]);

            if (detailsResponse.ok) {
                const allDetails = await detailsResponse.json();
                const courseDetails = allDetails.find((detail) => detail.courseId === parseInt(courseId));
                setCourseDetail(courseDetails);
            }

            if (sectionsResponse.ok) {
                const allSections = await sectionsResponse.json();
                const filteredSections = allSections
                    .filter((section) => section.courseId === parseInt(courseId))
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                setCourseSections(filteredSections);
            }

            if (faqsResponse.ok) {
                const allFaqs = await faqsResponse.json();
                const filteredFaqs = allFaqs
                    .filter((faq) => faq.courseId === parseInt(courseId))
                    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
                setCourseFaqs(filteredFaqs);
            }

            if (instructorsResponse.ok) {
                const instructors = await instructorsResponse.json();
                setCourseInstructors(instructors);
            } else {
                setCourseInstructors([]);
            }
        } catch (error) {
            console.error('Error fetching course data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (duration) => {
        if (!duration) return 'Not specified';
        return `${duration} min`;
    };

    const formatRating = (rating) => {
        if (!rating) return 'Not rated';
        return `${rating.toFixed(1)} ★`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Course Preview</h2>
                            <p className="text-sm text-gray-600">{course?.title}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex h-full max-h-[calc(90vh-80px)]">
                    {/* Sidebar Navigation */}
                    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    activeTab === 'overview'
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Overview
                            </button>
                            {courseInstructors.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('instructors')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                        activeTab === 'instructors'
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Instructors ({courseInstructors.length})
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    activeTab === 'description'
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab('syllabus')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    activeTab === 'syllabus'
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Syllabus ({courseSections.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('faq')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    activeTab === 'faq'
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                FAQ ({courseFaqs.length})
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-gray-400 animate-pulse">Loading course details...</div>
                            </div>
                        ) : (
                            <>
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        {/* Course Hero */}
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
                                                    <p className="text-blue-100 mb-6">{course?.description}</p>

                                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                                        <div className="flex items-center space-x-2">
                                                            <User className="w-5 h-5 text-blue-200" />
                                                            <span className="text-sm">{course?.instructor || 'No instructor'}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="w-5 h-5 text-blue-200" />
                                                            <span className="text-sm">{formatDuration(course?.duration)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Star className="w-5 h-5 text-blue-200" />
                                                            <span className="text-sm">{formatRating(course?.rating)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Play className="w-5 h-5 text-blue-200" />
                                                            <span className="text-sm">{course?.videoCount || 0} videos</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center items-center">
                                                    {course?.image ? (
                                                        <img
                                                            src={course.image}
                                                            alt={course.title}
                                                            className="w-64 h-40 object-cover rounded-lg shadow-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-64 h-40 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                                            <BookOpen className="w-16 h-16 text-white opacity-50" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key Benefits */}
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {[
                                                    "Master the fundamentals and advanced concepts",
                                                    "Build real-world projects and applications",
                                                    "Learn industry best practices and techniques",
                                                    "Get hands-on experience with tools and frameworks",
                                                    "Develop problem-solving and critical thinking skills",
                                                    "Prepare for career advancement opportunities"
                                                ].map((benefit, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Instructors Tab - NEW */}
                                {activeTab === 'instructors' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-bold text-gray-900">Course Instructors</h3>
                                            <span className="text-sm text-gray-500">{courseInstructors.length} instructors</span>
                                        </div>

                                        <div className="space-y-6">
                                            {courseInstructors.map((instructor) => (
                                                <div
                                                    key={instructor.instructorId}
                                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex flex-col sm:flex-row gap-6">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-gray-200">
                                                                {instructor.imageUrl ? (
                                                                    <img
                                                                        src={instructor.imageUrl}
                                                                        alt={instructor.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                                                                        {instructor.name?.charAt(0) || "?"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 space-y-3">
                                                            <div>
                                                                <h4 className="text-xl font-bold text-gray-900">{instructor.name}</h4>
                                                                {instructor.role && (
                                                                    <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                                        {instructor.role}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {instructor.bio && (
                                                                <p className="text-gray-600 text-sm leading-relaxed">{instructor.bio}</p>
                                                            )}

                                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                                {instructor.contactEmail && (
                                                                    <div className="flex items-center gap-2">
                                                                        <Mail size={16} className="text-gray-400" />
                                                                        <a
                                                                            href={`mailto:${instructor.contactEmail}`}
                                                                            className="hover:text-blue-600 transition-colors"
                                                                        >
                                                                            {instructor.contactEmail}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                {instructor.phoneNumber && (
                                                                    <div className="flex items-center gap-2">
                                                                        <Phone size={16} className="text-gray-400" />
                                                                        <a
                                                                            href={`tel:${instructor.phoneNumber}`}
                                                                            className="hover:text-blue-600 transition-colors"
                                                                        >
                                                                            {instructor.phoneNumber}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {instructor.certifications && (
                                                                <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                                                                    <Award size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                                                    <div className="text-sm text-gray-600">
                                                                        <span className="font-medium">Certifications: </span>
                                                                        {instructor.certifications}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description Tab */}
                                {activeTab === 'description' && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Course Description</h3>

                                        {courseDetail?.fullDescriptionHtml ? (
                                            <div
                                                className="prose max-w-none"
                                                dangerouslySetInnerHTML={{ __html: courseDetail.fullDescriptionHtml }}
                                            />
                                        ) : (
                                            <div className="text-gray-500 italic">
                                                {course?.description || 'No detailed description available.'}
                                            </div>
                                        )}

                                        {courseDetail?.toolsRequired && (
                                            <div className="bg-blue-50 rounded-xl p-6">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tools Required</h4>
                                                <div
                                                    className="text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: courseDetail.toolsRequired }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Syllabus Tab */}
                                {activeTab === 'syllabus' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-bold text-gray-900">Course Syllabus</h3>
                                            <span className="text-sm text-gray-500">{courseSections.length} sections</span>
                                        </div>

                                        {courseSections.length === 0 ? (
                                            <div className="text-center py-12">
                                                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No course sections available yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {courseSections.map((section, index) => (
                                                    <div key={section.id} className="bg-white border border-gray-200 rounded-xl p-6">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <h4 className="text-lg font-semibold text-gray-900">
                                                                {index + 1}. {section.title}
                                                            </h4>
                                                            {section.duration && (
                                                                <span className="text-sm text-gray-500 flex items-center">
                                                                    <Clock className="w-4 h-4 mr-1" />
                                                                    {formatDuration(section.duration)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {section.description && (
                                                            <p className="text-gray-600 mb-3">{section.description}</p>
                                                        )}
                                                        {section.content && (
                                                            <div
                                                                className="prose prose-sm max-w-none text-gray-700"
                                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* FAQ Tab */}
                                {activeTab === 'faq' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                                            <span className="text-sm text-gray-500">{courseFaqs.length} questions</span>
                                        </div>

                                        {courseFaqs.length === 0 ? (
                                            <div className="text-center py-12">
                                                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No FAQs available yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {courseFaqs.map((faq) => (
                                                    <div key={faq.id} className="bg-white border border-gray-200 rounded-xl p-6">
                                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                                            {faq.question}
                                                        </h4>
                                                        <div className="text-gray-600">
                                                            {faq.answer || 'No answer provided.'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreviewModal;