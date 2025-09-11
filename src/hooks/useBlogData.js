// hooks/useBlogData.js
import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api';

export const useBlogData = (limit = null) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${API_BASE_URL}/blogs`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch blogs: ${response.status}`);
                }

                const data = await response.json();

                // Apply limit if specified
                const processedData = limit ? data.slice(0, limit) : data;
                setBlogs(processedData);

            } catch (err) {
                console.error('Blog fetch error:', err);
                setError(err.message);
                setBlogs([]); // Fallback to empty array
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [limit]);

    // Retry function for error recovery
    const retry = () => {
        setError(null);
        setLoading(true);
        // Re-trigger useEffect by changing a dependency
    };

    return {
        blogs,
        loading,
        error,
        retry,
        isEmpty: !loading && blogs.length === 0,
        hasData: blogs.length > 0
    };
};

// Optional: More specific hooks
export const useRecentBlogs = (count = 8) => useBlogData(count);
export const useAllBlogs = () => useBlogData();