import { Calendar, ArrowLeft, Tag, Eye, Clock, Share2, User, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [shareSuccess, setShareSuccess] = useState(false);

    // Navbar height calculation
    const maxLogoScroll = 100;
    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const navbarHeight = 80;
    const totalNavbarHeight = logoHeight + navbarHeight;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch blog details
                const response = await fetch(
                    `https://dewavefreeapi20250731173800.azurewebsites.net/api/blogdetails/${blogId}`
                );
                if (!response.ok) throw new Error(`Failed to fetch blog details: ${response.status}`);
                const data = await response.json();
                setBlogDetail(data);

                // Fetch blog data (includes viewCount)
                const blogResponse = await fetch(
                    `https://dewavefreeapi20250731173800.azurewebsites.net/api/blogs/${blogId}`
                );
                if (!blogResponse.ok) throw new Error(`Failed to fetch blog: ${blogResponse.status}`);
                const blogData = await blogResponse.json();

                setBlog({
                    blogId: data.blogId,
                    title: data.seoTitle || blogData.title || 'Blog Post',
                    summary: data.seoDescription || blogData.summary || '',
                    thumbnailUrl: blogData.thumbnailUrl || null,
                    publishedAt: blogData.publishedAt || blogData.createdAt || new Date().toISOString(),
                    viewCount: blogData.viewCount || 0 // Use real view count from API
                });

                // Increment view count after successful fetch
                try {
                    await fetch(
                        `https://dewavefreeapi20250731173800.azurewebsites.net/api/blogs/${blogId}/increment-view`,
                        { method: 'POST' }
                    );
                    // Optionally update local state to reflect the increment immediately
                    setBlog(prev => prev ? { ...prev, viewCount: prev.viewCount + 1 } : null);
                } catch (viewError) {
                    // Silently fail if view count increment fails (non-critical)
                    console.warn('Failed to increment view count:', viewError);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (blogId) fetchBlogDetail();
    }, [blogId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatReadTime = (content) => {
        if (!content) return '5 min read';
        const wordsPerMinute = 200;
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
    };

    const parseTags = (tagsString) => {
        if (!tagsString || tagsString === 'string') return [];
        return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blogDetail?.seoDescription || blog.summary,
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    fallbackCopy();
                }
            }
        } else {
            fallbackCopy();
        }
    };

    const fallbackCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 2000);
        });
    };

    const handleBack = () => navigate('/blog');
    const handleHome = () => navigate('/');

    const tags = parseTags(blogDetail?.tags);

    // Loading state with navbar spacing
    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading blog post...</p>
                </div>
            </div>
        </div>
    );

    // Error state with navbar spacing
    if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />
            <div className="flex items-center justify-center py-20">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">Error: {error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={handleBack}
                            className="w-full px-6 py-3 bg-[#e91e63] text-white rounded-lg hover:bg-[#d01758] transition-colors font-medium"
                        >
                            Back to Blog
                        </button>
                        <button
                            onClick={handleHome}
                            className="w-full px-6 py-3 border-2 border-[#e91e63] text-[#e91e63] rounded-lg hover:bg-[#e91e63] hover:text-white transition-all font-medium"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Not found state
    if (!blog || !blogDetail) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />
            <div className="flex items-center justify-center py-20">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Blog post not found</h2>
                    <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
                    <div className="space-y-3">
                        <button
                            onClick={handleBack}
                            className="w-full px-6 py-3 bg-[#e91e63] text-white rounded-lg hover:bg-[#d01758] transition-colors font-medium"
                        >
                            Browse All Blogs
                        </button>
                        <button
                            onClick={handleHome}
                            className="w-full px-6 py-3 border-2 border-[#e91e63] text-[#e91e63] rounded-lg hover:bg-[#e91e63] hover:text-white transition-all font-medium"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Navbar spacer */}
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Bar */}
                <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-sm px-4 py-3">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#e91e63] hover:text-[#d01758] font-medium transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Blog</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleShare}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                shareSuccess
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-[#e91e63] text-white hover:bg-[#d01758]'
                            }`}
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                {shareSuccess ? 'Copied!' : 'Share'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Article Container */}
                <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Featured Image */}
                    {blog.thumbnailUrl && blog.thumbnailUrl !== 'string' && (
                        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                            <img
                                src={blog.thumbnailUrl}
                                alt={blog.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                    isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                }`}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                            {!isImageLoaded && (
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-[#e91e63] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}

                    <div className="p-6 sm:p-8 lg:p-12">
                        {/* Article Header */}
                        <header className="mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                {blogDetail.seoTitle || blog.title}
                            </h1>

                            {blogDetail.seoDescription && (
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    {blogDetail.seoDescription}
                                </p>
                            )}

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-[#e91e63]" />
                                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-[#e91e63]" />
                                    <span>{formatReadTime(blogDetail.content)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Eye className="w-4 h-4 text-[#e91e63]" />
                                    <span>{blog.viewCount || 0} views</span>
                                </div>
                            </div>
                        </header>

                        {/* Article Content */}
                        <div
                            className="prose prose-lg max-w-none
                                       prose-headings:text-gray-900 prose-headings:font-bold
                                       prose-p:text-gray-700 prose-p:leading-relaxed
                                       prose-a:text-[#e91e63] hover:prose-a:text-[#d01758] prose-a:no-underline hover:prose-a:underline
                                       prose-img:rounded-lg prose-img:shadow-md
                                       prose-blockquote:border-l-[#e91e63] prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg
                                       prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                                       prose-pre:bg-gray-900 prose-pre:text-gray-100"
                            dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                        />

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag className="w-4 h-4 text-[#e91e63]" />
                                    <span className="text-sm font-medium text-gray-700">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#e91e63] hover:text-white transition-colors cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Bottom Navigation */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 bg-[#e91e63] text-white rounded-lg font-medium hover:bg-[#d01758] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        View All Blog Posts
                    </button>
                    <button
                        onClick={handleHome}
                        className="px-8 py-3 border-2 border-[#e91e63] text-[#e91e63] rounded-lg font-medium hover:bg-[#e91e63] hover:text-white transition-all transform hover:-translate-y-0.5"
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;