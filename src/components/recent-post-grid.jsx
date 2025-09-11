import BlogCard from "./blog-card.jsx";

const RecentPostsGrid = ({ blogs, onBlogClick }) => {
    if (!blogs || blogs.length === 0) return null;

    const transformBlogData = (blog) => ({
        ...blog,
        thumbnailUrl: blog.thumbnailUrl || blog.imageUrl || blog.image,
        publishedAt: blog.publishedAt || blog.publishedDate || blog.createdAt,
        summary: blog.summary || blog.excerpt || blog.description
    });

    return (
        <>
            {/* Mobile: Custom vertical cards */}
            <div className="sm:hidden space-y-6 px-2">
                {blogs.slice(0, 4).map((blog, index) => {
                    const transformedBlog = transformBlogData(blog);
                    return (
                        <article
                            key={blog.id || index}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                            onClick={() => onBlogClick && onBlogClick(blog)}
                        >
                            {/* Image */}
                            {transformedBlog.thumbnailUrl && transformedBlog.thumbnailUrl !== 'string' && (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={transformedBlog.thumbnailUrl}
                                        alt={transformedBlog.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {/* Fallback if no image */}
                            {(!transformedBlog.thumbnailUrl || transformedBlog.thumbnailUrl === 'string') && (
                                <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-[#E91E63]/10 to-[#E91E63]/20">
                                    <div className="text-3xl font-bold text-[#E91E63]/60">
                                        {transformedBlog.title?.charAt(0) || 'B'}
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">
                                    {transformedBlog.title}
                                </h3>
                                {transformedBlog.summary && transformedBlog.summary !== 'string' && (
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {transformedBlog.summary}
                                    </p>
                                )}

                                {/* Meta info */}
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <span>
                                            {transformedBlog.publishedAt
                                                ? new Date(transformedBlog.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })
                                                : 'Recent'
                                            }
                                        </span>
                                        {blog.readTime && (
                                            <>
                                                <span>•</span>
                                                <span>{blog.readTime}</span>
                                            </>
                                        )}
                                        {blog.author && (
                                            <>
                                                <span>•</span>
                                                <span>{blog.author}</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="inline-flex items-center gap-1 text-[#E91E63] hover:text-[#C2185B] font-medium transition-colors">
                                        <span>Read</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}

                {/* Show more button for mobile */}
                {blogs.length > 4 && (
                    <div className="text-center pt-4 pb-2">
                        <button
                            onClick={() => onBlogClick && onBlogClick({ showAll: true })}
                            className="inline-flex items-center gap-2 bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 py-3 rounded-xl shadow-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <span>View All {blogs.length} Stories</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop: Use BlogCard component in grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogs.map((blog, index) => {
                    const transformedBlog = transformBlogData(blog);
                    return (
                        <BlogCard
                            key={blog.id || index}
                            blog={transformedBlog}
                            index={index}
                            size="default"
                            onClick={onBlogClick}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default RecentPostsGrid;
