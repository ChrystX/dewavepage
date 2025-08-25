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

    const handleCardClick = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95"
            onClick={handleCardClick}
        >
            <div className="relative">
                <img
                    src={course.image?.trim() || "/no-image.png"}
                    alt={course.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.png";
                    }}
                    className="w-full h-24 sm:h-32 object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                    {course.title}
                </h3>

                <div className="flex items-center justify-between mb-1 sm:mb-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                        <Star size={12} fill="currentColor" className="text-yellow-400" />
                        <span className="font-medium">
                            {course.rating ? course.rating.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-500" />
                        <span>{formatDuration(course.duration)}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {course.description || "No description available"}
                </p>
            </div>
        </div>
    );
};

export default CourseCard;