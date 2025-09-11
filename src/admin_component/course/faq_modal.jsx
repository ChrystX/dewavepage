import React, { useState } from 'react';
import {
    Edit,
    Trash2,
    X,
    Save,
    Plus,
    HelpCircle,
    MessageSquare,
    Hash,
    AlertCircle,
    CheckCircle,
    Eye,
    EyeOff
} from 'lucide-react';

const FaqModal = ({ isOpen, onClose, formData, setFormData, onSubmit, faqs = [], onEdit, onDelete }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value.replace(/\D/, '') }));
    };

    const toggleFaqExpansion = (faqId) => {
        setExpandedFaq(expandedFaq === faqId ? null : faqId);
    };

    const isEditing = formData.id;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit FAQ' : 'Manage FAQs'}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''} total
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
                    <div className="space-y-6">
                        {/* Form Section */}
                        <div className="bg-white border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {isEditing ? 'Edit FAQ Entry' : 'Add New FAQ'}
                                </h3>
                                {formData.question && formData.answer && (
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                                    </button>
                                )}
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* Sort Order */}
                                <div className="bg-gray-50 border border-gray-200 p-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sort Order
                                    </label>
                                    <div className="flex items-center">
                                        <Hash className="w-5 h-5 text-gray-400 mr-2" />
                                        <input
                                            type="number"
                                            name="sortOrder"
                                            value={formData.sortOrder || 0}
                                            onChange={handleNumberChange}
                                            className="w-32 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                                </div>

                                {/* Question */}
                                <div className="bg-white border border-gray-200 p-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Question *
                                    </label>
                                    <div className="flex items-start">
                                        <HelpCircle className="w-5 h-5 text-gray-400 mr-2 mt-2 flex-shrink-0" />
                                        <input
                                            type="text"
                                            name="question"
                                            value={formData.question}
                                            onChange={handleChange}
                                            className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="What is your question?"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Answer */}
                                <div className="bg-white border border-gray-200 p-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Answer
                                    </label>
                                    <div className="flex items-start">
                                        <MessageSquare className="w-5 h-5 text-gray-400 mr-2 mt-2 flex-shrink-0" />
                                        <textarea
                                            name="answer"
                                            value={formData.answer || ''}
                                            onChange={handleChange}
                                            rows={6}
                                            className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Provide a detailed answer to help users understand..."
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                {showPreview && formData.question && formData.answer && (
                                    <div className="bg-white border border-gray-200 p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Preview
                                        </label>
                                        <div className="border border-gray-300 bg-gray-50">
                                            <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
                                                <span className="text-xs text-gray-600">FAQ Preview</span>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start space-x-3">
                                                    <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 mb-2">{formData.question}</h4>
                                                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{formData.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => {
                                        setFormData({ question: '', answer: '', sortOrder: 0 });
                                        setShowPreview(false);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={onSubmit}
                                    disabled={!formData.question}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{isEditing ? 'Update FAQ' : 'Create FAQ'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Existing FAQs Section */}
                        {faqs.length > 0 && (
                            <div className="bg-white border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Existing FAQs</h3>
                                    <span className="text-sm text-gray-500">
                                        {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {faqs
                                        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                                        .map((faq) => (
                                            <div
                                                key={faq.id}
                                                className="border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-start space-x-3">
                                                                <div className="flex items-center space-x-2">
                                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                                    #{faq.sortOrder || 0}
                                                                </span>
                                                                    <HelpCircle className="w-4 h-4 text-blue-600" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium text-gray-900 mb-1">
                                                                        {faq.question}
                                                                    </h4>
                                                                    <div className="text-sm text-gray-600">
                                                                        {expandedFaq === faq.id ? (
                                                                            <div className="whitespace-pre-wrap">
                                                                                {faq.answer}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="line-clamp-2">
                                                                                {faq.answer ?
                                                                                    faq.answer.length > 100
                                                                                        ? `${faq.answer.substring(0, 100)}...`
                                                                                        : faq.answer
                                                                                    : 'No answer provided'
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {faq.answer && faq.answer.length > 100 && (
                                                                        <button
                                                                            onClick={() => toggleFaqExpansion(faq.id)}
                                                                            className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                                                                        >
                                                                            {expandedFaq === faq.id ? 'Show less' : 'Show more'}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-2 ml-4">
                                                            <button
                                                                onClick={() => onEdit(faq)}
                                                                className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 transition-colors duration-200"
                                                                title="Edit FAQ"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm('Are you sure you want to delete this FAQ?')) {
                                                                        onDelete(faq.id);
                                                                    }
                                                                }}
                                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors duration-200"
                                                                title="Delete FAQ"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {faqs.length === 0 && (
                                    <div className="text-center py-8">
                                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">No FAQs created yet</p>
                                        <p className="text-gray-400 text-xs">Create your first FAQ above</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Guidelines */}
                        <div className="bg-blue-50 border border-blue-200 p-4">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900 mb-2">FAQ Guidelines</h4>
                                    <ul className="text-xs text-blue-800 space-y-1">
                                        <li>• Keep questions clear and specific</li>
                                        <li>• Provide comprehensive but concise answers</li>
                                        <li>• Use sort order to prioritize important FAQs</li>
                                        <li>• Review and update FAQs regularly</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''} • Last updated: {new Date().toLocaleDateString()}
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqModal;