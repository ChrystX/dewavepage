
import React from 'react';
import { BookOpen, Play, Pause, Star } from 'lucide-react';

const StatsCards = ({ statusCounts }) => {
    const cards = [
        {
            title: 'Total Courses',
            value: statusCounts.total,
            icon: BookOpen,
            color: 'text-blue-500'
        },
        {
            title: 'Active Courses',
            value: statusCounts.active,
            icon: Play,
            color: 'text-green-500'
        },
        {
            title: 'Inactive Courses',
            value: statusCounts.inactive,
            icon: Pause,
            color: 'text-red-500'
        },
        {
            title: 'Rated Courses',
            value: statusCounts.withRating,
            icon: Star,
            color: 'text-yellow-500'
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
                                <p className={`text-2xl font-bold ${card.color === 'text-blue-500' ? 'text-gray-900' : card.color}`}>
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

export default StatsCards;