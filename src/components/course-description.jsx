import React from "react";
import { Wrench } from "lucide-react";

const CourseDescription = ({ fullDescriptionHtml, toolsRequired }) => {
    const toolsArray = toolsRequired
        ? toolsRequired.split(",").map((tool) => tool.trim())
        : [];

    return (
        <div className="space-y-8">
            {/* Full Description */}
            {fullDescriptionHtml && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        Course Details
                    </h3>
                    <div
                        className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: fullDescriptionHtml }}
                    />
                </div>
            )}

            {/* Tools Required */}
            {toolsArray.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        <Wrench size={18} className="text-gray-600" />
                        Tools Required
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {toolsArray.map((tool, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-50 text-gray-700 text-xs sm:text-sm border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 font-medium"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDescription;