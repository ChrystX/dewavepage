import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-red-500">403</h1>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Access Denied</h2>
                <p className="text-gray-600 mt-2 mb-8">
                    You don't have permission to access this resource.
                </p>
                <Link
                    to="/"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;