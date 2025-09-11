import {useEffect, useState} from "react";
import RecentPostsCarousel from "../components/recent-post-carousel.jsx";
import BlogCard from "../components/blog-card.jsx";
import {useBlogData} from "../hooks/useBlogData.js";
import Pagination from "../components/blog-pagination.jsx";
import {BookOpen, Users, Award} from 'lucide-react';

const BlogPage = () => {
    // Replace the old state and fetch logic with the custom hook
    const { blogs, loading, error, hasData } = useBlogData();

    const [currentPage, setCurrentPage] = useState(1);
    const [scrollY, setScrollY] = useState(0);
    const blogsPerPage = 12;

    // Track scroll for navbar compatibility
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Calculate navbar height based on scroll position (same logic as navbar)
    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const navbarHeight = 80; // 20 * 4 = 80px (h-20)
    const totalNavbarHeight = logoHeight + navbarHeight;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading stories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Spacer for fixed navbar */}
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />

            {/* Hero Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#e91e63]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fadeIn">
                            <BookOpen size={20} />
                            <span className="text-sm font-medium">Content Hub</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent leading-tight md:leading-snug animate-slideInUp">
                            Stories & Insights
                        </h1>

                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                            Discover expert insights and practical tutorials from our community
                        </p>

                        <div className="flex items-center justify-center gap-8 text-sm animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-2">
                                <BookOpen size={18} />
                                <span>{blogs.length} Articles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={18} />
                                <span>Expert Authors</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={18} />
                                <span>Quality Content</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="rgb(249, 250, 251)"></path>
                    </svg>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                        <p className="text-yellow-800 text-sm">
                            Could not fetch blogs from API: {error}
                        </p>
                    </div>
                )}

                {/* Recent Posts Carousel */}
                {hasData && <RecentPostsCarousel blogs={blogs.slice(0, 8)} />}

                {/* All Posts with Pagination */}
                <section>
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">All Stories</h2>
                        <p className="text-gray-600 text-sm">Page {currentPage} of {totalPages}</p>

                        <div className="relative mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e91e63] to-transparent rounded-full mt-3"></div>
                    </div>

                    {!hasData && !loading ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <BookOpen size={32} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No stories available</p>
                        </div>
                    ) : hasData ? (
                        <>
                            {/* Adjusted grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {currentBlogs.map((blog, index) => (
                                    <BlogCard key={blog.id} blog={blog} index={index} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : null}
                </section>
            </main>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                .animate-slideInUp {
                    animation: slideInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default BlogPage;