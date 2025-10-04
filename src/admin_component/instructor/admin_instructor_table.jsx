import React from 'react';
import { Eye, Edit3, Trash2, User, Mail, Phone, Award, Plus } from 'lucide-react';

const InstructorTable = ({
                             instructors = [],
                             onView,
                             onEdit,
                             onDelete,
                             onAdd
                         }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Instructors ({instructors.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {instructors.length} total instructors
                    </div>
                </div>
            </div>

            {instructors.length === 0 ? (
                <div className="p-12 text-center">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        No instructors available
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Add your first instructor to get started.
                    </p>
                    {onAdd && (
                        <button
                            onClick={() => onAdd()}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add First Instructor</span>
                        </button>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {instructors.map((instructor) => (
                            <tr key={instructor.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-mono text-gray-600">#{instructor.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        {instructor.imageUrl ? (
                                            <img
                                                src={instructor.imageUrl}
                                                alt={instructor.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                                            {instructor.bio && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {instructor.bio.replace(/<[^>]*>/g, '').substring(0, 50)}...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {instructor.contactEmail && (
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{instructor.contactEmail}</span>
                                            </div>
                                        )}
                                        {instructor.phoneNumber && (
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{instructor.phoneNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {instructor.certifications ? (
                                        <div className="flex items-center space-x-2">
                                            <Award className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm text-gray-900 truncate max-w-xs">
                                                    {instructor.certifications.replace(/<[^>]*>/g, '').substring(0, 30)}...
                                                </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">No certifications</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(instructor)}
                                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit('edit', instructor)}
                                            className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                            title="Edit Instructor"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(instructor.id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                            title="Delete Instructor"
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
    );
};

export default InstructorTable;