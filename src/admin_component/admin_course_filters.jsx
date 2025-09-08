const CourseFilters = ({
                           searchTerm,
                           setSearchTerm,
                           statusFilter,
                           setStatusFilter,
                           categoryFilter,
                           setCategoryFilter,
                           categories
                       }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="flex-1 p-2 border rounded"
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>
    );
};

export default CourseFilters;
