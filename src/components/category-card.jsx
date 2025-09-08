import React from 'react';

const CategoryCard = ({ category, isSelected, onClick }) => (
    <div
        className={`relative min-w-40 h-24 rounded-md overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
            isSelected ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
        }`}
        onClick={() => onClick(category)}
    >
        <div className="absolute inset-0">
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-sm font-medium">{category.name}</h3>
        </div>
    </div>
);

export default CategoryCard;
