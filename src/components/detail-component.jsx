import React from 'react';
import { Star, Clock } from 'lucide-react';

const CourseOverview = ({ courseDetail, courseSections, course }) => {
    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    if (!courseDetail) {
        return (
            <section
                className="relative w-full h-72 flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url('https://i.imgur.com/Y1Xz8bn.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60" />
                <div className="relative z-10 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                </div>
            </section>
        );
    }

    return (
        <main
            className="relative w-full py-10"
            style={{
                backgroundImage: `url('https://i.imgur.com/Y1Xz8bn.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-3 gap-8 items-center">
                    {/* Image */}
                    <div className="flex justify-center">
                        <img
                            src={courseDetail.heroImage}
                            alt="Course"
                            className="w-56 h-48 object-cover rounded-xl shadow-lg border border-gray-700"
                        />
                    </div>

                    {/* Content */}
                    <div className="text-white space-y-3 col-span-2">
                        {/* Rating & Category */}
                        <div className="flex items-center gap-2 text-sm opacity-80">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span>{course?.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{course?.category_name || 'Category'}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl font-semibold tracking-tight">
                            {course?.title}
                        </h4>

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-sm opacity-75">
                            <Clock size={14} className="text-gray-300" />
                            <span>{formatDuration(course?.duration)}</span>
                        </div>

                        {/* Description */}
                        <p className="text-lg opacity-75 leading-relaxed max-w-lg">
                            {course?.description}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CourseOverview;
