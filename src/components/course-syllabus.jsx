import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Clock } from 'lucide-react';

const SectionItem = ({ section, index, isExpanded, onToggle }) => {
    const formatDuration = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;

        // Extract video ID from various YouTube URL formats
        const regexes = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
        ];

        for (const regex of regexes) {
            const match = url.match(regex);
            if (match) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
        }

        return null;
    };

    const isYouTubeUrl = (url) => {
        return url && (url.includes('youtube.com') || url.includes('youtu.be'));
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
                            {isYouTubeUrl(section.videoUrl) ? (
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={getYouTubeEmbedUrl(section.videoUrl)}
                                        title={`${section.title} - Video`}
                                        className="w-full h-full rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Play className="w-4 h-4" />
                                    <span>Video content available</span>
                                    <a
                                        href={section.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline ml-2"
                                    >
                                        Watch Video
                                    </a>
                                </div>
                            )}
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

    // Demo data with YouTube links for testing
    const demoSections = sections || [
        {
            id: 1,
            title: "Introduction to React Hooks",
            durationMinutes: 25,
            contentHtml: "<p>Learn the basics of React Hooks and how they can simplify your component logic.</p>",
            videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0"
        },
        {
            id: 2,
            title: "useState and useEffect Deep Dive",
            durationMinutes: 35,
            contentHtml: "<p>Master the most commonly used React Hooks with practical examples.</p>",
            videoUrl: "https://youtu.be/f687hBjwFcM"
        },
        {
            id: 3,
            title: "Building Custom Hooks",
            durationMinutes: 40,
            contentHtml: "<p>Create reusable logic with custom hooks to keep your components clean and focused.</p>",
            videoUrl: "https://www.youtube.com/embed/6ThXsUwLWvc"
        }
    ];

    if (!demoSections || demoSections.length === 0) {
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

    const totalDurationDemo = demoSections.reduce((total, section) =>
        total + (section.durationMinutes || 0), 0
    );

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Course Syllabus</h2>
                <p className="text-gray-600 mt-2">
                    {demoSections.length} lessons • {formatDuration(totalDurationDemo)} total length
                </p>
            </div>

            <div>
                {demoSections.map((section, index) => (
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