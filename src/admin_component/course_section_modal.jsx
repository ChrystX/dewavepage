import { useState, useEffect } from 'react';

const CourseSectionModal = ({
                                isOpen,
                                onClose,
                                courseId
                            }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
    const [selectedSection, setSelectedSection] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        courseId: courseId || 0,
        title: '',
        contentHtml: '',
        videoUrl: '',
        thumbnailUrl: '',
        durationMinutes: '',
        sortOrder: ''
    });

    const SECTIONS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/CourseSections';

    // Reset form data
    const resetForm = () => {
        setFormData({
            id: null,
            courseId: courseId || 0,
            title: '',
            contentHtml: '',
            videoUrl: '',
            thumbnailUrl: '',
            durationMinutes: '',
            sortOrder: ''
        });
        setSelectedSection(null);
        setFormMode('create');
    };

    // Fetch sections for the course
    const fetchSections = async () => {
        if (!courseId) return;

        setLoading(true);
        try {
            const res = await fetch(SECTIONS_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const allSections = await res.json();
            const courseSections = allSections.filter(section => section.courseId === courseId);
            setSections(courseSections.sort((a, b) => a.sortOrder - b.sortOrder));
        } catch (err) {
            console.error('Error fetching sections:', err);
            alert('Failed to fetch course sections');
        } finally {
            setLoading(false);
        }
    };

    // Create section
    const createSection = async () => {
        try {
            const payload = {
                courseId: parseInt(courseId),
                title: formData.title,
                contentHtml: formData.contentHtml || null,
                videoUrl: formData.videoUrl || null,
                thumbnailUrl: formData.thumbnailUrl || null,
                durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : null,
                sortOrder: formData.sortOrder ? parseInt(formData.sortOrder) : 0
            };

            const res = await fetch(SECTIONS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create section');

            await fetchSections();
            resetForm();
            setShowForm(false);
            alert('Section created successfully');
        } catch (err) {
            console.error('Error creating section:', err);
            alert('Failed to create section');
        }
    };

    // Update section
    const updateSection = async () => {
        try {
            const payload = {
                courseId: parseInt(courseId),
                title: formData.title,
                contentHtml: formData.contentHtml || null,
                videoUrl: formData.videoUrl || null,
                thumbnailUrl: formData.thumbnailUrl || null,
                durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : null,
                sortOrder: formData.sortOrder ? parseInt(formData.sortOrder) : 0
            };

            const res = await fetch(`${SECTIONS_API_URL}/${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to update section');

            await fetchSections();
            resetForm();
            setShowForm(false);
            alert('Section updated successfully');
        } catch (err) {
            console.error('Error updating section:', err);
            alert('Failed to update section');
        }
    };

    // Delete section
    const deleteSection = async (id) => {
        if (!window.confirm('Are you sure you want to delete this section?')) return;

        try {
            const res = await fetch(`${SECTIONS_API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete section');

            await fetchSections();
            alert('Section deleted successfully');
        } catch (err) {
            console.error('Error deleting section:', err);
            alert('Failed to delete section');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            alert('Title is required');
            return;
        }

        if (formMode === 'create') {
            createSection();
        } else {
            updateSection();
        }
    };

    // Handle edit
    const handleEdit = (section) => {
        setFormData({
            id: section.id,
            courseId: section.courseId,
            title: section.title,
            contentHtml: section.contentHtml || '',
            videoUrl: section.videoUrl || '',
            thumbnailUrl: section.thumbnailUrl || '',
            durationMinutes: section.durationMinutes?.toString() || '',
            sortOrder: section.sortOrder?.toString() || ''
        });
        setSelectedSection(section);
        setFormMode('edit');
        setShowForm(true);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Format duration
    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Fetch sections when modal opens and courseId changes
    useEffect(() => {
        if (isOpen && courseId) {
            fetchSections();
        }
    }, [isOpen, courseId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Course Sections Management
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {/* Action Buttons */}
                    <div className="mb-6 flex gap-3">
                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Section
                        </button>
                        <button
                            onClick={fetchSections}
                            disabled={loading}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-medium mb-4">
                                {formMode === 'create' ? 'Add New Section' : 'Edit Section'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sort Order
                                        </label>
                                        <input
                                            type="number"
                                            name="sortOrder"
                                            value={formData.sortOrder}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Duration (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            name="durationMinutes"
                                            value={formData.durationMinutes}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Video URL
                                        </label>
                                        <input
                                            type="url"
                                            name="videoUrl"
                                            value={formData.videoUrl}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Thumbnail URL
                                    </label>
                                    <input
                                        type="url"
                                        name="thumbnailUrl"
                                        value={formData.thumbnailUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content HTML
                                    </label>
                                    <textarea
                                        name="contentHtml"
                                        value={formData.contentHtml}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                    >
                                        {formMode === 'create' ? 'Create Section' : 'Update Section'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            setShowForm(false);
                                        }}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Sections Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Video
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thumbnail
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {sections.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No sections found for this course
                                        </td>
                                    </tr>
                                ) : (
                                    sections.map((section) => (
                                        <tr key={section.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {section.sortOrder}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {section.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDuration(section.durationMinutes)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {section.videoUrl ? (
                                                    <a
                                                        href={section.videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">None</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {section.thumbnailUrl ? (
                                                    <img
                                                        src={section.thumbnailUrl}
                                                        alt="Thumbnail"
                                                        className="h-8 w-8 object-cover rounded"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'block';
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">None</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(section)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSection(section.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSectionModal;