import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Search, RefreshCw, Save, X, Eye, Filter } from 'lucide-react';

const AdminCategoryDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalMode, setModalMode] = useState('view'); // 'create', 'edit', 'view'
    const [formData, setFormData] = useState({ name: '', description: '' });

    const API_BASE_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/categories';

    // Fetch courses from API
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCourses(data);
            setFilteredCourses(data);
            setMessage({ type: 'success', text: `Loaded ${data.length} courses successfully` });
        } catch (error) {
            console.error('Error fetching courses:', error);
            setMessage({ type: 'error', text: 'Failed to load courses. Please check your connection.' });
            setCourses([]);
            setFilteredCourses([]);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(prev => prev.type === 'success' ? { type: '', text: '' } : prev), 3000);
        }
    };

    // Create new course
    const createCourse = async (courseData) => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newCourse = await response.json();
            setCourses(prev => [...prev, newCourse]);
            setMessage({ type: 'success', text: 'Course created successfully' });
            return true;
        } catch (error) {
            console.error('Error creating course:', error);
            setMessage({ type: 'error', text: 'Failed to create course. Please try again.' });
            return false;
        }
    };

    // Update course
    const updateCourse = async (id, courseData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setCourses(prev =>
                prev.map(course =>
                    course.id === id ? { ...course, ...courseData } : course
                )
            );
            setMessage({ type: 'success', text: 'Course updated successfully' });
            return true;
        } catch (error) {
            console.error('Error updating course:', error);
            setMessage({ type: 'error', text: 'Failed to update course. Please try again.' });
            return false;
        }
    };

    // Delete course
    const deleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setCourses(prev => prev.filter(course => course.id !== id));
                setMessage({ type: 'success', text: 'Course deleted successfully' });
                setSelectedCourse(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error deleting course:', error);
                setMessage({ type: 'error', text: 'Failed to delete course. Please try again.' });
            }
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        let filtered = courses;

        if (searchTerm) {
            filtered = filtered.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredCourses(filtered);
    }, [courses, searchTerm]);

    const openModal = (mode, course = null) => {
        setModalMode(mode);
        setSelectedCourse(course);
        setFormData(course ? { name: course.name, description: course.description || '' } : { name: '', description: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Course name is required' });
            return;
        }

        let success = false;
        if (modalMode === 'create') {
            success = await createCourse(formData);
        } else if (modalMode === 'edit') {
            success = await updateCourse(selectedCourse.id, formData);
        }

        if (success) {
            closeModal();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const refreshData = async () => {
        await fetchCourses();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-slate-600 to-blue-600 p-3 rounded-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                                <p className="text-gray-600">Manage available courses and categories</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={refreshData}
                                disabled={loading}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={() => openModal('create')}
                                className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Course</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                            </div>
                            <BookOpen className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">With Descriptions</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {courses.filter(course => course.description && course.description.trim()).length}
                                </p>
                            </div>
                            <Eye className="w-8 h-8 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                                <p className="text-2xl font-bold text-purple-600">{filteredCourses.length}</p>
                            </div>
                            <Filter className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                            message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' :
                                'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Search */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="max-w-md">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Search className="w-4 h-4 inline mr-1" />
                            Search Courses
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search by course name or description..."
                        />
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                Courses ({filteredCourses.length})
                            </h2>
                            <div className="text-sm text-gray-500">
                                {searchTerm ?
                                    `Showing ${filteredCourses.length} of ${courses.length} courses` :
                                    `${courses.length} total courses`
                                }
                            </div>
                        </div>
                    </div>

                    {filteredCourses.length === 0 ? (
                        <div className="p-12 text-center">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-500 mb-2">
                                {courses.length === 0 ? 'No courses available' : 'No courses match your search'}
                            </h3>
                            <p className="text-gray-400 mb-4">
                                {courses.length === 0 ?
                                    'Create your first course to get started.' :
                                    'Try adjusting your search criteria.'
                                }
                            </p>
                            {courses.length === 0 && (
                                <button
                                    onClick={() => openModal('create')}
                                    className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add First Course</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-gray-600">#{course.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-100 p-2 rounded-lg">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {course.description ? (
                                                    <span className="line-clamp-2">
                              {course.description.length > 100
                                  ? `${course.description.substring(0, 100)}...`
                                  : course.description}
                            </span>
                                                ) : (
                                                    <span className="text-gray-400 italic">No description</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => openModal('view', course)}
                                                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openModal('edit', course)}
                                                    className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                                    title="Edit Course"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteCourse(course.id)}
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-600 to-blue-600">
                                <div className="flex items-center justify-between">
                                    <div className="text-white">
                                        <h2 className="text-xl font-bold">
                                            {modalMode === 'create' ? 'Create New Course' :
                                                modalMode === 'edit' ? `Edit Course #${selectedCourse?.id}` :
                                                    `Course Details #${selectedCourse?.id}`}
                                        </h2>
                                        <p className="text-blue-100">
                                            {modalMode === 'create' ? 'Add a new course to the system' :
                                                modalMode === 'edit' ? 'Modify course information' :
                                                    'View course information'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-white hover:text-gray-200 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {modalMode === 'view' ? (
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-500 mb-2">Course Name</label>
                                            <p className="text-lg font-semibold text-gray-900">{selectedCourse?.name}</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                                            <p className="text-gray-900">
                                                {selectedCourse?.description || (
                                                    <span className="text-gray-400 italic">No description provided</span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => openModal('edit', selectedCourse)}
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                <span>Edit Course</span>
                                            </button>
                                            <button
                                                onClick={() => deleteCourse(selectedCourse.id)}
                                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete Course</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Course Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter course name..."
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                placeholder="Enter course description (optional)..."
                                            />
                                        </div>

                                        <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{modalMode === 'create' ? 'Create Course' : 'Update Course'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategoryDashboard;