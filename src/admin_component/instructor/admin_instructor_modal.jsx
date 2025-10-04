import React from 'react';
import { X, Save, Edit3, Trash2, User, Mail, Phone, Image, Award } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const InstructorModal = ({
                             isOpen,
                             mode,
                             instructor,
                             formData,
                             setFormData,
                             onSubmit,
                             onClose,
                             onEdit,
                             onDelete
                         }) => {
    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-600 to-blue-600">
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <h2 className="text-xl font-bold">
                                {mode === 'create' ? 'Create New Instructor' :
                                    mode === 'edit' ? `Edit Instructor #${instructor?.id}` :
                                        `Instructor Details #${instructor?.id}`}
                            </h2>
                            <p className="text-blue-100">
                                {mode === 'create' ? 'Add a new instructor to the system' :
                                    mode === 'edit' ? 'Modify instructor information' :
                                        'View instructor information'}
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
                            <div className="flex items-center justify-center mb-6">
                                {instructor?.imageUrl ? (
                                    <img
                                        src={instructor.imageUrl}
                                        alt={instructor.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-16 h-16 text-blue-600" />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                                    <p className="text-lg font-semibold text-gray-900">{instructor?.name}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Contact Email</label>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <p className="text-gray-900">{instructor?.contactEmail || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <p className="text-gray-900">{instructor?.phoneNumber || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Image URL</label>
                                    <div className="flex items-center space-x-2">
                                        <Image className="w-4 h-4 text-gray-400" />
                                        <p className="text-gray-900 truncate">{instructor?.imageUrl || 'No image'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-500 mb-2">Bio</label>
                                {instructor?.bio ? (
                                    <div
                                        className="prose max-w-none text-gray-900"
                                        dangerouslySetInnerHTML={{ __html: instructor.bio }}
                                    />
                                ) : (
                                    <span className="text-gray-400 italic">No bio provided</span>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-500 mb-2">Certifications</label>
                                {instructor?.certifications ? (
                                    <div
                                        className="prose max-w-none text-gray-900"
                                        dangerouslySetInnerHTML={{ __html: instructor.certifications }}
                                    />
                                ) : (
                                    <span className="text-gray-400 italic">No certifications listed</span>
                                )}
                            </div>

                            <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => onEdit(instructor)}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Edit Instructor</span>
                                </button>
                                <button
                                    onClick={() => onDelete(instructor.id)}
                                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Instructor</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter instructor name..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => handleChange('contactEmail', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="instructor@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1234567890"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <div className="border border-gray-300 rounded-lg">
                                    <Editor
                                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                        value={formData.bio || ''}
                                        onEditorChange={(content) => handleChange('bio', content)}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                                'anchor', 'searchreplace', 'visualblocks', 'code',
                                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | bold italic underline | ' +
                                                'alignleft aligncenter alignright | bullist numlist | ' +
                                                'link image | removeformat | help',
                                            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px }'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Certifications
                                </label>
                                <div className="border border-gray-300 rounded-lg">
                                    <Editor
                                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                        value={formData.certifications || ''}
                                        onEditorChange={(content) => handleChange('certifications', content)}
                                        init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'charmap',
                                                'searchreplace', 'visualblocks', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | bold italic | ' +
                                                'bullist numlist | link | removeformat | help',
                                            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px }'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{mode === 'create' ? 'Create Instructor' : 'Update Instructor'}</span>
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

export default InstructorModal;