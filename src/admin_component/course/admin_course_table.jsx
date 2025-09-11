import React from 'react';
import { Eye, Edit3, Trash2, HelpCircle, FileText, List, BookOpen, User, Clock, Star, Play, Plus } from 'lucide-react';

const CoursesTable = ({
                          courses,
                          onView,
                          onEdit,
                          onDelete,
                          onFaq,
                          onManageDetails,
                          onManageSections,
                          onAdd,
                          getCategoryName,
                          formatDuration,
                          formatRating
                      }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Courses ({courses.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {courses.length} total courses
                    </div>
                </div>
            </div>

            {courses.length === 0 ? (
                <div className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        No courses available
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Create your first course to get started.
                    </p>
                    {onAdd && (
                        <button
                            onClick={() => onAdd()}
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
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Videos</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            {course.image ? (
                                                <img
                                                    className="w-5 h-5 rounded object-cover"
                                                    src={course.image}
                                                    alt={course.title}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : (
                                                <BookOpen className="w-5 h-5 text-blue-600" />
                                            )}
                                            <BookOpen className="w-5 h-5 text-blue-600" style={{display: course.image ? 'none' : 'block'}} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            {course.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{course.description}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-900">{getCategoryName(course.categoryId)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{course.instructor || 'No instructor'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{formatDuration(course.duration)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{formatRating(course.rating)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Play className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{course.videoCount || 0}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        course.isActive !== false
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {course.isActive !== false ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(course)}
                                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit('edit', course)}
                                            className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                            title="Edit Course"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(course.id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                            title="Delete Course"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onFaq(course)}
                                            className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-all duration-200"
                                            title="Manage FAQs"
                                        >
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onManageDetails(course)}
                                            className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                                            title="Manage Course Details"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onManageSections(course)}
                                            className="text-orange-600 hover:text-orange-800 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
                                            title="Manage Course Sections"
                                        >
                                            <List className="w-4 h-4" />
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

export default CoursesTable;