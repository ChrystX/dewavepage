import React, { useState, useEffect } from 'react';
import {
    X,
    Save,
    Edit,
    Plus,
    Trash2,
    Video,
    Clock,
    ArrowUp,
    ArrowDown,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Image,
    FileText,
    Hash,
    Globe,
    Code,
    Eye,
    EyeOff,
    Play
} from 'lucide-react';

const CourseSectionModal = ({ isOpen, onClose, courseId }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedSection, setSelectedSection] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previewContent, setPreviewContent] = useState(null);
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

    const showMessage = (type, text) => {
        if (type === 'error') setError(text);
        if (type === 'success') setSuccess(text);
        setTimeout(() => {
            setError('');
            setSuccess('');
        }, 3000);
    };

    const resetForm = () => {
        setFormData({
            id: null,
            courseId: courseId || 0,
            title: '',
            contentHtml: '',
            videoUrl: '',
            thumbnailUrl: '',
            durationMinutes: '',
            sortOrder: sections.length + 1
        });
        setSelectedSection(null);
        setFormMode('create');
        setPreviewContent(null);
    };

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
            showMessage('error', 'Failed to fetch course sections');
        } finally {
            setLoading(false);
        }
    };

    const createSection = async () => {
        setSaving(true);
        try {
            const payload = {
                courseId: parseInt(courseId),
                title: formData.title,
                contentHtml: formData.contentHtml || null,
                videoUrl: formData.videoUrl || null,
                thumbnailUrl: formData.thumbnailUrl || null,
                durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : null,
                sortOrder: formData.sortOrder ? parseInt(formData.sortOrder) : sections.length + 1
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
            showMessage('success', 'Section created successfully');
        } catch (err) {
            console.error('Error creating section:', err);
            showMessage('error', 'Failed to create section');
        } finally {
            setSaving(false);
        }
    };

    const updateSection = async () => {
        setSaving(true);
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
            showMessage('success', 'Section updated successfully');
        } catch (err) {
            console.error('Error updating section:', err);
            showMessage('error', 'Failed to update section');
        } finally {
            setSaving(false);
        }
    };

    const deleteSection = async (id) => {
        if (!window.confirm('Are you sure you want to delete this section?')) return;

        setSaving(true);
        try {
            const res = await fetch(`${SECTIONS_API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete section');

            await fetchSections();
            showMessage('success', 'Section deleted successfully');
        } catch (err) {
            console.error('Error deleting section:', err);
            showMessage('error', 'Failed to delete section');
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            showMessage('error', 'Title is required');
            return;
        }

        if (formMode === 'create') {
            createSection();
        } else {
            updateSection();
        }
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const moveSection = (index, direction) => {
        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newSections.length) return;

        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        setSections(newSections);
    };

    useEffect(() => {
        if (isOpen && courseId) {
            fetchSections();
        }
    }, [isOpen, courseId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Course Sections Management</h2>
                            <p className="text-gray-600 mt-1">Course ID: {courseId} • {sections.length} section{sections.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Duration</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {formatDuration(sections.reduce((total, section) => total + (section.durationMinutes || 0), 0))}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {(error || success) && (
                    <div className="p-4 border-b border-gray-200">
                        {error && (
                            <div className="bg-red-50 text-red-700 border border-red-200 p-4 mb-2">
                                <div className="flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    {error}
                                </div>
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 text-green-700 border border-green-200 p-4 mb-2">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    {success}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
                    <div className="space-y-6">
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(true);
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Section</span>
                                </button>
                                <button
                                    onClick={fetchSections}
                                    disabled={loading}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                    <span>Refresh</span>
                                </button>
                            </div>

                            {showForm && (
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(false);
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Cancel Form
                                </button>
                            )}
                        </div>

                        {/* Form */}
                        {showForm && (
                            <div className="bg-white border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {formMode === 'create' ? 'Add New Section' : 'Edit Section'}
                                    </h3>
                                    {formData.contentHtml && (
                                        <button
                                            onClick={() => setPreviewContent(previewContent ? null : formData.contentHtml)}
                                            className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            {previewContent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            <span>{previewContent ? 'Hide Preview' : 'Show Preview'}</span>
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Title */}
                                        <div className="bg-white border border-gray-200 p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Section Title *
                                            </label>
                                            <div className="flex items-center">
                                                <FileText className="w-5 h-5 text-gray-400 mr-2" />
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g. Introduction to React"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Sort Order */}
                                        <div className="bg-gray-50 border border-gray-200 p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sort Order
                                            </label>
                                            <div className="flex items-center">
                                                <Hash className="w-5 h-5 text-gray-400 mr-2" />
                                                <input
                                                    type="number"
                                                    name="sortOrder"
                                                    value={formData.sortOrder}
                                                    onChange={handleInputChange}
                                                    className="w-32 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="1"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                                        </div>

                                        {/* Duration */}
                                        <div className="bg-white border border-gray-200 p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Duration (minutes)
                                            </label>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                                                <input
                                                    type="number"
                                                    name="durationMinutes"
                                                    value={formData.durationMinutes}
                                                    onChange={handleInputChange}
                                                    className="w-32 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="30"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Estimated viewing time</p>
                                        </div>

                                        {/* Video URL */}
                                        <div className="bg-white border border-gray-200 p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Video URL
                                            </label>
                                            <div className="flex items-center">
                                                <Video className="w-5 h-5 text-gray-400 mr-2" />
                                                <input
                                                    type="url"
                                                    name="videoUrl"
                                                    value={formData.videoUrl}
                                                    onChange={handleInputChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://example.com/video.mp4"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail URL */}
                                    <div className="bg-white border border-gray-200 p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Thumbnail URL
                                        </label>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Image className="w-5 h-5 text-gray-400 mr-2" />
                                                <input
                                                    type="url"
                                                    name="thumbnailUrl"
                                                    value={formData.thumbnailUrl}
                                                    onChange={handleInputChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://example.com/thumbnail.jpg"
                                                />
                                            </div>
                                            {formData.thumbnailUrl && (
                                                <div className="mt-2">
                                                    <img
                                                        src={formData.thumbnailUrl}
                                                        alt="Thumbnail Preview"
                                                        className="h-20 w-32 object-cover border"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div className="hidden h-20 w-32 items-center justify-center bg-gray-200 border">
                                                        <span className="text-xs text-gray-500">Failed to load</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content HTML */}
                                    <div className="bg-white border border-gray-200 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Section Content (HTML)
                                            </label>
                                            <Code className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="contentHtml"
                                            value={formData.contentHtml}
                                            onChange={handleInputChange}
                                            rows="6"
                                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                            placeholder="<p>Section content...</p>
<h4>Learning Objectives:</h4>
<ul>
<li>Objective 1</li>
<li>Objective 2</li>
</ul>"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">HTML content for section description and objectives</p>
                                    </div>

                                    {/* Content Preview */}
                                    {previewContent && (
                                        <div className="bg-white border border-gray-200 p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Content Preview
                                            </label>
                                            <div className="border border-gray-300 bg-gray-50">
                                                <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
                                                    <span className="text-xs text-gray-600">Preview Mode</span>
                                                </div>
                                                <div
                                                    className="prose prose-sm max-w-none p-4"
                                                    dangerouslySetInnerHTML={{ __html: previewContent }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Actions */}
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setShowForm(false);
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>{saving ? 'Saving...' : (formMode === 'create' ? 'Create Section' : 'Update Section')}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Sections List */}
                        <div className="bg-white border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Course Sections</h3>
                                <span className="text-sm text-gray-500">
                                    {sections.length} section{sections.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                    <span className="ml-3 text-gray-600">Loading sections...</span>
                                </div>
                            ) : sections.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm">No sections found for this course</p>
                                    <button
                                        onClick={() => {
                                            resetForm();
                                            setShowForm(true);
                                        }}
                                        className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Create your first section
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {sections.map((section, index) => (
                                        <div
                                            key={section.id}
                                            className="border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                                        >
                                            <div className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-start space-x-3">
                                                            <div className="flex flex-col items-center space-y-2">
                                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                                    #{section.sortOrder || 0}
                                                                </span>
                                                                <div className="flex flex-col space-y-1">
                                                                    <button
                                                                        onClick={() => moveSection(index, 'up')}
                                                                        disabled={index === 0}
                                                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                                                    >
                                                                        <ArrowUp className="w-3 h-3" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => moveSection(index, 'down')}
                                                                        disabled={index === sections.length - 1}
                                                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                                                    >
                                                                        <ArrowDown className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <h4 className="font-medium text-gray-900">{section.title}</h4>
                                                                    {section.durationMinutes && (
                                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                                            <Clock className="w-3 h-3 mr-1" />
                                                                            {formatDuration(section.durationMinutes)}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                    {section.videoUrl && (
                                                                        <a
                                                                            href={section.videoUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                                                                        >
                                                                            <Play className="w-3 h-3" />
                                                                            <span>Video</span>
                                                                        </a>
                                                                    )}

                                                                    {section.thumbnailUrl && (
                                                                        <div className="flex items-center space-x-1">
                                                                            <Image className="w-3 h-3" />
                                                                            <span>Thumbnail</span>
                                                                        </div>
                                                                    )}

                                                                    {section.contentHtml && (
                                                                        <div className="flex items-center space-x-1">
                                                                            <Code className="w-3 h-3" />
                                                                            <span>Content</span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {section.thumbnailUrl && (
                                                                    <div className="mt-2">
                                                                        <img
                                                                            src={section.thumbnailUrl}
                                                                            alt="Section thumbnail"
                                                                            className="h-16 w-24 object-cover border"
                                                                            onError={(e) => {
                                                                                e.target.style.display = 'none';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            onClick={() => handleEdit(section)}
                                                            className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 transition-colors duration-200"
                                                            title="Edit Section"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteSection(section.id)}
                                                            disabled={saving}
                                                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                                                            title="Delete Section"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Guidelines */}
                        <div className="bg-blue-50 border border-blue-200 p-4">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900 mb-2">Section Guidelines</h4>
                                    <ul className="text-xs text-blue-800 space-y-1">
                                        <li>• Use clear, descriptive titles for each section</li>
                                        <li>• Set appropriate durations to help students plan their time</li>
                                        <li>• Include video content when possible for better engagement</li>
                                        <li>• Use sort order to structure the learning progression</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            {sections.length} section{sections.length !== 1 ? 's' : ''} • Total duration: {formatDuration(sections.reduce((total, section) => total + (section.durationMinutes || 0), 0))}
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSectionModal;