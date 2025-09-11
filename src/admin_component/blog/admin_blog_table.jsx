import React from 'react';
import { Eye, Edit3, Trash2, BookOpen, User, Calendar, Plus, PenTool} from 'lucide-react';

const BlogTable = ({
                       blogs = [],
                       onView,
                       onEdit,
                       onDelete,
                       onOpenEditor,
                       onAdd,
                       formatDate,
                       getStatusBadge
                   }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Blogs ({blogs.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {blogs.length} total blogs
                    </div>
                </div>
            </div>

            {blogs.length === 0 ? (
                <div className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        No blogs available
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Create your first blog to get started.
                    </p>
                    {onAdd && (
                        <button
                            onClick={() => onAdd()}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add First Blog</span>
                        </button>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Published</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-mono text-gray-600">#{blog.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                            <div className="text-sm text-gray-500">{blog.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(blog.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">
                                            {blog.authorId ? `Author #${blog.authorId}` : 'No author'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{formatDate(blog.publishedAt)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(blog)} // FIXED: Only pass blog object
                                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit('edit', blog)}
                                            className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                            title="Edit Blog"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(blog.id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                            title="Delete Blog"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onOpenEditor(blog)}
                                            className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                                            title="Open Content Editor"
                                        >
                                            <PenTool className="w-4 h-4" />
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

export default BlogTable;