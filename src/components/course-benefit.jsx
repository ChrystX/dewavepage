import React, { useRef } from 'react';
import { Award, BookOpen, Users, Clock, Trophy, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CourseBenefits = () => {
    const benefits = [
        { icon: <Award />, title: "Certificate", description: "Industry-recognized completion certificate" },
        { icon: <BookOpen />, title: "Full Curriculum", description: "Complete structured learning path" },
        { icon: <Users />, title: "Community", description: "Access to learner community" },
        { icon: <Clock />, title: "Lifetime Access", description: "Learn at your own pace forever" },
        { icon: <Trophy />, title: "Projects", description: "Real-world portfolio pieces" },
        { icon: <Star />, title: "Mentorship", description: "Expert guidance and feedback" }
    ];

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -250 : 250,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 relative">
            {/* Section Header */}
            <div className="mb-12 flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-2">What you'll get</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Scrollable Cards Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
            >
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="flex-none w-64 bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                                {React.cloneElement(benefit.icon, { className: "w-5 h-5 text-gray-600" })}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseBenefits;
