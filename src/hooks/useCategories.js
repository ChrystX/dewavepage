import { useState, useEffect } from "react";

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('https://dewavefreeapi20250731173800.azurewebsites.net/api/categories');
            if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);

            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refetch: fetchCategories };
}
