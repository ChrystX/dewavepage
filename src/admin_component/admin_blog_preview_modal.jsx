import React from "react";
import { Dialog } from "@headlessui/react";
import { X, Eye, Calendar, User, Tag, Clock } from "lucide-react";

const BlogPreviewModal = ({ isOpen, onClose, formData, blogData }) => {
    if (!isOpen) return null;

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper function to parse tags
    const parseTags = (tagsString) => {
        if (!tagsString) return [];
        return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    };

    // Estimate reading time based on content
    const estimateReadingTime = (content) => {
        if (!content) return 1;
        const wordsPerMinute = 200;
        const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
        const wordCount = textContent.split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    };

    const tags = parseTags(formData.tags);
    const readingTime = estimateReadingTime(formData.content);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            {/* Full-screen container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <Dialog.Title className="text-lg font-semibold text-gray-900">
                                    Blog Preview
                                </Dialog.Title>
                                <p className="text-sm text-gray-500">Preview how your blog will look</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Preview Content - Scrollable */}
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                        {/* Blog Article Preview */}
                        <article className="bg-white">
                            {/* Hero Section */}
                            <div className="relative bg-gradient-to-r from-[#836953] to-[#9d7d65] text-white">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    }}>
                                    </div>
                                </div>

                                <div className="relative max-w-4xl mx-auto px-6 py-16">
                                    <div className="text-center">
                                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                            {blogData?.title || "Blog Title"}
                                        </h1>

                                        {/* Meta Information */}
                                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User size={16} />
                                                <span>Author Name</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                <span>{formatDate(blogData?.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                <span>{readingTime} min read</span>
                                            </div>
                                        </div>

                                        {/* Summary */}
                                        {blogData?.summary && (
                                            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                                                {blogData.summary}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Wave Bottom */}
                                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                                    <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="max-w-4xl mx-auto px-6 py-12">
                                {/* Tags */}
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                            >
                                                <Tag size={12} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Article Content */}
                                <div className="prose prose-lg prose-gray max-w-none">
                                    <div
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{
                                            __html: formData.content || '<p class="text-gray-500 italic">No content available</p>'
                                        }}
                                        style={{
                                            lineHeight: '1.8',
                                            fontSize: '18px'
                                        }}
                                    />
                                </div>

                                {/* SEO Information (if available) */}
                                {(formData.seoTitle || formData.seoDescription || formData.seoKeywords) && (
                                    <div className="mt-16 pt-8 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                            {formData.seoTitle && (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">SEO Title:</span>
                                                    <p className="text-blue-600 font-medium">{formData.seoTitle}</p>
                                                </div>
                                            )}
                                            {formData.seoDescription && (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">Meta Description:</span>
                                                    <p className="text-gray-700">{formData.seoDescription}</p>
                                                </div>
                                            )}
                                            {formData.seoKeywords && (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-600">Keywords:</span>
                                                    <p className="text-gray-700">{formData.seoKeywords}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                This is how your blog will appear to readers
                            </div>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors font-medium"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>

            {/* Custom Styles for Blog Content */}
            <style jsx>{`
                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6 {
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                
                .blog-content h1 { font-size: 2.25rem; }
                .blog-content h2 { font-size: 1.875rem; }
                .blog-content h3 { font-size: 1.5rem; }
                .blog-content h4 { font-size: 1.25rem; }
                
                .blog-content p {
                    margin-bottom: 1.5rem;
                    color: #374151;
                    line-height: 1.8;
                }
                
                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                
                .blog-content li {
                    margin-bottom: 0.5rem;
                    color: #374151;
                }
                
                .blog-content blockquote {
                    border-left: 4px solid #836953;
                    padding-left: 1rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: #6b7280;
                    background: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }
                
                .blog-content a {
                    color: #836953;
                    text-decoration: underline;
                }
                
                .blog-content a:hover {
                    color: #9d7d65;
                }
                
                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .blog-content code {
                    background: #f3f4f6;
                    padding: 0.125rem 0.25rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    color: #dc2626;
                }
                
                .blog-content pre {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                
                .blog-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                }
                
                .blog-content th, .blog-content td {
                    border: 1px solid #d1d5db;
                    padding: 0.75rem;
                    text-align: left;
                }
                
                .blog-content th {
                    background: #f9fafb;
                    font-weight: 600;
                }
            `}</style>
        </Dialog>
    );
};

export default BlogPreviewModal;