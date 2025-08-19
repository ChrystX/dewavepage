import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openItem, setOpenItem] = useState(null);

    const faqData = [
        {
            question: "What is included in the beauty course curriculum?",
            answer:
                "Our comprehensive curriculum covers skincare fundamentals, makeup application techniques, color theory, client consultation, hygiene protocols, and business essentials. You'll also receive hands-on practice with professional-grade products and tools.",
        },
        {
            question: "How long does the course take to complete?",
            answer:
                "The full certification program takes 12 weeks with flexible scheduling options. We offer both full-time (3 days/week) and part-time (weekends) schedules to accommodate your lifestyle.",
        },
        {
            question: "Do I need any prior experience in beauty?",
            answer:
                "No prior experience is required! Our course is designed for beginners and those looking to enhance their existing skills. We start with the fundamentals and gradually build to advanced techniques.",
        },
        {
            question: "What certification will I receive?",
            answer:
                "Upon successful completion, you'll receive our accredited Professional Beauty Certification, recognized by industry professionals and beauty establishments nationwide.",
        },
        {
            question: "Are payment plans available?",
            answer:
                "Yes, we offer flexible payment plans including monthly installments and early bird discounts. Contact us to discuss the best payment option for your budget.",
        },
        {
            question: "What career opportunities are available after graduation?",
            answer:
                "Graduates can pursue careers as makeup artists, beauty consultants, freelance beauty professionals, salon technicians, or even start their own beauty business. We also provide job placement assistance.",
        },
    ];

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500">
                        Everything you need to know about our beauty course
                    </p>
                </div>

                {/* FAQ List */}
                <div className="divide-y divide-gray-200">
                    {faqData.map((item, index) => (
                        <div key={index} className="py-4">
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex justify-between items-center text-left focus:outline-none"
                            >
                <span className="text-lg font-medium text-gray-800 dm-serif-text-regular">
                  {item.question}
                </span>
                                {openItem === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                                )}
                            </button>

                            {/* Answer */}
                            <div
                                className={`transition-all duration-300 overflow-hidden ${
                                    openItem === index ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed sans-serif">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
