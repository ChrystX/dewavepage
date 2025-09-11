import {useEffect, useMemo, useState} from "react";
import BlogDashboardHeader from "../admin_component/blog/admin_blog_header.jsx";
import BlogStatsCards from "../admin_component/blog/admin_blog_statscard.jsx";
import BlogFilters from "../admin_component/blog/admin_blog_filter.jsx";
import BlogTable from "../admin_component/blog/admin_blog_table.jsx";
import BlogModal from "../admin_component/blog/admin_blog_modal.jsx";
import BlogDetailModal from "../admin_component/blog/admin_blog_detail_modal.jsx";
import BlogPreviewModal from "../admin_component/blog/admin_blog_preview_modal.jsx"; // Add this import

const AdminBlogDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [message, setMessage] = useState({ type: '', text: '' });

    // Blog Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        author: '',
        categoryId: '',
        thumbnailUrl: '',
        status: 'draft',
        publishedAt: ''
    });

    // Blog Detail Modal
    const [isBlogDetailModalOpen, setIsBlogDetailModalOpen] = useState(false);
    const [selectedBlogForDetail, setSelectedBlogForDetail] = useState(null);
    const [blogDetailFormData, setBlogDetailFormData] = useState({
        blogId: null,
        content: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        tags: '',
        extraJson: ''
    });

    // Blog Preview Modal - NEW
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewBlogData, setPreviewBlogData] = useState(null);
    const [previewFormData, setPreviewFormData] = useState({});

    const BLOGS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/Blogs';
    const CATEGORIES_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/categories';
    const BLOG_DETAILS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/BlogDetails';

    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Published</span>;
            case 'draft':
                return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Draft</span>;
            case 'archived':
                return <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Archived</span>;
            default:
                return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Unknown</span>;
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Not published';
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await fetch(CATEGORIES_API_URL);
            if (res.ok) setCategories(await res.json());
        } catch (err) { console.error(err); }
    };

    // Fetch blogs
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(BLOGS_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setBlogs(data);
            setFilteredBlogs(data);
            setMessage({ type: 'success', text: `Loaded ${data.length} blogs successfully` });
            console.log('✅ Blogs fetched successfully:', data);
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to load blogs' });
            setBlogs([]);
            setFilteredBlogs([]);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    // Create or update blog
    const submitBlog = async () => {
        if (!formData.title.trim()) return alert('Title is required');

        try {
            const payload = { ...formData, categoryId: parseInt(formData.categoryId) || null };
            const url = modalMode === 'create' ? BLOGS_API_URL : `${BLOGS_API_URL}/${selectedBlog.id}`;
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

            if (!res.ok) throw new Error('Failed to save blog');
            await fetchBlogs();
            closeModal();
        } catch (err) {
            console.error(err);
            alert('Failed to save blog');
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            const res = await fetch(`${BLOGS_API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete blog');
            setBlogs(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete blog');
        }
    };

    // NEW: Handle blog preview
    const openBlogPreview = async (blog) => {
        setPreviewBlogData(blog);
        setIsPreviewModalOpen(true); // Open modal first to show loading state

        // Initialize with empty data
        let blogDetails = {
            content: '<p style="color: #6b7280; font-style: italic;">Loading content...</p>',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            tags: '',
            extraJson: ''
        };

        setPreviewFormData(blogDetails);

        // Try to fetch existing blog details
        try {
            console.log(`🔍 Fetching blog details for blog ID: ${blog.id}`);
            const response = await fetch(`${BLOG_DETAILS_API_URL}/${blog.id}`);

            console.log(`📡 API Response Status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log('📝 Fetched blog details:', data);

                blogDetails = {
                    content: data.content || '<p style="color: #6b7280; font-style: italic;">No content available yet. Click "Edit Content & SEO" to add content.</p>',
                    seoTitle: data.seoTitle || '',
                    seoDescription: data.seoDescription || '',
                    seoKeywords: data.seoKeywords || '',
                    tags: data.tags || '',
                    extraJson: data.extraJson || ''
                };
            } else if (response.status === 404) {
                console.log('📝 No blog details found, using empty content');
                blogDetails.content = '<p style="color: #6b7280; font-style: italic;">No content available yet. Click "Edit Content & SEO" to add content.</p>';
            } else {
                console.error(`❌ Failed to fetch blog details: ${response.status} ${response.statusText}`);
                blogDetails.content = '<p style="color: #dc2626; font-style: italic;">Error loading content. Please try again.</p>';
            }
        } catch (error) {
            console.error('❌ Error fetching blog details for preview:', error);
            blogDetails.content = '<p style="color: #dc2626; font-style: italic;">Error loading content. Please check your connection and try again.</p>';
        }

        // Update the preview data with fetched content
        setPreviewFormData(blogDetails);
    };

    const closeBlogPreview = () => {
        setIsPreviewModalOpen(false);
        setPreviewBlogData(null);
        setPreviewFormData({});
    };

    const openBlogDetailModal = async (blog) => {
        setSelectedBlogForDetail(blog);
        setBlogDetailFormData({
            blogId: blog.id,
            content: '',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            tags: '',
            extraJson: ''
        });

        // Fetch existing blog details
        try {
            const response = await fetch(`${BLOG_DETAILS_API_URL}/${blog.id}`);
            if (response.ok) {
                const data = await response.json();
                setBlogDetailFormData({
                    blogId: data.blogId,
                    content: data.content || '',
                    seoTitle: data.seoTitle || '',
                    seoDescription: data.seoDescription || '',
                    seoKeywords: data.seoKeywords || '',
                    tags: data.tags || '',
                    extraJson: data.extraJson || ''
                });
            }
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }

        setIsBlogDetailModalOpen(true);
    };

    const closeBlogDetailModal = () => {
        setIsBlogDetailModalOpen(false);
        setSelectedBlogForDetail(null);
        setBlogDetailFormData({
            blogId: null,
            content: '',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            tags: '',
            extraJson: ''
        });
    };

    const submitBlogDetail = async () => {
        if (!blogDetailFormData.content.trim()) {
            alert('Content is required');
            return;
        }

        try {
            // Check if blog details already exist
            const existsResponse = await fetch(`${BLOG_DETAILS_API_URL}/${selectedBlogForDetail.id}`);
            const method = existsResponse.ok ? 'PUT' : 'POST';
            const url = existsResponse.ok
                ? `${BLOG_DETAILS_API_URL}/${selectedBlogForDetail.id}`
                : BLOG_DETAILS_API_URL;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogDetailFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to save blog details');
            }

            setMessage({ type: 'success', text: 'Blog details saved successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            closeBlogDetailModal();
        } catch (error) {
            console.error('Error saving blog details:', error);
            alert('Failed to save blog details');
        }
    };

    // Modal functions
    const openModal = (mode, blog = null) => {
        setModalMode(mode);
        setSelectedBlog(blog);
        setFormData(blog ? { ...blog, categoryId: blog.categoryId?.toString() || '' } : { title:'', summary:'', author:'', categoryId:'', thumbnailUrl:'', status:'draft', publishedAt:'' });
        setIsModalOpen(true);
    };
    const closeModal = () => { setIsModalOpen(false); setSelectedBlog(null); };

    // Filters
    useEffect(() => {
        let filtered = blogs;
        if (searchTerm) filtered = filtered.filter(b =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.summary && b.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (b.author && b.author.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        if (statusFilter !== 'all') filtered = filtered.filter(b => statusFilter === 'published' ? b.status === 'published' : b.status !== 'published');
        if (categoryFilter !== 'all') filtered = filtered.filter(b => b.categoryId === parseInt(categoryFilter));
        setFilteredBlogs(filtered);
    }, [blogs, searchTerm, statusFilter, categoryFilter]);

    const refreshData = async () => { await fetchBlogs(); await fetchCategories(); };
    const getCategoryName = id => { const cat = categories.find(c => c.id === id); return cat ? cat.name : 'Uncategorized'; };

    const statusCounts = useMemo(() => ({
        total: blogs.length,
        published: blogs.filter(b => b.status === 'published').length,
        drafts: blogs.filter(b => b.status !== 'published').length
    }), [blogs]);

    useEffect(() => {
        fetchBlogs();
        fetchCategories();
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <BlogDashboardHeader
                    title="Blogs"
                    onRefresh={refreshData}
                    onAdd={() => openModal('create')}
                    loading={loading}
                    addLabel="Add Blog"
                />
                <BlogStatsCards blogs={blogs} />
                <BlogFilters
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                    categories={categories}
                />
                <div className="-mx-4 sm:-mx-6 lg:-mx-22">
                    <BlogTable
                        blogs={filteredBlogs}
                        onView={openBlogPreview} // Changed from openModal to openBlogPreview
                        onEdit={openModal}
                        onDelete={deleteBlog}
                        onOpenEditor={openBlogDetailModal}
                        getCategoryName={getCategoryName}
                        getStatusBadge={getStatusBadge}
                        formatDate={formatDate}
                    />
                </div>

                {/* Edit Blog Modal */}
                <BlogModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    mode={modalMode}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={submitBlog}
                    categories={categories}
                />

                {/* Blog Content Editor Modal */}
                <BlogDetailModal
                    isOpen={isBlogDetailModalOpen}
                    onClose={closeBlogDetailModal}
                    formData={blogDetailFormData}
                    setFormData={setBlogDetailFormData}
                    onSubmit={submitBlogDetail}
                    blogData={selectedBlogForDetail}
                />

                {/* Blog Preview Modal - NEW */}
                <BlogPreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closeBlogPreview}
                    formData={previewFormData}
                    blogData={previewBlogData}
                />
            </div>
        </>
    );
};

export default AdminBlogDashboard;