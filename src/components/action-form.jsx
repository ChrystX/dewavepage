import React, { useState } from 'react';
import { Upload, User, Phone, MapPin, Mail, GraduationCap, FileText, Send } from 'lucide-react';

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

    const courses = [
        'Lashes',
        'Make Up',
        'Massage',
        'Nail Art',
        'Hairdressing'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            cv: file
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        setSubmitted(true);
        setIsSubmitting(false);
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
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Application Submitted</h2>
                    <p className="text-gray-600 font-light">We'll review your application and contact you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className = "py-8 bg-white flex items-center justify-center px-4">
            <div className="max-w-lg w-full">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-light text-gray-900 mb-2">Course Application</h2>
                    <p className="text-gray-500 font-light">Professional beauty and wellness programs</p>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    {/* Address Field */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200 resize-none"
                            placeholder="Enter your full address"
                            required
                        />
                    </div>

                    {/* Course Dropdown */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Desired Course
                        </label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors duration-200 appearance-none cursor-pointer"
                            required
                        >
                            <option value="" className="text-gray-400">Select a course</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-900 font-medium flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            CV/Resume Upload
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                id="cv-upload"
                            />
                            <label
                                htmlFor="cv-upload"
                                className="w-full flex items-center justify-between border-b border-gray-300 py-3 cursor-pointer hover:border-gray-900 transition-colors duration-200"
                            >
                                <div className="flex items-center">
                                    <Upload className="w-4 h-4 mr-2 text-gray-600" />
                                    <span className="text-gray-900">
                    {formData.cv ? formData.cv.name : 'Choose file'}
                  </span>
                                </div>
                                <span className="text-xs text-gray-400">PDF, DOC, DOCX</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="signup-button"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent mr-2"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Application
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-8">
                    <p className="text-xs text-gray-400 text-center font-light">
                        By submitting this form, you agree to be contacted regarding your course application.
                    </p>
                </div>
            </div>
        </div>
    );
}