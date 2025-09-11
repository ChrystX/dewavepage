// hooks/useCourses.js
import { useState, useEffect, useCallback } from "react";

export default function useCourseData() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                "https://dewavefreeapiapi.azure-api.net/api/courses",
                { signal }
            );
            if (!response.ok) throw new Error(`Failed to fetch courses: ${response.status}`);

            const data = await response.json();
            setCourses(data);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Unknown error");
            }
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, loading, error, refetch: fetchCourses };
}
