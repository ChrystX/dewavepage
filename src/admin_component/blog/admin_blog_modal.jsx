import React, {useEffect} from 'react';
import { X, Save, Edit3, Trash2 } from 'lucide-react';

const BlogModal = ({
                       isOpen,
                       mode, // 'create', 'edit', 'view'
                       blog,
                       formData,
                       setFormData,
                       onSubmit,
                       onClose,
                       onEdit,
                       onDelete,
                       formatDate,
                       getStatusBadge
                   }) => {
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    useEffect(() => {
        if (mode !== 'view' && formData.title) {
            const newSlug = generateSlug(formData.title);
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    }, [formData.title, mode, setFormData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-600 to-blue-600">
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <h2 className="text-xl font-bold">
                                {mode === 'create' ? 'Create New Blog' :
                                    mode === 'edit' ? `Edit Blog #${blog?.id}` :
                                        `Blog Details #${blog?.id}`}
                            </h2>
                            <p className="text-blue-100">
                                {mode === 'create' ? 'Add a new blog post to the system' :
                                    mode === 'edit' ? 'Modify blog post information' :
                                        'View blog post information'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {mode === 'view' ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Blog Title</label>
                                    <p className="text-lg font-semibold text-gray-900">{blog?.title}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Slug</label>
                                    <p className="text-gray-900 font-mono">{blog?.slug}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                                    {getStatusBadge(blog?.status)}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Author ID</label>
                                    <p className="text-gray-900">{blog?.authorId || 'Not assigned'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Category ID</label>
                                    <p className="text-gray-900">{blog?.categoryId || 'Not assigned'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Published Date</label>
                                    <p className="text-gray-900">{formatDate(blog?.publishedAt)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-500 mb-2">Summary</label>
                                <p className="text-gray-900">
                                    {blog?.summary || (
                                        <span className="text-gray-400 italic">No summary provided</span>
                                    )}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-500 mb-2">Thumbnail URL</label>
                                <p className="text-gray-900 break-all">
                                    {blog?.thumbnailUrl || (
                                        <span className="text-gray-400 italic">No thumbnail set</span>
                                    )}
                                </p>
                            </div>

                            <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => onEdit(blog)}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Edit Blog</span>
                                </button>
                                <button
                                    onClick={() => onDelete(blog.id)}
                                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Blog</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blog Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter blog title..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug (Auto-generated) *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug || ''}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 font-mono cursor-not-allowed"
                                        placeholder="Slug will be auto-generated..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Generated automatically from the title
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author ID
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.authorId}
                                        onChange={(e) => setFormData(prev => ({ ...prev, authorId: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter author ID (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category ID
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter category ID (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Published Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.publishedAt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Summary
                                </label>
                                <textarea
                                    value={formData.summary}
                                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Enter blog summary (optional)..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thumbnail URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.thumbnailUrl}
                                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{mode === 'create' ? 'Create Blog' : 'Update Blog'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
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
    );
};

export default BlogModal;