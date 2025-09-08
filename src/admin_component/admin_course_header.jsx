import React from 'react';
import { BookOpen, Plus, RefreshCw } from 'lucide-react';

const DashboardHeader = ({
                             title = 'Dashboard',
                             subtitle = '',
                             onRefresh,
                             onAdd,
                             loading = false,
                             addLabel = 'Add'
                         }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                {/* Left side: Icon + Title */}
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-slate-600 to-blue-600 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        {subtitle && <p className="text-gray-600">{subtitle}</p>}
                    </div>
                </div>

                {/* Right side: Buttons */}
                <div className="flex items-center space-x-3">
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            <span>Refresh</span>
                        </button>
                    )}

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span>{addLabel}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
