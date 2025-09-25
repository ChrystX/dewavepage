import { Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0
            ? mins > 0
                ? `${hours}h ${mins}m`
                : `${hours}h`
            : `${mins}m`;
    };

    const handleViewProgram = (e) => {
        e.stopPropagation();
        navigate(`/course/${course.id}`);
    };

    // Same navigation function for title and image
    const handleNavigateToDetail = (e) => {
        e.stopPropagation();
        navigate(`/course/${course.id}`);
    };

    // Truncate title to ensure consistent length
    const truncateTitle = (title, maxLength = 60) => {
        if (!title) return 'Untitled Course';
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength).trim() + '...';
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
            <div className="relative cursor-pointer" onClick={handleNavigateToDetail}>
                <img
                    src={course.image?.trim() || "/no-image.png"}
                    alt={course.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.png";
                    }}
                    className="w-full h-28 sm:h-36 object-cover hover:opacity-90 transition-opacity duration-200"
                    loading="lazy"
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
                {/* Fixed height title container - always 2 lines - now clickable */}
                <div className="h-10 mb-2">
                    <h3
                        className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-5 cursor-pointer hover:text-pink-600 transition-colors duration-200"
                        onClick={handleNavigateToDetail}
                    >
                        {truncateTitle(course.title)}
                    </h3>
                </div>

                <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                        <Star size={14} fill="currentColor" className="text-yellow-400" />
                        <span className="font-medium">
                            {course.rating ? course.rating.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-500" />
                        <span>{formatDuration(course.duration)}</span>
                    </div>
                </div>

                {/* Fixed height description container */}
                <div className="h-8 mb-3">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-4">
                        {course.description || "No description available"}
                    </p>
                </div>

                {/* Button pushed to bottom */}
                <button
                    onClick={handleViewProgram}
                    className="mt-auto w-full py-2 text-sm font-medium text-pink-600 border-2 border-pink-600 rounded-full transition-all duration-300 hover:bg-pink-600 hover:text-white hover:shadow-md active:scale-95"
                >
                    View Program
                </button>
            </div>
        </div>
    );
};

export default CourseCard;