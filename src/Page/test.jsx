import React from 'react';

const FaqModal = ({ isOpen, onClose, formData, setFormData, onSubmit }) => {
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
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit FAQ' : 'Add FAQ'}</h2>

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
