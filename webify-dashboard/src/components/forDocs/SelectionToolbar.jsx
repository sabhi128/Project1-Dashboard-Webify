// SelectionToolbar.jsx
import React from "react";

const SelectionToolbar = ({ selectedCount, onDownload, onShare, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-2 mb-2 border rounded bg-gray-50">
            <span>{selectedCount} selected</span>
            <div className="flex gap-2">
                <button onClick={onDownload} className="px-3 py-1 border rounded">⬇️ Download</button>
                <button onClick={onShare} className="px-3 py-1 border rounded">🔗 Share</button>
                <button onClick={onDelete} className="px-3 py-1 border rounded text-red-600">❌ Delete</button>
            </div>
        </div>
    );
};

export default SelectionToolbar;
