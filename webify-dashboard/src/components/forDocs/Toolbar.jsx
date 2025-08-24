import React from "react";
import { List, LayoutGrid } from "lucide-react";

const Toolbar = ({
    filter,
    setFilter,
    sort,
    setSort,
    view,
    setView,
    trashOpen,
    setTrashOpen,
    onUpload,
    trashCount,
    onUndo,
    onRedo,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-4 p-2 border-b">
            {/* Filter Icon */}
            <button className="p-2 border border-gray-200 rounded shadow-sm">⚙️</button>

            {/* File Type Dropdown */}
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 rounded p-1 shadow-sm"
            >
                <option value="All">All</option>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="PPTX">PPTX</option>
                <option value="JSON">JSON</option>
            </select>

            {/* Sort Dropdown */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded p-1 shadow-sm"
            >
                <option value="updatedDesc">Updated ↓</option>
                <option value="updatedAsc">Updated ↑</option>
                <option value="nameAsc">Name A → Z</option>
                <option value="nameDesc">Name Z → A</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-3">
                <button
                    onClick={() => setView("list")}
                    className={`p-2 border border-gray-200 rounded shadow-sm ${
                        view === "list"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                    }`}
                    title="List View"
                >
                    <List className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setView("grid")}
                    className={`p-2 border border-gray-200 rounded shadow-sm ${
                        view === "grid"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                    }`}
                    title="Grid View"
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>
            </div>

            {/* Undo / Redo */}
            <div className="flex gap-3">
                <button
                    onClick={() => onUndo()}
                    className="p-2 border border-gray-200 rounded shadow-sm"
                >
                    ↩️
                </button>
                <button
                    onClick={() => onRedo()}
                    className="p-2 border border-gray-200 rounded shadow-sm"
                >
                    ↪️
                </button>
            </div>

            {/* Upload Button */}
            <label className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer">
                Upload
                <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => onUpload(e.target.files)}
                />
            </label>

            {/* Trash Toggle */}
            <button
                onClick={() => setTrashOpen(!trashOpen)}
                className="p-2 border border-gray-200 rounded shadow-sm"
            >
                {trashOpen ? "Close Trash" : `Trash (${trashCount})`}
            </button>
        </div>
    );
};

export default Toolbar;
