import { Calendar, ArrowRight } from 'lucide-react';

const CarouselBlogCard = ({ blog, index, onClick }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleClick = () => {
        if (onClick) {
            onClick(blog);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="w-full group bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 shadow-lg"
            style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.4s ease-out forwards'
            }}
        >
            <div className="aspect-[5/3] sm:aspect-[4/3] relative overflow-hidden">
                {/* Background Image */}
                {blog.thumbnailUrl && blog.thumbnailUrl !== 'string' ? (
                    <img
                        src={blog.thumbnailUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#836953] via-[#9d7d65] to-[#b8967d]">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white/30">
                                {blog.title?.charAt(0) || 'B'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                    {/* Date - Always visible at top */}
                    <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="font-medium">
                            {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60 text-xs">
                            {Math.max(1, Math.ceil((blog.content?.length || blog.summary?.length || 500) / 200))} min read
                        </span>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative">
                        {/* Title - starts at bottom, rises on hover */}
                        <h3 className="text-white text-base sm:text-lg font-bold line-clamp-2 leading-tight drop-shadow-sm transform transition-transform duration-300 ease-out group-hover:-translate-y-16 sm:group-hover:-translate-y-20">
                            {blog.title}
                        </h3>

                        {/* Summary and Action - slides up from below on hover */}
                        <div className="absolute bottom-0 left-0 right-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100">
                            {blog.summary && blog.summary !== 'string' && (
                                <p className="text-white/90 text-sm line-clamp-2 leading-relaxed mb-3 drop-shadow-sm">
                                    {blog.summary}
                                </p>
                            )}

                            {/* Action Button */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                                    <span>Read Article</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>

                                {/* Category Badge (optional) */}
                                {blog.category && (
                                    <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                        {blog.category}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Static Read More Indicator (visible when not hovering) */}
                        <div className="absolute -bottom-2 right-0 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-300 ease-out">
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-[#836953] group-hover:border-[#836953] transition-all duration-300">
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </div>
        </div>
    );
};

export default CarouselBlogCard;