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
    const maxLogoScroll = 100;
    const logoHeight = Math.max(0, 48 - scrollY / 2); // same as navbar
    const navbarHeight = 80; // h-20
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
                const response = await fetch(
                    `https://dewavefreeapi20250731173800.azurewebsites.net/api/blogdetails/${blogId}`
                );
                if (!response.ok) throw new Error(`Failed to fetch blog details: ${response.status}`);
                const data = await response.json();
                setBlogDetail(data);
                setBlog({
                    blogId: data.blogId,
                    title: data.seoTitle || 'Blog Post',
                    summary: data.seoDescription || '',
                    thumbnailUrl: null,
                    publishedAt: new Date().toISOString(),
                    viewCount: 0
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (blogId) fetchBlogDetail();
    }, [blogId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
            } catch {}
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleBack = () => navigate(-1);

    const tags = parseTags(blogDetail?.tags);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#836953] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blog post...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button onClick={handleBack} className="px-4 py-2 bg-[#836953] text-white rounded-lg hover:bg-[#6b5642] transition-colors">Go Back</button>
            </div>
        </div>
    );

    if (!blog || !blogDetail) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <p className="text-gray-600">Blog post not found</p>
                <button onClick={handleBack} className="mt-4 px-4 py-2 bg-[#836953] text-white rounded-lg hover:bg-[#6b5642] transition-colors">Go Back</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10 transition-all duration-300">
                {/* Back Button */}
                <button onClick={handleBack} className="flex items-center gap-2 text-[#836953] hover:text-[#6b5642] font-medium mb-6"
                        style={{ marginTop: `${totalNavbarHeight}px` }}>
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Blog Header */}
                <div className="space-y-3 mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        {blogDetail.seoTitle || blog.title}
                    </h1>
                    {blogDetail.seoDescription && (
                        <p className="text-lg text-gray-600">{blogDetail.seoDescription}</p>
                    )}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(blog.publishedAt || blog.createdAt)}</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatReadTime(blogDetail.content)}</div>
                    <div className="flex items-center gap-1"><Eye className="w-4 h-4" />{blog.viewCount || 0} views</div>
                    <button onClick={handleShare} className="flex items-center gap-1 text-[#836953] hover:text-[#6b5642]"><Share2 className="w-4 h-4" />Share</button>
                </div>

                {/* Featured Image */}
                {blog.thumbnailUrl && blog.thumbnailUrl !== 'string' && (
                    <div className="rounded-xl overflow-hidden shadow-lg mb-8">
                        <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className={`w-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                        {!isImageLoaded && <div className="w-full h-64 bg-gray-200 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#836953] border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                )}

                {/* Blog Content */}
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-8 prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#836953] hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
                     dangerouslySetInnerHTML={{ __html: blogDetail.content }} />

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#836953] hover:text-white cursor-pointer">{tag}</span>
                        ))}
                    </div>
                )}

                {/* Back to All Posts */}
                <div className="flex justify-center">
                    <button onClick={handleBack} className="px-6 py-3 bg-[#836953] text-white rounded-lg font-medium hover:bg-[#6b5642] shadow-md">Back to All Posts</button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
