// SelectionToolbar.jsx
import React from "react";

const SelectionToolbar = ({ selectedCount, onDownload, onShare, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-2 mb-2 rounded bg-white dark:bg-gray-800 shadow-lg shadow-gray-300/60 dark:shadow-black/40">
            <span className="text-gray-800 dark:text-white">{selectedCount} selected</span>
            <div className="flex gap-2">
                <button
                    onClick={onDownload}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
                >
                    Download
                </button>
                <button
                    onClick={onShare}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
                >
                    Share
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 shadow-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SelectionToolbar;