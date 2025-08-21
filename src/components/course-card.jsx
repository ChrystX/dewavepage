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
            className="course-card cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="card-image">
                <img
                    src={course.image?.trim() || "/no-image.png"}
                    alt={course.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.png";
                    }}
                    className="object-cover w-full h-[180px] rounded"
                    loading="lazy"
                />
            </div>
            <div className="card-content">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-meta">
                    <div className="meta-item">
                        <Star size={16} fill="currentColor" />
                        <span>{course.rating ? course.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                    <div className="meta-item">
                        <Clock size={16} />
                        <span>{formatDuration(course.duration)}</span>
                    </div>
                </div>
                <p className="course-description">
                    {course.description || "No description available"}
                </p>
            </div>
        </div>
    );
};

export default CourseCard;