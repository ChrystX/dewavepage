import { Calendar, ArrowLeft, Tag, Eye, Clock, Share2 } from 'lucide-react';
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

    // Track scroll for navbar compatibility
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch blog detail from API
    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://dewavefreeapi20250731173800.azurewebsites.net/api/blogdetails/${blogId}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch blog details: ${response.status}`);
                }

                const data = await response.json();
                setBlogDetail(data);

                // You might also need to fetch the basic blog info from another endpoint
                // If you have a separate endpoint for blog list data:
                // const blogResponse = await fetch(`/api/blogs/${blogId}`);
                // const blogData = await blogResponse.json();
                // setBlog(blogData);

                // For now, creating a mock blog object from the detail data
                setBlog({
                    blogId: data.blogId,
                    title: data.seoTitle || 'Blog Post',
                    summary: data.seoDescription || '',
                    thumbnailUrl: null, // You'll need this from your blog list API
                    publishedAt: new Date().toISOString(), // You'll need this from your blog list API
                    viewCount: 0 // You'll need this from your blog list API
                });

            } catch (err) {
                setError(err.message);
                console.error('Error fetching blog detail:', err);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlogDetail();
        }
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
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
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
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    // Calculate navbar height based on scroll position (same logic as navbar)
    const maxLogoScroll = 100;
    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const navbarHeight = 80; // 20 * 4 = 80px (h-20)
    const totalNavbarHeight = logoHeight + navbarHeight;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#836953] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-[#836953] text-white rounded-lg hover:bg-[#6b5642] transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!blog || !blogDetail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Blog post not found</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-[#836953] text-white rounded-lg hover:bg-[#6b5642] transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const tags = parseTags(blogDetail.tags);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Spacer for fixed navbar */}
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: `${totalNavbarHeight}px` }}
            />

            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#836953] hover:text-[#6b5642] transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-medium">Back</span>
                    </button>

                    {/* Blog Header */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                {blogDetail.seoTitle || blog.title}
                            </h1>
                            {(blogDetail.seoDescription || blog.summary) && (
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {blogDetail.seoDescription || blog.summary}
                                </p>
                            )}
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{formatReadTime(blogDetail.content)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{blog.viewCount || 0} views</span>
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 text-[#836953] hover:text-[#6b5642] transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {blog.thumbnailUrl && blog.thumbnailUrl !== 'string' && (
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                isImageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                        {!isImageLoaded && (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-[#836953] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#836953] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                    />

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Tag className="w-5 h-5 text-gray-400" />
                                <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#836953] hover:text-white transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-[#836953] text-white rounded-lg font-medium hover:bg-[#6b5642] transition-colors shadow-md hover:shadow-lg"
                    >
                        Back to All Posts
                    </button>
                </div>
            </div>

            {/* SEO Data (Hidden, but available for meta tags) */}
            {blogDetail.seoKeywords && (
                <div className="hidden">
                    <meta name="keywords" content={blogDetail.seoKeywords} />
                </div>
            )}
        </div>
    );
};

export default BlogDetail;