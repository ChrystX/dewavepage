import React from 'react';
import SignUpForm from "../components/action-form.jsx";

export default function SignUpSection() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="max-w-7xl w-full px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE - Stats Section */}
                    <div className="flex flex-col justify-center items-center space-y-12 text-center">
                        <StatBlock value="500+" label="Successful graduates" />
                        <StatBlock value="15 Years" label="Excellence in education" />
                        <StatBlock value="98%" label="Job placement rate" />
                    </div>

                    {/* RIGHT SIDE - Application Form */}
                    <div className="flex justify-center">
                        <SignUpForm />
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatBlock({ value, label }) {
    return (
        <div className="w-full max-w-sm border-b border-[#836953] pb-4">
            <div className="text-4xl font-light text-gray-900 mb-2">{value}</div>
            <div className="text-gray-600 font-light">{label}</div>
        </div>
    );
}
