import React from 'react';
import { Search, Filter } from 'lucide-react';

const BlogFilters = ({
                         searchTerm,
                         setSearchTerm,
                         statusFilter,
                         setStatusFilter
                     }) => {
    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Search className="w-4 h-4 inline mr-1" />
                        Search Blogs
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search by title, summary, or slug..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Filter className="w-4 h-4 inline mr-1" />
                        Filter by Status
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {statusOptions.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BlogFilters;