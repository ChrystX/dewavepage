import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Clock } from 'lucide-react';

const SectionItem = ({ section, index, isExpanded, onToggle }) => {
    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="border-b border-gray-200">
            <div
                className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50"
                onClick={onToggle}
            >
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{section.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                  {formatDuration(section.durationMinutes)}
              </span>
                            {section.videoUrl && (
                                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Video
                </span>
                            )}
                        </div>
                    </div>
                </div>
                {isExpanded ?
                    <ChevronUp className="w-5 h-5 text-gray-400" /> :
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                }
            </div>

            {isExpanded && (
                <div className="px-6 pb-6 ml-14 space-y-4">
                    {section.contentHtml && (
                        <div
                            className="prose max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                        />
                    )}
                    {section.videoUrl && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Play className="w-4 h-4" />
                                <span>Video content available</span>
                            </div>
                        </div>
                    )}
                    {section.thumbnailUrl && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <img
                                src={section.thumbnailUrl}
                                alt={`${section.title} thumbnail`}
                                className="max-w-full h-auto rounded"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const CourseSectionsComponent = ({ sections }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const totalDuration = sections.reduce((total, section) =>
        total + (section.durationMinutes || 0), 0
    );

    if (!sections || sections.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold">Course Syllabus</h2>
                    <p className="text-gray-600 mt-2">No sections available for this course</p>
                </div>
                <div className="p-12 text-center text-gray-500">
                    <div className="text-lg">No course content available</div>
                    <div className="text-sm">Course content will be added soon.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Course Syllabus</h2>
                <p className="text-gray-600 mt-2">
                    {sections.length} lessons • {formatDuration(totalDuration)} total length
                </p>
            </div>

            <div>
                {sections.map((section, index) => (
                    <SectionItem
                        key={section.id}
                        section={section}
                        index={index}
                        isExpanded={expandedSection === section.id}
                        onToggle={() => toggleSection(section.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseSectionsComponent;