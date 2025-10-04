import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";

const BlogCard = ({ blog, index, size = 'default', onClick }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getImageUrl = (url) => {
        if (!url || url === 'string') return null;

        // Check if it's a Google Drive URL with /d/ format
        // Example: https://drive.google.com/file/d/FILE_ID/view
        const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            const fileId = driveMatch[1];
            // Convert to direct thumbnail URL (supports public files)
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        }

        // Check for Google Drive URLs with id= format
        // Example: https://drive.google.com/uc?id=FILE_ID
        const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (idMatch) {
            return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
        }

        // Return original URL for non-Google Drive images
        return url;
    };

    const handleClick = () => {
        // Navigate directly to blog detail page
        if (blog.id) {
            navigate(`/blog/${blog.id}`);
        } else if (onClick) {
            onClick(blog);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Size variants
    const sizeClasses = {
        small: {
            container: 'min-w-[200px]',
            image: 'aspect-[4/3]',
            padding: 'p-2',
            title: 'text-xs font-medium',
            date: 'text-xs',
            summary: 'text-xs line-clamp-2',
            action: 'text-xs'
        },
        default: {
            container: 'w-full',
            image: 'aspect-[4/3]',
            padding: 'p-4',
            title: 'text-sm font-semibold',
            date: 'text-xs',
            summary: 'text-sm line-clamp-3',
            action: 'text-sm'
        }
    };

    const currentSize = sizeClasses[size];
    const imageUrl = getImageUrl(blog.thumbnailUrl);

    return (
        <div
            onClick={handleClick}
            className={`${currentSize.container} flex-shrink-0 group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.4s ease-out forwards'
            }}
        >
            {/* Image */}
            <div className={`${currentSize.image} relative overflow-hidden`}>
                {imageUrl && !imageError ? (
                    <img
                        src={imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleImageError}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E91E63]/10 to-[#E91E63]/20">
                        <div className="text-lg font-medium text-[#E91E63]/60">
                            {blog.title?.charAt(0) || 'B'}
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={currentSize.padding}>
                {/* Date */}
                <div className={`flex items-center gap-1 text-gray-400 ${currentSize.date} mb-1`}>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className={`text-gray-900 mb-2 line-clamp-2 group-hover:text-[#E91E63] transition-colors ${currentSize.title}`}>
                    {blog.title}
                </h3>

                {/* Summary */}
                {size === 'default' && blog.summary && blog.summary !== 'string' && (
                    <p className={`text-gray-500 mb-4 ${currentSize.summary}`}>
                        {blog.summary}
                    </p>
                )}

                {/* Action */}
                {size === 'default' && (
                    <div className="flex justify-end">
                        <div className={`flex items-center gap-2 text-[#E91E63] font-medium group-hover:gap-3 transition-all ${currentSize.action}`}>
                            <Eye className="w-4 h-4" />
                            <span>Read</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
