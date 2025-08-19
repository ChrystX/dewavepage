// components/course-description.jsx
import React from "react";
import { Wrench } from "lucide-react";

const CourseDescription = ({ fullDescriptionHtml, toolsRequired }) => {
    const toolsArray = toolsRequired
        ? toolsRequired.split(",").map((tool) => tool.trim())
        : [];

    return (
        <section className="max-w-6xl mx-auto px-6 mb-14">
            {/* Full Description */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
                    Course Details
                </h2>
                <div
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: fullDescriptionHtml }}
                />
            </div>

            {/* Tools Required */}
            {toolsArray.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
                        <Wrench size={18} className="text-gray-700" /> Tools Required
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {toolsArray.map((tool, index) => (
                            <span
                                key={index}
                                className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm border border-gray-300 hover:bg-gray-200 transition-colors"
                            >
                {tool}
              </span>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CourseDescription;
