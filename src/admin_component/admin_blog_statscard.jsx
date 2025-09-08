import React from 'react';
import { BookOpen, Globe, Edit3, Filter } from 'lucide-react';

const BlogStatsCards = ({ blogs = [] }) => {
    const stats = {
        total: blogs.length,
        published: blogs.filter(blog => blog.status === 'published').length,
        draft: blogs.filter(blog => blog.status === 'draft').length,
        archived: blogs.filter(blog => blog.status === 'archived').length,
        withSummary: blogs.filter(blog => blog.summary && blog.summary.trim()).length
    };

    const cards = [
        {
            title: 'Total Blogs',
            value: stats.total,
            icon: BookOpen,
            color: 'text-blue-500'
        },
        {
            title: 'Published',
            value: stats.published,
            icon: Globe,
            color: 'text-green-500'
        },
        {
            title: 'Drafts',
            value: stats.draft,
            icon: Edit3,
            color: 'text-yellow-500'
        },
        {
            title: 'With Summary',
            value: stats.withSummary,
            icon: Filter,
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className={`text-2xl font-bold ${card.color === 'text-blue-500' ? 'text-gray-900' : card.color.replace('text-', 'text-')}`}>
                                    {card.value}
                                </p>
                            </div>
                            <IconComponent className={`w-8 h-8 ${card.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BlogStatsCards;