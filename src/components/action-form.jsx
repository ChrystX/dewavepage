import React, { useState } from 'react';
import { Upload, User, Phone, MapPin, Mail, GraduationCap, FileText, Send, ChevronDown } from 'lucide-react';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
        course: '',
        cv: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [applicationId, setApplicationId] = useState(null);

    const API_BASE_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api';

    const courses = ['Lashes', 'Make Up', 'Massage', 'Nail Art', 'Hairdressing'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024;
            if (!allowedTypes.includes(file.type)) return setError('Please upload a PDF, DOC, or DOCX file.');
            if (file.size > maxSize) return setError('File size must be less than 5MB.');
        }
        setFormData(prev => ({ ...prev, cv: file }));
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.name.trim()) return setError('Please enter your full name.') && false;
        if (!formData.phone.trim()) return setError('Please enter your phone number.') && false;
        if (!formData.email.trim()) return setError('Please enter your email address.') && false;
        if (!formData.address.trim()) return setError('Please enter your address.') && false;
        if (!formData.course) return setError('Please select a course.') && false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return setError('Please enter a valid email address.') && false;
        return true;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append('Name', formData.name.trim());
            submitData.append('Phone', formData.phone.trim());
            submitData.append('Email', formData.email.trim());
            submitData.append('Address', formData.address.trim());
            submitData.append('Course', formData.course);
            if (formData.cv) submitData.append('CV', formData.cv);

            const response = await fetch(`${API_BASE_URL}/application/submit`, { method: 'POST', body: submitData });
            const result = await response.json();

            if (response.ok && result.success) {
                setApplicationId(result.applicationId);
                setSubmitted(true);
            } else {
                setError(result.message || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-12 h-12 border border-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">Application Submitted</h2>
                    <p className="text-gray-600 font-light mb-4">We'll review your application and contact you soon.</p>
                    {applicationId && (
                        <p className="text-sm text-gray-500">
                            Application ID: <span className="font-medium">#{applicationId}</span>
                        </p>
                    )}
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setFormData({ name: '', phone: '', address: '', email: '', course: '', cv: null });
                            setApplicationId(null);
                            setError('');
                        }}
                        className="mt-6 text-sm sm:text-base text-gray-600 underline hover:text-gray-900 transition-colors"
                    >
                        Submit another application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 bg-white flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-md w-full space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">Course Application</h2>
                    <p className="text-gray-500 font-light text-sm sm:text-base">Professional beauty and wellness programs</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    {/* Name */}
                    <InputField label="Full Name" Icon={User} name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" />
                    {/* Phone */}
                    <InputField label="Phone Number" Icon={Phone} name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                    {/* Email */}
                    <InputField label="Email Address" Icon={Mail} name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" />
                    {/* Address */}
                    <TextareaField label="Address" Icon={MapPin} name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your full address" rows={3} />
                    {/* Course */}
                    <CustomSelectField
                        label="Desired Course"
                        Icon={GraduationCap}
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        options={courses}
                    />
                    {/* CV Upload */}
                    <FileUploadField label="CV/Resume Upload" Icon={FileText} file={formData.cv} onChange={handleFileChange} />

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <Send className="w-4 h-4" />
                                <span>Submit Application</span>
                            </div>
                        )}
                    </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 text-center mt-4">
                    By submitting this form, you agree to be contacted regarding your course application.
                </p>
            </div>
        </div>
    );
}

/* Helper components */
function InputField({ label, Icon, name, value, onChange, placeholder, type = 'text' }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-gray-300 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200 rounded-sm"
            />
        </div>
    );
}

function TextareaField({ label, Icon, name, value, onChange, placeholder, rows }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-transparent border-b border-gray-300 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200 resize-none rounded-sm"
            />
        </div>
    );
}

function CustomSelectField({ label, Icon, name, value, onChange, options }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (selectedValue) => {
        onChange({ target: { name, value: selectedValue } });
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col space-y-1 relative">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label}
            </label>

            {/* Custom dropdown trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-transparent border-b border-gray-300 py-3 px-2 text-gray-900 focus:outline-none focus:border-gray-900 transition-all duration-200 rounded-sm cursor-pointer flex items-center justify-between hover:border-gray-500"
            >
                <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                    {value || 'Select a course'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown options */}
                    <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {options.map((option, index) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                                    value === option ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700'
                                } ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function FileUploadField({ label, Icon, file, onChange }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label} <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
                <input
                    type="file"
                    onChange={onChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                />
                <label
                    htmlFor="cv-upload"
                    className="w-full flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 py-3 px-2 cursor-pointer hover:border-gray-900 transition-colors duration-200 rounded-sm"
                >
                    <div className="flex items-center mb-1 sm:mb-0">
                        <Upload className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-gray-900">{file ? file.name : 'Choose file'}</span>
                    </div>
                    <span className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</span>
                </label>
            </div>
        </div>
    );
}