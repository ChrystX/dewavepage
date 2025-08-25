import React from 'react';
import SignUpForm from "../components/action-form.jsx";

export default function SignUpSection() {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE - Stats Section */}
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                            <StatBlock value="500+" label="Successful graduates" />
                            <StatBlock value="15 Years" label="Excellence in education" />
                            <StatBlock value="98%" label="Job placement rate" />
                        </div>
                    </div>

                    {/* RIGHT SIDE - Application Form */}
                    <div className="order-1 lg:order-2">
                        <SignUpForm />
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatBlock({ value, label }) {
    return (
        <div className="text-center lg:text-left">
            <div className="border-b border-[#836953] pb-3 mb-3">
                <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-1">
                    {value}
                </div>
                <div className="text-gray-600 font-light text-sm">
                    {label}
                </div>
            </div>
        </div>
    );
}