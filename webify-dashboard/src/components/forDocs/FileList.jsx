import React from "react";
import { formatFileSize } from "./utils"; // agar utils.js alag banaya

const FileList = ({ files, view, moveToTrash, selectedFiles, toggleSelect, toggleSelectAll }) => {
    if (files.length === 0) {
        return <p className="p-4 text-gray-500">No files uploaded yet.</p>;
    }

    if (view === "list") {
        const allSelected = files.length > 0 && selectedFiles.length === files.length;
        return (
            <div className="border rounded">
                <div className="grid grid-cols-7 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 font-semibold p-2 text-sm border-b border-gray-300 dark:border-gray-700 items-center">
                    <input type="checkbox" checked={allSelected} onChange={(e) => toggleSelectAll(e.target.checked)} />
                    <span>Name</span>
                    <span>Type</span>
                    <span>Size</span>
                    <span>Owner</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>

                {files.map((file, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[30px_2fr_1fr_1fr_1fr_1.5fr_0.8fr] items-center border-b p-2 text-sm"
                    >
                        <input
                            type="checkbox"
                            checked={selectedFiles.includes(i)}
                            onChange={() => toggleSelect(i)}
                        />
                        <span className="truncate">{file.name}</span>
                        <span className="truncate">{file.type}</span>
                        <span>{formatFileSize(file.size)}</span>
                        <span className="truncate">{file.owner}</span>
                        <span className="truncate">{new Date(file.date).toLocaleString()}</span>
                        <div className="flex gap-2 justify-center">
                            {file.base64 && (
                                <a
                                    href={file.base64}
                                    download={file.name}
                                    className="text-blue-500"
                                >
                                    ⬇️
                                </a>
                            )}
                            <button
                                onClick={() => moveToTrash(i)}
                                className="text-red-500"
                            >
                                ❌
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {files.map((file, i) => (
                <div key={i} className="border rounded p-4 flex flex-col items-center shadow relative">
                    <input type="checkbox" checked={selectedFiles.includes(i)} onChange={() => toggleSelect(i)} className="absolute top-2 left-2" />
                    <p className="mt-2 text-sm font-semibold text-center truncate w-full">{file.name}</p>
                    {/* 👇 actual size show */}
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    <p className="text-xs text-gray-400">{file.owner}</p>
                    <p className="text-xs text-gray-400">{new Date(file.date).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                        {file.base64 && <a href={file.base64} download={file.name} className="text-blue-500">⬇️</a>}
                        <button onClick={() => moveToTrash(i)} className="text-red-500">❌</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FileList;
