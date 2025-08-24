import React, { useState, useEffect } from "react";
import Toolbar from "./forDocs/Toolbar";
import UploadBox from "./forDocs/UploadBox";
import SelectionToolbar from "./forDocs/SelectionToolbar";
import FileList from "./forDocs/FileList";
import TrashList from "./forDocs/TrashList";
import RightSidebar from "./RightSidebar";

const DocumentsPage = ({ darkMode }) => {
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("updatedDesc");
    const [view, setView] = useState("list");
    const [trashOpen, setTrashOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [trash, setTrash] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [animateCharts, setAnimateCharts] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("uploadedFiles");
        const storedTrash = localStorage.getItem("trashedFiles");
        setTimeout(() => setAnimateCharts(true), 500);
        if (stored) setFiles(JSON.parse(stored));
        if (storedTrash) setTrash(JSON.parse(storedTrash));
    }, []);

    const saveState = (updatedFiles, updatedTrash) => {
        setHistory([...history, { files, trash }]);
        setRedoStack([]);
        setFiles(updatedFiles);
        setTrash(updatedTrash);
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
        localStorage.setItem("trashedFiles", JSON.stringify(updatedTrash));
    };

    const handleUpload = async (newFiles) => {
        const uploaded = await Promise.all(
            Array.from(newFiles).map(
                (f) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const ext = f.name.split(".").pop().toLowerCase();
                            let type = "Unknown";
                            if (["pdf"].includes(ext)) type = "PDF";
                            else if (["doc", "docx"].includes(ext)) type = "DOCX";
                            else if (["xls", "xlsx"].includes(ext)) type = "XLSX";
                            else if (["ppt", "pptx"].includes(ext)) type = "PPTX";
                            else if (["json"].includes(ext)) type = "JSON";
                            resolve({
                                name: f.name,
                                type,
                                size: (f.size / 1024 / 1024).toFixed(1),
                                owner: "You",
                                date: new Date(),
                                base64: e.target.result,
                            });
                        };
                        reader.readAsDataURL(f);
                    })
            )
        );
        saveState([...files, ...uploaded], trash);
    };

    const moveToTrash = (index) => {
        const file = files[index];
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedTrash = [...trash, file];
        saveState(updatedFiles, updatedTrash);
        setSelectedFiles([]);
    };

    const toggleSelect = (index) => {
        setSelectedFiles((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleSelectAll = (checked) => {
        if (checked) setSelectedFiles(files.map((_, i) => i));
        else setSelectedFiles([]);
    };

    const handleDeleteSelected = () => {
        const updatedFiles = files.filter((_, i) => !selectedFiles.includes(i));
        const deleted = files.filter((_, i) => selectedFiles.includes(i));
        saveState(updatedFiles, [...trash, ...deleted]);
        setSelectedFiles([]);
    };

    const handleDownloadSelected = () => {
        if (selectedFiles.length === 1) {
            const file = files[selectedFiles[0]];
            const link = document.createElement("a");
            link.href = file.base64;
            link.download = file.name;
            link.click();
        } else {
            alert("Multiple file download (ZIP) can be added later.");
        }
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const prev = history[history.length - 1];
        setRedoStack([...redoStack, { files, trash }]);
        setHistory(history.slice(0, -1));
        setFiles(prev.files);
        setTrash(prev.trash);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setHistory([...history, { files, trash }]);
        setRedoStack(redoStack.slice(0, -1));
        setFiles(next.files);
        setTrash(next.trash);
    };

    const handleShareSelected = () => alert("Share functionality coming soon!");

    let filteredFiles =
        filter === "All" ? files : files.filter((file) => file.type === filter);
    if (sort === "updatedDesc")
        filteredFiles.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === "updatedAsc")
        filteredFiles.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sort === "nameAsc")
        filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "nameDesc")
        filteredFiles.sort((a, b) => b.name.localeCompare(a.name));

    return (
        <div className="flex flex-col lg:flex-row gap-6 shadow-lg p-6">
            {/* Left: Documents */}
            <div
  className={`flex-1 p-4 rounded-lg transition-all duration-1000 delay-500
  ${animateCharts ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
  ${darkMode 
    ? "bg-gray-900 text-gray-100" 
    : "bg-white text-gray-900 shadow-lg"} `}
>


                <Toolbar
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    view={view}
                    setView={setView}
                    trashOpen={trashOpen}
                    setTrashOpen={setTrashOpen}
                    onUpload={handleUpload}
                    trashCount={trash.length}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                />

                {trashOpen ? (
                    <TrashList
                        trash={trash}
                        restoreFile={(index) => {
                            const file = trash[index];
                            saveState([...files, file], trash.filter((_, i) => i !== index));
                        }}
                        deletePermanently={(index) => {
                            saveState(files, trash.filter((_, i) => i !== index));
                        }}
                    />
                ) : (
                    <>
                        <UploadBox onUpload={handleUpload} />
                        {selectedFiles.length > 0 && (
                            <SelectionToolbar
                                selectedCount={selectedFiles.length}
                                onDownload={handleDownloadSelected}
                                onShare={handleShareSelected}
                                onDelete={handleDeleteSelected}
                            />
                        )}
                        <FileList
                            files={filteredFiles}
                            view={view}
                            moveToTrash={moveToTrash}
                            selectedFiles={selectedFiles}
                            toggleSelect={toggleSelect}
                            toggleSelectAll={toggleSelectAll}
                        />
                    </>
                )}
            </div>

            {/* Right: Sidebar */}
            <RightSidebar animateCharts={animateCharts} darkMode={darkMode} />
        </div>
    );
};

export default DocumentsPage;
