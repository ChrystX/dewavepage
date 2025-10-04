import React from 'react';
import { Search, Filter } from 'lucide-react';

const InstructorFilters = ({
                               searchTerm,
                               setSearchTerm,
                               certificationFilter,
                               setCertificationFilter,
                               contactFilter,
                               setContactFilter
                           }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name, email..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Certification Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certifications
                    </label>
                    <select
                        value={certificationFilter}
                        onChange={(e) => setCertificationFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Instructors</option>
                        <option value="certified">Certified</option>
                        <option value="uncertified">Not Certified</option>
                    </select>
                </div>

                {/* Contact Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Info
                    </label>
                    <select
                        value={contactFilter}
                        onChange={(e) => setContactFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All</option>
                        <option value="email">Has Email</option>
                        <option value="phone">Has Phone</option>
                        <option value="both">Has Both</option>
                        <option value="none">Missing Contact</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default InstructorFilters;