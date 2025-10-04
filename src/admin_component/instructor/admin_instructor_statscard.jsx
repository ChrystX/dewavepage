import React from 'react';
import { Users, Award, Mail, Phone } from 'lucide-react';

const InstructorStatsCards = ({ instructors = [] }) => {
    const stats = {
        total: instructors.length,
        withEmail: instructors.filter(i => i.contactEmail).length,
        withPhone: instructors.filter(i => i.phoneNumber).length,
        certified: instructors.filter(i => i.certifications).length
    };

    const cards = [
        {
            title: 'Total Instructors',
            value: stats.total,
            icon: Users,
            color: 'text-blue-500'
        },
        {
            title: 'With Email',
            value: stats.withEmail,
            icon: Mail,
            color: 'text-green-500'
        },
        {
            title: 'With Phone',
            value: stats.withPhone,
            icon: Phone,
            color: 'text-purple-500'
        },
        {
            title: 'Certified',
            value: stats.certified,
            icon: Award,
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

export default InstructorStatsCards;