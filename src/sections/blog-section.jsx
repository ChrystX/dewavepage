import { useState, useEffect } from "react";
import RecentPostsCarousel from "../components/recent-post-carousel.jsx";
import RecentPostsGrid from "../components/recent-post-grid.jsx"; // your new grid component

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
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#836953]/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-3 sm:px-4 sm:py-2">
                        <svg
                            className="w-4 h-4 text-[#836953]"
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
                        <span className="text-xs sm:text-sm font-medium text-[#836953]">
              Latest Insights
            </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug">
                        Recent <span className="text-[#836953]">Stories</span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed px-2">
                        Discover the latest insights, tutorials, and expert perspectives from
                        our community
                    </p>

                    <div className="relative mx-auto w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#836953] to-transparent rounded-full mt-5"></div>
                </div>

                {/* Content */}
                <div className="relative">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-7 h-7 border-2 border-[#836953] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-gray-600 text-sm">Loading stories...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-gray-200 px-4">
                            <p className="text-gray-500 mb-3 text-sm">
                                Unable to load recent stories
                            </p>
                            <a
                                href="/blog"
                                className="inline-flex items-center gap-2 text-[#836953] hover:text-[#836953]/80 text-sm font-medium"
                            >
                                <span>View All Stories</span>
                                <svg
                                    className="w-4 h-4"
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
                        <>
                            {/* Mobile grid */}
                            <div className="sm:hidden">
                                <RecentPostsGrid blogs={blogs} />
                            </div>

                            {/* Desktop carousel */}
                            <div className="hidden sm:block">
                                <RecentPostsCarousel blogs={blogs} />
                            </div>

                            {/* CTA */}
                            <div className="text-center mt-6 sm:mt-8">
                                <a
                                    href="/blog"
                                    className="inline-flex items-center gap-2 bg-[#836953] hover:bg-[#6f5746] text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm sm:text-base"
                                >
                                    <span>Explore All Stories</span>
                                    <svg
                                        className="w-4 h-4"
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
                        </>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-xl border border-gray-200 px-4">
                            <p className="text-gray-500 text-sm">No stories available yet</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogCarouselSection;
