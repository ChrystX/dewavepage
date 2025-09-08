import { useNavigate } from "react-router-dom";

const SweeperCard = ({ course }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative w-full h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700
                       rounded-xl overflow-hidden cursor-pointer group transition-all duration-300
                       hover:shadow-lg hover:shadow-slate-500/20 hover:-translate-y-2"
        >
            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center px-4">
                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-semibold text-sm leading-tight truncate mb-1">
                        {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                        Click to explore
                    </p>
                </div>
            </div>

            {/* Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.png";
                    }}
                />
                {/* Left to right gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/60 to-transparent"></div>
            </div>

            {/* Subtle border highlight on hover */}
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-slate-500/30 transition-colors duration-300"></div>
        </div>
    );
};

export default SweeperCard;
