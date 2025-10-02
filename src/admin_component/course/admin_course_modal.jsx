import { X, ToggleRight, ToggleLeft } from 'lucide-react';

const CourseModal = ({ isOpen, onClose, mode, formData, setFormData, onSubmit, categories }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-600 to-blue-600 flex items-center justify-between">
                    <div className="text-white">
                        <h2 className="text-xl font-bold">
                            {mode === 'create' ? 'Add Course' : mode === 'edit' ? 'Edit Course' : 'View Course'}
                        </h2>
                        <p className="text-blue-100">
                            {mode === 'create' ? 'Add a new course to the system' :
                                mode === 'edit' ? 'Modify course information' : 'View course details'}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    {/* Title & Instructor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="Enter course title..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Name</label>
                            <input
                                type="text"
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="Enter instructor name..."
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={mode === 'view'}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            placeholder="Enter course description..."
                        />
                    </div>

                    {/* IDs & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instructor ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="instructorId"
                                value={formData.instructorId}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="Enter instructor ID..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="">Select category...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => mode !== 'view' && setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                                    disabled={mode === 'view'}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                                        formData.isActive
                                            ? 'bg-green-50 border-green-200 text-green-700'
                                            : 'bg-red-50 border-red-200 text-red-700'
                                    } ${mode === 'view' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                >
                                    {formData.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                    <span>{formData.isActive ? 'Active' : 'Inactive'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Duration, Video Count, Rating */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="e.g., 120"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Video Count</label>
                            <input
                                type="number"
                                name="videoCount"
                                value={formData.videoCount}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="e.g., 25"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                disabled={mode === 'view'}
                                min="0"
                                max="5"
                                step="0.1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="e.g., 4.5"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            disabled={mode === 'view'}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.image && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <img
                                    src={formData.image}
                                    alt="Course preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Created At - Read Only for View/Edit */}
                    {mode !== 'create' && formData.createdAt && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
                            <input
                                type="text"
                                value={new Date(formData.createdAt).toLocaleString()}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                            />
                        </div>
                    )}
                </div>

                {/* Modal Actions */}
                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        {mode === 'view' ? 'Close' : 'Cancel'}
                    </button>
                    {mode !== 'view' && (
                        <button
                            onClick={onSubmit}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            {mode === 'create' ? 'Create Course' : 'Save Changes'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseModal;