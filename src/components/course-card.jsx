// CourseCard.jsx
import { Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const getImageUrl = (url) => {
    if (!url || url === 'string' || !url.trim()) return null;

    // Check if it's a Google Drive URL with /d/ format
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
        const fileId = driveMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }

    // Check for Google Drive URLs with id= format
    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
    }

    // Return original URL for non-Google Drive images
    return url;
};

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

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

    const handleNavigateToDetail = (e) => {
        e.stopPropagation();
        navigate(`/course/${course.id}`);
    };

    const truncateTitle = (title, maxLength = 60) => {
        if (!title) return 'Untitled Course';
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength).trim() + '...';
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const imageUrl = getImageUrl(course.image) || "/no-image.png";

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
            <div className="relative cursor-pointer" onClick={handleNavigateToDetail}>
                <img
                    src={imageError ? "/no-image.png" : imageUrl}
                    alt={course.title}
                    onError={handleImageError}
                    className="w-full h-28 sm:h-36 object-cover hover:opacity-90 transition-opacity duration-200"
                    loading="lazy"
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
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

                <div className="h-8 mb-3">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-4">
                        {course.description || "No description available"}
                    </p>
                </div>

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