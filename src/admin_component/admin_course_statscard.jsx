const StatsCards = ({ statusCounts }) => {
    const cards = [
        { title: 'Total Courses', value: statusCounts.total },
        { title: 'Active Courses', value: statusCounts.active },
        { title: 'Inactive Courses', value: statusCounts.inactive },
        { title: 'Rated Courses', value: statusCounts.withRating },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-600">{card.title}</h2>
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
