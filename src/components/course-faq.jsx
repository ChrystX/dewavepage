import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqItem = ({ faq, isExpanded, onToggle }) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-controls={`faq-content-${faq.id}`}
                id={`faq-header-${faq.id}`}
                className="w-full flex justify-between items-center py-4 px-2 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
                <h3 className="text-base font-medium text-gray-900">{faq.question}</h3>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {isExpanded && faq.answer && (
                <div
                    id={`faq-content-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-header-${faq.id}`}
                    className="px-2 pb-4 pt-1 text-gray-700 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
            )}
        </div>
    );
};

const FaqSection = ({ faqs }) => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    if (!faqs || faqs.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
                <p className="text-gray-400">No FAQs available yet. Please check back later.</p>
            </div>
        );
    }

    return (
        <section className="max-w-3xl mx-auto px-2">
            <div>
                {faqs.map((faq) => (
                    <FaqItem
                        key={faq.id}
                        faq={faq}
                        isExpanded={expandedFaq === faq.id}
                        onToggle={() => toggleFaq(faq.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FaqSection;
