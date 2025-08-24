// TrashList.jsx
import React from "react";

const TrashList = ({ trash, restoreFile, deletePermanently }) => {
    if (trash.length === 0) {
        return <p className="p-4 text-gray-500">Trash is empty.</p>;
    }

    return (
        <div className="border rounded mt-4">
            <div className="grid grid-cols-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold p-2 text-sm border-b border-gray-200 dark:border-gray-700">
                <span>Name</span>
                <span>Type</span>
                <span>Size</span>
                <span>Date</span>
                <span>Actions</span>
            </div>

            {trash.map((file, i) => (
                <div key={i} className="grid grid-cols-5 items-center border-b border-gray-200 dark:border-gray-700 p-2 text-sm">
                    <span>{file.name}</span>
                    <span>{file.type}</span>
                    <span>{file.size} MB</span>
                    <span>{new Date(file.date).toLocaleString()}</span>
                    <div className="flex gap-2">
                        <button onClick={() => restoreFile(i)} className="text-green-600">♻️ Restore</button>
                        <button onClick={() => deletePermanently(i)} className="text-red-600">❌ Delete</button>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default TrashList;
