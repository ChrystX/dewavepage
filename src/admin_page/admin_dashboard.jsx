import React, { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, MessageSquare, TrendingUp, Clock, CheckCircle, XCircle, Star, Calendar, Activity, BarChart3, PieChart, AlertTriangle, Eye, RefreshCw, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const HomeDashboard = () => {
    const [data, setData] = useState({
        applications: [],
        courses: [],
        categories: [],
        faqs: [],
        blogs: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URLS = {
        applications: 'https://dewavefreeapi20250731173800.azurewebsites.net/api/application',
        courses: 'https://dewavefreeapi20250731173800.azurewebsites.net/api/courses',
        categories: 'https://dewavefreeapi20250731173800.azurewebsites.net/api/categories',
        faqs: 'https://dewavefreeapi20250731173800.azurewebsites.net/api/CourseFaqs',
        blogs: 'https://dewavefreeapi20250731173800.azurewebsites.net/api/Blogs'
    };

    const fetchAllData = async () => {
        setLoading(true);
        const newData = { ...data };

        try {
            const promises = Object.entries(API_URLS).map(async ([key, url]) => {
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        const result = await response.json();
                        return { key, data: result.success ? result.data || result : result };
                    }
                    return { key, data: [] };
                } catch (error) {
                    console.error(`Error fetching ${key}:`, error);
                    return { key, data: [] };
                }
            });

            const results = await Promise.all(promises);
            results.forEach(({ key, data: fetchedData }) => {
                newData[key] = Array.isArray(fetchedData) ? fetchedData : [];
            });

            setData(newData);
            setMessage({ type: 'success', text: 'Data refreshed successfully' });
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ type: 'error', text: 'Failed to refresh data' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // Calculate comprehensive metrics
    const getAnalytics = () => {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Application analytics
        const totalApplications = data.applications.length;
        const pendingApps = data.applications.filter(app => app.status?.toLowerCase() === 'pending').length;
        const approvedApps = data.applications.filter(app => app.status?.toLowerCase() === 'approved').length;
        const rejectedApps = data.applications.filter(app => app.status?.toLowerCase() === 'rejected').length;
        const weeklyApps = data.applications.filter(app => new Date(app.submittedAt) > weekAgo).length;
        const monthlyApps = data.applications.filter(app => new Date(app.submittedAt) > monthAgo).length;

        // Course analytics
        const totalCourses = data.courses.length;
        const activeCourses = data.courses.filter(course => course.isActive).length;
        const inactiveCourses = data.courses.filter(course => !course.isActive).length;
        const totalDuration = data.courses.reduce((sum, course) => sum + (course.duration || 0), 0);
        const totalVideos = data.courses.reduce((sum, course) => sum + (course.videoCount || 0), 0);
        const avgRating = totalCourses > 0 ? (data.courses.reduce((sum, course) => sum + (course.rating || 0), 0) / totalCourses) : 0;

        // Blog analytics
        const totalBlogs = data.blogs.length;
        const publishedBlogs = data.blogs.filter(blog => blog.status?.toLowerCase() === 'published').length;
        const draftBlogs = data.blogs.filter(blog => blog.status?.toLowerCase() === 'draft').length;
        const monthlyBlogs = data.blogs.filter(blog => new Date(blog.createdAt) > monthAgo).length;

        // Course popularity
        const courseStats = {};
        data.applications.forEach(app => {
            if (app.course) {
                courseStats[app.course] = (courseStats[app.course] || 0) + 1;
            }
        });

        // Status breakdown for charts
        const applicationStatusData = [
            { name: 'Pending', value: pendingApps, color: '#f59e0b' },
            { name: 'Approved', value: approvedApps, color: '#10b981' },
            { name: 'Rejected', value: rejectedApps, color: '#ef4444' }
        ];

        const courseStatusData = [
            { name: 'Active', value: activeCourses, color: '#10b981' },
            { name: 'Inactive', value: inactiveCourses, color: '#ef4444' }
        ];

        const blogStatusData = [
            { name: 'Published', value: publishedBlogs, color: '#10b981' },
            { name: 'Draft', value: draftBlogs, color: '#f59e0b' }
        ];

        return {
            applications: {
                total: totalApplications,
                pending: pendingApps,
                approved: approvedApps,
                rejected: rejectedApps,
                weekly: weeklyApps,
                monthly: monthlyApps,
                approvalRate: totalApplications > 0 ? ((approvedApps / totalApplications) * 100).toFixed(1) : 0,
                statusData: applicationStatusData
            },
            courses: {
                total: totalCourses,
                active: activeCourses,
                inactive: inactiveCourses,
                totalDuration,
                totalVideos,
                avgRating: avgRating.toFixed(1),
                statusData: courseStatusData
            },
            blogs: {
                total: totalBlogs,
                published: publishedBlogs,
                draft: draftBlogs,
                monthly: monthlyBlogs,
                publishRate: totalBlogs > 0 ? ((publishedBlogs / totalBlogs) * 100).toFixed(1) : 0,
                statusData: blogStatusData
            },
            system: {
                categories: data.categories.length,
                faqs: data.faqs.length
            },
            courseStats: Object.entries(courseStats).sort(([,a], [,b]) => b - a).slice(0, 5)
        };
    };

    const analytics = getAnalytics();

    const StatCard = ({ title, value, change, changeType, icon: Icon, color = "blue", subtitle }) => {
        const getChangeIcon = () => {
            if (changeType === 'up') return <ArrowUp className="w-4 h-4" />;
            if (changeType === 'down') return <ArrowDown className="w-4 h-4" />;
            return <Minus className="w-4 h-4" />;
        };

        const getChangeColor = () => {
            if (changeType === 'up') return 'text-green-600 bg-green-50';
            if (changeType === 'down') return 'text-red-600 bg-red-50';
            return 'text-gray-600 bg-gray-50';
        };

        return (
            <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Icon className={`w-8 h-8 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'yellow' ? 'text-yellow-600' : color === 'red' ? 'text-red-600' : 'text-purple-600'} mr-3`} />
                        <div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
                            <p className="text-3xl font-bold text-gray-900">{value}</p>
                        </div>
                    </div>
                </div>
                {change && (
                    <div className={`flex items-center px-2 py-1 rounded text-sm font-medium ${getChangeColor()}`}>
                        {getChangeIcon()}
                        <span className="ml-1">{change}</span>
                    </div>
                )}
                {subtitle && (
                    <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
                )}
            </div>
        );
    };

    const PieChartCard = ({ title, data, total }) => (
        <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-3">
                {data.map((item, index) => {
                    const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                    return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded mr-3"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-gray-900">{item.value}</span>
                                <span className="text-sm text-gray-500 ml-2">({percentage}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Total</span>
                    <span className="text-xl font-bold text-gray-900">{total}</span>
                </div>
            </div>
        </div>
    );

    const MetricRow = ({ label, value, unit = "", trend }) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-2">{value}{unit}</span>
                {trend && (
                    <div className={`flex items-center text-sm ${trend.type === 'up' ? 'text-green-600' : trend.type === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                        {trend.type === 'up' && <ArrowUp className="w-4 h-4" />}
                        {trend.type === 'down' && <ArrowDown className="w-4 h-4" />}
                        {trend.type === 'neutral' && <Minus className="w-4 h-4" />}
                    </div>
                )}
            </div>
        </div>
    );

    const DataTable = ({ title, headers, rows }) => (
        <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                        {headers.map((header, index) => (
                            <th key={index} className="text-left py-3 text-sm font-medium text-gray-600 uppercase tracking-wide">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 last:border-b-0">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="py-3 text-sm text-gray-900">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                            <p className="text-gray-600 mt-1">Statistical overview and key performance indicators</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
                            </div>
                            <button
                                onClick={fetchAllData}
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-3 border border-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                                <span>Refresh Data</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`mb-6 p-4 border ${
                        message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                            message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
                                'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Key Performance Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Applications"
                        value={analytics.applications.total}
                        change={`${analytics.applications.weekly} this week`}
                        changeType="up"
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Active Courses"
                        value={analytics.courses.active}
                        subtitle={`${analytics.courses.totalDuration} total hours`}
                        icon={BookOpen}
                        color="purple"
                    />
                    <StatCard
                        title="Published Blogs"
                        value={analytics.blogs.published}
                        change={`${analytics.blogs.monthly} this month`}
                        changeType="up"
                        icon={FileText}
                        color="green"
                    />
                    <StatCard
                        title="Approval Rate"
                        value={`${analytics.applications.approvalRate}%`}
                        subtitle="Overall success rate"
                        icon={CheckCircle}
                        color="yellow"
                    />
                </div>

                {/* Status Breakdown Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <PieChartCard
                        title="Application Status"
                        data={analytics.applications.statusData}
                        total={analytics.applications.total}
                    />
                    <PieChartCard
                        title="Course Status"
                        data={analytics.courses.statusData}
                        total={analytics.courses.total}
                    />
                    <PieChartCard
                        title="Blog Status"
                        data={analytics.blogs.statusData}
                        total={analytics.blogs.total}
                    />
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Application Metrics */}
                    <div className="bg-white border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Metrics</h3>
                        <div className="space-y-1">
                            <MetricRow label="Total Applications" value={analytics.applications.total} />
                            <MetricRow label="Pending Review" value={analytics.applications.pending} />
                            <MetricRow label="Approved" value={analytics.applications.approved} />
                            <MetricRow label="Rejected" value={analytics.applications.rejected} />
                            <MetricRow label="Weekly Submissions" value={analytics.applications.weekly} />
                            <MetricRow label="Monthly Submissions" value={analytics.applications.monthly} />
                            <MetricRow label="Success Rate" value={analytics.applications.approvalRate} unit="%" />
                        </div>
                    </div>

                    {/* Course Metrics */}
                    <div className="bg-white border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Metrics</h3>
                        <div className="space-y-1">
                            <MetricRow label="Total Courses" value={analytics.courses.total} />
                            <MetricRow label="Active Courses" value={analytics.courses.active} />
                            <MetricRow label="Inactive Courses" value={analytics.courses.inactive} />
                            <MetricRow label="Total Duration" value={analytics.courses.totalDuration} unit=" hrs" />
                            <MetricRow label="Total Videos" value={analytics.courses.totalVideos} />
                            <MetricRow label="Average Rating" value={analytics.courses.avgRating} unit="/5" />
                            <MetricRow label="Categories" value={analytics.system.categories} />
                        </div>
                    </div>
                </div>

                {/* Content and System Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Blog Metrics */}
                    <div className="bg-white border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Metrics</h3>
                        <div className="space-y-1">
                            <MetricRow label="Total Blog Posts" value={analytics.blogs.total} />
                            <MetricRow label="Published Posts" value={analytics.blogs.published} />
                            <MetricRow label="Draft Posts" value={analytics.blogs.draft} />
                            <MetricRow label="Monthly Posts" value={analytics.blogs.monthly} />
                            <MetricRow label="Publish Rate" value={analytics.blogs.publishRate} unit="%" />
                            <MetricRow label="Total FAQs" value={analytics.system.faqs} />
                        </div>
                    </div>

                    {/* Popular Courses Table */}
                    <DataTable
                        title="Most Applied Courses"
                        headers={['Rank', 'Course Name', 'Applications']}
                        rows={analytics.courseStats.length > 0 ? analytics.courseStats.map(([course, count], index) => [
                            `#${index + 1}`,
                            course,
                            count
                        ]) : [['--', 'No data available', '--']]}
                    />
                </div>

                {/* Top Blogs by Views */}
                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-blue-600" />
                        Most Viewed Blogs
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {data.blogs
                            .filter(blog => blog.status?.toLowerCase() === 'published')
                            .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                            .slice(0, 5)
                            .map((blog, index) => (
                                <div key={blog.id} className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {blog.title}
                                        </p>
                                        <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                                            <Eye className="w-3 h-3" />
                                            <span className="font-semibold text-blue-600">{blog.viewCount || 0}</span>
                                            <span>views</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {data.blogs.filter(blog => blog.status?.toLowerCase() === 'published').length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No published blogs yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="bg-white border border-gray-200 p-6 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{analytics.applications.total}</p>
                            <p className="text-sm text-gray-600">Total Applications</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{analytics.courses.total}</p>
                            <p className="text-sm text-gray-600">Total Courses</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{analytics.blogs.published}</p>
                            <p className="text-sm text-gray-600">Published Blogs</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-600">{analytics.system.categories + analytics.system.faqs}</p>
                            <p className="text-sm text-gray-600">Support Content</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;