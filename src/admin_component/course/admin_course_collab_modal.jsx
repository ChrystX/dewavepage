import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Users, Search, Save, AlertCircle } from 'lucide-react';

const ManageCollaboratorsModal = ({ isOpen, onClose, course }) => {
    const [assignedInstructors, setAssignedInstructors] = useState([]);
    const [allInstructors, setAllInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('Instructor');
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_BASE = "https://dewavefreeapi20250731173800.azurewebsites.net/api";

    useEffect(() => {
        if (isOpen && course) {
            fetchData();
        }
    }, [isOpen, course]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [instructorsRes, assignedRes] = await Promise.all([
                fetch(`${API_BASE}/Instructors`),
                fetch(`${API_BASE}/CourseInstructors/course/${course.id}`)
            ]);

            if (instructorsRes.ok) {
                const instructors = await instructorsRes.json();
                setAllInstructors(instructors);
            }

            if (assignedRes.ok) {
                const assigned = await assignedRes.json();
                setAssignedInstructors(assigned);
            } else {
                setAssignedInstructors([]);
            }
        } catch (error) {
            showMessage('error', 'Failed to load instructors');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const addInstructor = async (instructor) => {
        setSaving(true);
        try {
            const payload = {
                courseId: course.id,
                instructorId: instructor.id,
                role: selectedRole,
                sortOrder: assignedInstructors.length
            };

            const response = await fetch(`${API_BASE}/CourseInstructors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                await fetchData();
                showMessage('success', `${instructor.name} added successfully`);
                setSearchTerm('');
            } else {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                try {
                    const errorJson = JSON.parse(errorText);
                    showMessage('error', errorJson.title || 'Failed to add instructor');
                } catch {
                    showMessage('error', 'Failed to add instructor');
                }
            }
        } catch (error) {
            console.error('Add instructor error:', error);
            showMessage('error', 'Failed to add instructor');
        } finally {
            setSaving(false);
        }
    };

    const removeInstructor = async (instructorId) => {
        if (!confirm('Remove this instructor from the course?')) return;

        setSaving(true);
        try {
            const response = await fetch(
                `${API_BASE}/CourseInstructors/course/${course.id}/instructor/${instructorId}`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                await fetchData();
                showMessage('success', 'Instructor removed successfully');
            } else {
                showMessage('error', 'Failed to remove instructor');
            }
        } catch (error) {
            showMessage('error', 'Failed to remove instructor');
        } finally {
            setSaving(false);
        }
    };

    const availableInstructors = allInstructors.filter(
        instructor =>
            !assignedInstructors.some(a => a.instructorId === instructor.id) &&
            instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Manage Collaborators</h2>
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

                {/* Message Alert */}
                {message.text && (
                    <div className={`mx-6 mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                        message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{message.text}</span>
                    </div>
                )}

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-gray-400 animate-pulse">Loading instructors...</div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Assigned Instructors */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Assigned Instructors ({assignedInstructors.length})
                                </h3>

                                {assignedInstructors.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">No instructors assigned yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {assignedInstructors.map((item) => (
                                            <div key={item.instructorId}
                                                 className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                                                        {item.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            {item.role && (
                                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                                    {item.role}
                                                                </span>
                                                            )}
                                                            {item.contactEmail && (
                                                                <span className="text-xs text-gray-500">{item.contactEmail}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeInstructor(item.instructorId)}
                                                    disabled={saving}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Remove instructor"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Add New Instructor */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Instructor</h3>

                                {/* Role Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Lead Instructor">Lead Instructor</option>
                                        <option value="Co-Instructor">Co-Instructor</option>
                                        <option value="Teaching Assistant">Teaching Assistant</option>
                                        <option value="Guest Lecturer">Guest Lecturer</option>
                                        <option value="Instructor">Instructor</option>
                                    </select>
                                </div>

                                {/* Search */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search instructors..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Available Instructors */}
                                {searchTerm && (
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {availableInstructors.length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">
                                                No instructors found
                                            </div>
                                        ) : (
                                            availableInstructors.map((instructor) => (
                                                <button
                                                    key={instructor.id}
                                                    onClick={() => addInstructor(instructor)}
                                                    disabled={saving}
                                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {instructor.name?.charAt(0) || '?'}
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="font-medium text-gray-900">{instructor.name}</div>
                                                            {instructor.contactEmail && (
                                                                <div className="text-xs text-gray-500">{instructor.contactEmail}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Plus className="w-5 h-5 text-blue-600" />
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageCollaboratorsModal;