// UploadBox.jsx
import React from "react";

const UploadBox = ({ onUpload }) => {
    return (
        <div className="border-2 border-dashed rounded p-6 text-center my-4">
            Drag & drop files here, or{" "}
            <label className="text-blue-600 cursor-pointer">
                browse
                <input type="file" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
            </label>{" "}
            to upload.
        </div>
    );
};

export default UploadBox;
