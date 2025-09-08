import { useState, useEffect } from 'react';

const CourseDetailModal = ({ isOpen, onClose, courseId }) => {
    const [courseDetail, setCourseDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        courseId: courseId || '',
        shortDescription: '',
        fullDescriptionHtml: '',
        toolsRequired: '',
        heroImage: ''
    });

    const COURSE_DETAILS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/CourseDetails';

    // Fetch course detail for the specific courseId
    const fetchCourseDetail = async () => {
        if (!courseId) return;

        setLoading(true);
        setError('');

        try {
            // First try to get all course details and find the one for this courseId
            const response = await fetch(COURSE_DETAILS_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const allDetails = await response.json();
            const courseDetailRecord = allDetails.find(detail => detail.courseId === courseId);

            if (courseDetailRecord) {
                setCourseDetail(courseDetailRecord);
                setFormData({
                    id: courseDetailRecord.id.toString(),
                    courseId: courseDetailRecord.courseId?.toString() || courseId.toString(),
                    shortDescription: courseDetailRecord.shortDescription || '',
                    fullDescriptionHtml: courseDetailRecord.fullDescriptionHtml || '',
                    toolsRequired: courseDetailRecord.toolsRequired || '',
                    heroImage: courseDetailRecord.heroImage || ''
                });
            } else {
                // No existing detail found, prepare for creation
                setCourseDetail(null);
                setFormData({
                    id: '',
                    courseId: courseId.toString(),
                    shortDescription: '',
                    fullDescriptionHtml: '',
                    toolsRequired: '',
                    heroImage: ''
                });
                setIsEditing(true); // Start in editing mode if no data exists
            }
        } catch (err) {
            console.error('Error fetching course detail:', err);
            setError('Failed to load course details. Please try again.');
            setCourseDetail(null);
        } finally {
            setLoading(false);
        }
    };

    // Save course detail (create or update)
    const saveCourseDetail = async () => {
        if (!formData.id && !isEditing) {
            setError('ID is required for creating new course detail');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const payload = {
                id: formData.id ? parseInt(formData.id) : undefined,
                courseId: formData.courseId ? parseInt(formData.courseId) : null,
                shortDescription: formData.shortDescription || null,
                fullDescriptionHtml: formData.fullDescriptionHtml || null,
                toolsRequired: formData.toolsRequired || null,
                heroImage: formData.heroImage || null
            };

            const isCreate = !courseDetail;
            const url = isCreate ? COURSE_DETAILS_API_URL : `${COURSE_DETAILS_API_URL}/${courseDetail.id}`;
            const method = isCreate ? 'POST' : 'PUT';

            if (isCreate && !payload.id) {
                setError('Please provide an ID for the new course detail');
                setSaving(false);
                return;
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            // Refresh the data
            await fetchCourseDetail();
            setIsEditing(false);
            alert(isCreate ? 'Course detail created successfully!' : 'Course detail updated successfully!');
        } catch (err) {
            console.error('Error saving course detail:', err);
            setError(err.message || 'Failed to save course detail. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // Delete course detail
    const deleteCourseDetail = async () => {
        if (!courseDetail || !window.confirm('Are you sure you want to delete this course detail?')) return;

        setSaving(true);
        setError('');

        try {
            const response = await fetch(`${COURSE_DETAILS_API_URL}/${courseDetail.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Reset to creation mode
            setCourseDetail(null);
            setFormData({
                id: '',
                courseId: courseId.toString(),
                shortDescription: '',
                fullDescriptionHtml: '',
                toolsRequired: '',
                heroImage: ''
            });
            setIsEditing(true);
            alert('Course detail deleted successfully!');
        } catch (err) {
            console.error('Error deleting course detail:', err);
            setError('Failed to delete course detail. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        if (isEditing) {
            // Cancel editing - reset form data
            if (courseDetail) {
                setFormData({
                    id: courseDetail.id.toString(),
                    courseId: courseDetail.courseId?.toString() || courseId.toString(),
                    shortDescription: courseDetail.shortDescription || '',
                    fullDescriptionHtml: courseDetail.fullDescriptionHtml || '',
                    toolsRequired: courseDetail.toolsRequired || '',
                    heroImage: courseDetail.heroImage || ''
                });
            }
        }
        setIsEditing(!isEditing);
    };

    // Handle modal close
    const handleClose = () => {
        setCourseDetail(null);
        setError('');
        setIsEditing(false);
        setFormData({
            id: '',
            courseId: courseId?.toString() || '',
            shortDescription: '',
            fullDescriptionHtml: '',
            toolsRequired: '',
            heroImage: ''
        });
        onClose();
    };

    useEffect(() => {
        if (isOpen && courseId) {
            fetchCourseDetail();
        }
    }, [isOpen, courseId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Course Details & Syllabus
                        </h2>
                        <p className="text-sm text-gray-600">Course ID: {courseId}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading course details...</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <div className="flex">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <div className="space-y-6">
                            {/* Status Info */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    {courseDetail ? (
                                        <>📝 Course detail exists (ID: {courseDetail.id}) - {isEditing ? 'Editing mode' : 'View mode'}</>
                                    ) : (
                                        <>➕ No course detail found - Ready to create new detail</>
                                    )}
                                </p>
                            </div>

                            {/* Form */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* ID Field - only show when creating */}
                                {!courseDetail && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Detail ID *
                                        </label>
                                        <input
                                            type="number"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            placeholder="Enter unique ID for this course detail"
                                        />
                                    </div>
                                )}

                                {/* Course ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course ID
                                    </label>
                                    <input
                                        type="number"
                                        name="courseId"
                                        value={formData.courseId}
                                        onChange={handleInputChange}
                                        disabled={true} // Always disabled since it's set by the parent
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>

                                {/* Hero Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hero Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="heroImage"
                                        value={formData.heroImage}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {formData.heroImage && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.heroImage}
                                                alt="Hero Preview"
                                                className="h-32 w-full object-cover rounded border"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden h-32 w-full items-center justify-center bg-gray-200 rounded border">
                                                <span className="text-gray-500">Failed to load image</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Short Description
                                    </label>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        placeholder="Brief overview of the course..."
                                    />
                                </div>

                                {/* Tools Required */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tools Required
                                    </label>
                                    <textarea
                                        name="toolsRequired"
                                        value={formData.toolsRequired}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        placeholder="List of tools, software, or materials needed..."
                                    />
                                </div>

                                {/* Full Description HTML */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Description / Syllabus (HTML)
                                    </label>
                                    <textarea
                                        name="fullDescriptionHtml"
                                        value={formData.fullDescriptionHtml}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={8}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 font-mono text-sm"
                                        placeholder="<h3>Course Syllabus</h3><p>Detailed course content...</p>"
                                    />
                                </div>

                                {/* Preview of Full Description */}
                                {formData.fullDescriptionHtml && !isEditing && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Syllabus Preview
                                        </label>
                                        <div
                                            className="prose prose-sm max-w-none p-4 border border-gray-300 rounded-md bg-gray-50"
                                            dangerouslySetInnerHTML={{ __html: formData.fullDescriptionHtml }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex space-x-3">
                        {courseDetail && (
                            <button
                                onClick={deleteCourseDetail}
                                disabled={saving}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                Delete Detail
                            </button>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Close
                        </button>

                        {isEditing ? (
                            <>
                                <button
                                    onClick={toggleEditMode}
                                    disabled={saving}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveCourseDetail}
                                    disabled={saving}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : (courseDetail ? 'Update' : 'Create')}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={toggleEditMode}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {courseDetail ? 'Edit' : 'Create New'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailModal;