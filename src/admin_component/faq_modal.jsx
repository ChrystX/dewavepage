import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const FaqModal = ({ isOpen, onClose, formData, setFormData, onSubmit, faqs = [], onEdit, onDelete }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value.replace(/\D/, '') })); // only digits
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit FAQING HELL' : 'Add FAQ'}</h2>

                {/* Existing FAQs */}
                {faqs.length > 0 && (
                    <div className="mb-4 overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 border">Question</th>
                                <th className="px-3 py-2 border">Answer</th>
                                <th className="px-3 py-2 border">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {faqs.map(faq => (
                                <tr key={faq.id}>
                                    <td className="px-3 py-2 border">{faq.question}</td>
                                    <td className="px-3 py-2 border">{faq.answer}</td>
                                    <td className="px-3 py-2 border flex space-x-1">
                                        <button onClick={() => onEdit(faq)} className="text-yellow-600 hover:text-yellow-800">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(faq.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Form for creating/editing FAQ */}
                <label className="block mb-2">
                    Question<span className="text-red-500">*</span>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Answer
                    <textarea
                        name="answer"
                        value={formData.answer || ''}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        rows={4}
                    />
                </label>

                <label className="block mb-4">
                    Sort Order
                    <input
                        type="number"
                        name="sortOrder"
                        value={formData.sortOrder || 0}
                        onChange={handleNumberChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {formData.id ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FaqModal;
