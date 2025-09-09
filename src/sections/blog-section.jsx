import { useState, useEffect } from "react";
import RecentPostsCarousel from "../components/recent-post-carousel.jsx";
import RecentPostsGrid from "../components/recent-post-grid.jsx";

const BlogCarouselSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    "https://dewavefreeapi20250731173800.azurewebsites.net/api/blogs"
                );
                if (!response.ok) throw new Error("Failed to fetch blogs");
                const data = await response.json();
                setBlogs(data.slice(0, 8)); // top 8
            } catch (err) {
                setError(err.message);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="w-full overflow-hidden"> {/* Add overflow wrapper */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-6"> {/* Reduced mobile padding */}
                    {/* Section Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#e91e63]/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-3 sm:px-4 sm:py-2">
                            <svg
                                className="w-4 h-4 text-[#e91e63] flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                ></path>
                            </svg>
                            <span className="text-xs sm:text-sm font-medium text-[#e91e63] whitespace-nowrap">
                                Latest Insights
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug px-2">
                            Recent <span className="text-[#e91e63]">Stories</span>
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-lg leading-relaxed px-4">
                            Discover the latest insights, tutorials, and expert perspectives from
                            our community
                        </p>

                        <div className="relative mx-auto w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#e91e63] to-transparent rounded-full mt-4 sm:mt-5"></div>
                    </div>

                    {/* Content */}
                    <div className="relative w-full overflow-hidden"> {/* Add width constraint */}
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-7 h-7 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                <p className="text-gray-600 text-sm">Loading stories...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 bg-white rounded-xl border border-gray-200 px-4 mx-2 sm:mx-0">
                                <p className="text-gray-500 mb-3 text-sm">
                                    Unable to load recent stories
                                </p>
                                <a
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-[#e91e63] hover:text-[#c2185b] text-sm font-medium"
                                >
                                    <span>View All Stories</span>
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        ) : blogs.length > 0 ? (
                            <div className="w-full"> {/* Ensure full width constraint */}
                                {/* Mobile: 2-column grid */}
                                <div className="sm:hidden px-2">
                                    <div className="grid grid-cols-2 gap-3">
                                        {blogs.slice(0, 4).map((blog, index) => (
                                            <div key={blog.id || index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                {/* Image */}
                                                {blog.imageUrl && (
                                                    <div className="w-full h-24 overflow-hidden">
                                                        <img
                                                            src={blog.imageUrl}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="p-3">
                                                    <h3 className="font-medium text-gray-900 text-xs leading-tight mb-2 line-clamp-2">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2">
                                                        {blog.excerpt || blog.summary}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-400">
                                                            {blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : 'Recent'}
                                                        </span>
                                                        <a
                                                            href={`/blog/${blog.id || blog.slug}`}
                                                            className="text-[#e91e63] hover:text-[#c2185b] text-xs font-medium"
                                                        >
                                                            Read →
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Show All Button */}
                                    <div className="text-center pt-4">
                                        <a
                                            href="/blog"
                                            className="inline-flex items-center gap-2 bg-[#e91e63] hover:bg-[#c2185b] text-white px-4 py-2 rounded-lg shadow-sm transition-colors text-sm"
                                        >
                                            <span>View All Stories</span>
                                            <svg
                                                className="w-4 h-4 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5l7 7-7 7"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Desktop: Use existing carousel */}
                                <div className="hidden sm:block w-full overflow-hidden">
                                    <RecentPostsCarousel blogs={blogs} />
                                </div>

                                {/* CTA - Only show on desktop */}
                                <div className="hidden sm:block text-center mt-6 sm:mt-8">
                                    <a
                                        href="/blog"
                                        className="inline-flex items-center gap-2 bg-[#e91e63] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm sm:text-base"
                                    >
                                        <span>Explore All Stories</span>
                                        <svg
                                            className="w-4 h-4 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-white rounded-xl border border-gray-200 px-4 mx-2 sm:mx-0">
                                <p className="text-gray-500 text-sm">No stories available yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogCarouselSection;