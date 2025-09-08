import React from "react";
import { Dialog } from "@headlessui/react";
import { X, FileText, Search, Tags, Code } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const BlogDetailModal = ({ isOpen, onClose, formData, setFormData, onSubmit }) => {
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <Dialog.Title className="text-xl font-semibold text-gray-900">
                                    Blog Content Editor
                                </Dialog.Title>
                                <p className="text-sm text-gray-500">Create and manage your blog content</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content - Two Column Layout */}
                    <div className="flex flex-col lg:flex-row h-[calc(90vh-200px)]">
                        {/* Main Content Area - Left Column */}
                        <div className="flex-1 p-6 overflow-y-auto bg-white">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="w-4 h-4 text-gray-600" />
                                    <h3 className="text-lg font-medium text-gray-900">Content</h3>
                                </div>
                                <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
                                    <Editor
                                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                        value={formData.content || ""}
                                        onEditorChange={(val) => handleChange("content", val)}
                                        init={{
                                            height: 400,
                                            menubar: true,
                                            plugins: [
                                                "advlist autolink lists link image charmap print preview anchor",
                                                "searchreplace visualblocks code fullscreen",
                                                "insertdatetime media table code help wordcount"
                                            ],
                                            toolbar:
                                                "undo redo | formatselect | bold italic underline strikethrough | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Advanced Settings */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code className="w-4 h-4 text-gray-600" />
                                    <h3 className="text-lg font-medium text-gray-900">Advanced Settings</h3>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <label className="block text-sm font-medium mb-2 text-gray-700">
                                        Extra JSON Configuration
                                    </label>
                                    <textarea
                                        value={formData.extraJson || ""}
                                        onChange={(e) => handleChange("extraJson", e.target.value)}
                                        rows={4}
                                        placeholder='{"customField": "value", "additionalData": {}}'
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Add custom JSON data for advanced configurations
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="w-full lg:w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
                            {/* SEO Section */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <Search className="w-4 h-4 text-green-600" />
                                    <h3 className="text-lg font-medium text-gray-900">SEO Optimization</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
                                            SEO Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.seoTitle || ""}
                                            onChange={(e) => handleChange("seoTitle", e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                            placeholder="SEO optimized title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={formData.seoDescription || ""}
                                            onChange={(e) => handleChange("seoDescription", e.target.value)}
                                            placeholder="Brief description for search engines (150-160 characters)"
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-sm"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {(formData.seoDescription || "").length}/160 characters
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
                                            Keywords
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.seoKeywords || ""}
                                            onChange={(e) => handleChange("seoKeywords", e.target.value)}
                                            placeholder="keyword1, keyword2, keyword3"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Separate keywords with commas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tags className="w-4 h-4 text-purple-600" />
                                    <h3 className="text-lg font-medium text-gray-900">Tags & Categories</h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">
                                        Blog Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags || ""}
                                        onChange={(e) => handleChange("tags", e.target.value)}
                                        placeholder="technology, web-development, tutorial"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Add tags to help categorize your content
                                    </p>
                                    {formData.tags && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {formData.tags.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-white">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Make sure to fill in the content and SEO information for better visibility
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmit}
                                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                >
                                    Save Content
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default BlogDetailModal;