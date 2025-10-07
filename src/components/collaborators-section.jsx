import React from 'react';
import { User, Mail, Phone, Award } from 'lucide-react';

const Collaborators = ({ collaborators, loading }) => {
    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    if (!collaborators || collaborators.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <User size={48} className="mx-auto mb-2 opacity-30" />
                <p>No collaborators assigned to this course yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {collaborators.map((collaborator) => (
                <div
                    key={collaborator.instructorId}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                    <div className="flex gap-6">
                        {/* Collaborator Image */}
                        <div className="flex-shrink-0">
                            {collaborator.imageUrl ? (
                                <img
                                    src={collaborator.imageUrl}
                                    alt={collaborator.name}
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User size={40} className="text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Collaborator Details */}
                        <div className="flex-1 space-y-2">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {collaborator.name}
                                </h3>
                                {collaborator.role && (
                                    <p className="text-sm text-blue-600 font-medium">
                                        {collaborator.role}
                                    </p>
                                )}
                            </div>

                            {collaborator.bio && (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {collaborator.bio}
                                </p>
                            )}

                            {/* Contact & Certifications */}
                            <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-600">
                                {collaborator.contactEmail && (
                                    <div className="flex items-center gap-1">
                                        <Mail size={14} />
                                        <span>{collaborator.contactEmail}</span>
                                    </div>
                                )}
                                {collaborator.phoneNumber && (
                                    <div className="flex items-center gap-1">
                                        <Phone size={14} />
                                        <span>{collaborator.phoneNumber}</span>
                                    </div>
                                )}
                                {collaborator.certifications && (
                                    <div className="flex items-center gap-1">
                                        <Award size={14} />
                                        <span>{collaborator.certifications}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Collaborators;