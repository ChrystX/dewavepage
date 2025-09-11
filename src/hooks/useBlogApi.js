import { useState, useCallback } from 'react';

const useBlogApi = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // API URLs
    const BLOGS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/Blogs';
    const CATEGORIES_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/categories';
    const BLOG_DETAILS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/BlogDetails';

    // Helper function to show messages
    const showMessage = useCallback((type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, []);

    // Fetch all blogs
    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(BLOGS_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            showMessage('success', `Loaded ${data.length} blogs successfully`);
            console.log('✅ Blogs fetched successfully:', data);
            return data;
        } catch (err) {
            console.error('Error fetching blogs:', err);
            showMessage('error', 'Failed to load blogs');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [showMessage]);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch(CATEGORIES_API_URL);
            if (res.ok) {
                const data = await res.json();
                console.log('✅ Categories fetched successfully:', data);
                return data;
            }
            throw new Error('Failed to fetch categories');
        } catch (err) {
            console.error('Error fetching categories:', err);
            showMessage('error', 'Failed to load categories');
            return [];
        }
    }, [showMessage]);

    // Create new blog
    const createBlog = useCallback(async (blogData) => {
        try {
            const payload = { ...blogData, categoryId: parseInt(blogData.categoryId) || null };
            const res = await fetch(BLOGS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create blog');

            const newBlog = await res.json();
            showMessage('success', 'Blog created successfully');
            console.log('✅ Blog created successfully:', newBlog);
            return newBlog;
        } catch (err) {
            console.error('Error creating blog:', err);
            showMessage('error', 'Failed to create blog');
            throw err;
        }
    }, [showMessage]);

    // Update existing blog
    const updateBlog = useCallback(async (id, blogData) => {
        try {
            const payload = { ...blogData, categoryId: parseInt(blogData.categoryId) || null };
            const res = await fetch(`${BLOGS_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to update blog');

            const updatedBlog = await res.json();
            showMessage('success', 'Blog updated successfully');
            console.log('✅ Blog updated successfully:', updatedBlog);
            return updatedBlog;
        } catch (err) {
            console.error('Error updating blog:', err);
            showMessage('error', 'Failed to update blog');
            throw err;
        }
    }, [showMessage]);

    // Delete blog
    const deleteBlog = useCallback(async (id) => {
        try {
            const res = await fetch(`${BLOGS_API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete blog');

            showMessage('success', 'Blog deleted successfully');
            console.log('✅ Blog deleted successfully:', id);
            return true;
        } catch (err) {
            console.error('Error deleting blog:', err);
            showMessage('error', 'Failed to delete blog');
            throw err;
        }
    }, [showMessage]);

    // Fetch blog details by blog ID
    const fetchBlogDetails = useCallback(async (blogId) => {
        try {
            console.log(`🔍 Fetching blog details for blog ID: ${blogId}`);
            const response = await fetch(`${BLOG_DETAILS_API_URL}/${blogId}`);

            console.log(`📡 API Response Status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log('📝 Fetched blog details:', data);
                return data;
            } else if (response.status === 404) {
                console.log('📝 No blog details found');
                return null;
            } else {
                throw new Error(`Failed to fetch blog details: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('❌ Error fetching blog details:', error);
            showMessage('error', 'Failed to load blog details');
            throw error;
        }
    }, [showMessage]);

    // Create or update blog details
    const saveBlogDetails = useCallback(async (blogId, detailsData) => {
        try {
            // Check if blog details already exist
            const existsResponse = await fetch(`${BLOG_DETAILS_API_URL}/${blogId}`);
            const method = existsResponse.ok ? 'PUT' : 'POST';
            const url = existsResponse.ok
                ? `${BLOG_DETAILS_API_URL}/${blogId}`
                : BLOG_DETAILS_API_URL;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(detailsData)
            });

            if (!response.ok) {
                throw new Error('Failed to save blog details');
            }

            const savedDetails = await response.json();
            showMessage('success', 'Blog details saved successfully');
            console.log('✅ Blog details saved successfully:', savedDetails);
            return savedDetails;
        } catch (error) {
            console.error('Error saving blog details:', error);
            showMessage('error', 'Failed to save blog details');
            throw error;
        }
    }, [showMessage]);

    // Fetch blog details with fallback content for preview
    const fetchBlogDetailsForPreview = useCallback(async (blogId) => {
        try {
            console.log(`🔍 Fetching blog details for preview, blog ID: ${blogId}`);
            const response = await fetch(`${BLOG_DETAILS_API_URL}/${blogId}`);

            console.log(`📡 Preview API Response Status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log('📝 Fetched blog details for preview:', data);
                return {
                    content: data.content || '<p style="color: #6b7280; font-style: italic;">No content available yet. Click "Edit Content & SEO" to add content.</p>',
                    seoTitle: data.seoTitle || '',
                    seoDescription: data.seoDescription || '',
                    seoKeywords: data.seoKeywords || '',
                    tags: data.tags || '',
                    extraJson: data.extraJson || ''
                };
            } else if (response.status === 404) {
                console.log('📝 No blog details found for preview, using default content');
                return {
                    content: '<p style="color: #6b7280; font-style: italic;">No content available yet. Click "Edit Content & SEO" to add content.</p>',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                    tags: '',
                    extraJson: ''
                };
            } else {
                console.error(`❌ Failed to fetch blog details for preview: ${response.status} ${response.statusText}`);
                return {
                    content: '<p style="color: #dc2626; font-style: italic;">Error loading content. Please try again.</p>',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                    tags: '',
                    extraJson: ''
                };
            }
        } catch (error) {
            console.error('❌ Error fetching blog details for preview:', error);
            return {
                content: '<p style="color: #dc2626; font-style: italic;">Error loading content. Please check your connection and try again.</p>',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
                tags: '',
                extraJson: ''
            };
        }
    }, []);

    return {
        // State
        loading,
        message,

        // Blog operations
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,

        // Category operations
        fetchCategories,

        // Blog details operations
        fetchBlogDetails,
        saveBlogDetails,
        fetchBlogDetailsForPreview,

        // Utilities
        showMessage
    };
};

export default useBlogApi;