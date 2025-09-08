import { Eye, Edit3, Trash2, HelpCircle, FileText, List } from 'lucide-react'; // add List for Sections

const CoursesTable = ({
                          courses,
                          onView,
                          onEdit,
                          onDelete,
                          onFaq,
                          onManageDetails,
                          onManageSections, // New prop for managing sections
                          getCategoryName,
                          formatDuration,
                          formatRating
                      }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Allow horizontal scrolling */}
            <div className="overflow-x-auto max-h-[70vh]">
                <table className="w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Videos
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {courses.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                                No courses found
                            </td>
                        </tr>
                    ) : (
                        courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {course.image && (
                                            <img
                                                className="h-10 w-10 rounded-lg object-cover mr-3"
                                                src={course.image}
                                                alt={course.title}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            {course.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{course.description}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getCategoryName(course.categoryId)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.instructor || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDuration(course.duration)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatRating(course.rating)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.videoCount || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${course.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {course.isActive !== false ? 'Active' : 'Inactive'}
                                </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => onView('view', course)} className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onEdit('edit', course)} className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-all duration-200" title="Edit Course">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(course.id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200" title="Delete Course">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onFaq(course)} className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200" title="Manage FAQs">
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onManageDetails(course)} className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200" title="Manage Course Details">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onManageSections(course)} className="text-orange-600 hover:text-orange-800 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200" title="Manage Course Sections">
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesTable;