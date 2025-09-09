// components/TestimonialCard.jsx
import { Star } from 'lucide-react';

export default function TestimonialCard({ name, role, content, profile_photo_url, rating = 5 }) {
    const truncatedContent = content.length > 220
        ? content.slice(0, 217) + "..."
        : content;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col
                        w-full sm:w-[500px] md:w-[600px] lg:w-[720px] h-[320px]">
            {/* Top: Image + Name */}
            <div className="flex items-center space-x-4">
                <img
                    src={profile_photo_url}
                    alt={`${name}'s photo`}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 leading-tight">{name}</h4>
                    {role && <p className="text-sm text-gray-500">{role}</p>}
                </div>
            </div>

            {/* Stars directly below name block */}
            <div className="flex items-center mb-4">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
            </div>

            {/* Review Text – centered */}
            <div className="bg-gray-50 rounded-lg p-4 flex-1 flex items-center justify-center">
                <p className="text-base text-gray-700 italic text-center leading-relaxed">
                    "{truncatedContent}"
                </p>
            </div>
        </div>
    );
}
